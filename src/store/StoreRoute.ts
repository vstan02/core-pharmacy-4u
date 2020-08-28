/**
 * Pharmacy 4U (core) - Online pharmacy for you
 * Copyright (C) 2020 Stan Vlad <vstan02@protonmail.com>
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program. If not, see <https://www.gnu.org/licenses/>.
 */

import { Request, Response } from 'express';

import { App } from '../core';
import { Route } from '../routes';
import { Signal, Status } from '../signals';
import { validateRequest } from '../utils';

import StoreService from './StoreService';
import productMiddleware from './productMiddleware';

interface StoreConfig {
	upload: string;
}

class StoreRoute extends Route {
	private $store: StoreService;

	public constructor(path: string, app: App, config: StoreConfig) {
		super(path);
		this.$store = new StoreService(app);

		const middleware = productMiddleware(config);
		this.$router.get('/products/:id?', this.readProducts.bind(this));
		this.$router.post('/products', middleware.post, this.createProduct.bind(this));
		this.$router.put('/products/:id', middleware.put, this.updateProduct.bind(this));
		this.$router.delete('/products/:id', this.deleteProduct.bind(this));
	}

	private async readProducts(request: Request, response: Response): Promise<Response> {
		try {
			const { id } = request.params;
			const result = id
				? { product: await this.$store.getProduct(id) }
				: { products: await this.$store.getProducts() };
			return response.json(new Signal(Status.OK, result));
		} catch (error) {
			return response.json(Signal.from(error));
		}
	}

	private async createProduct(request: Request, response: Response): Promise<Response> {
		try {
			validateRequest(request, ['file']);
			const { filename: picture } = request.file;
			const product = await this.$store.createProducts(Object.assign({ picture }, request.body));
			return response.json(new Signal(Status.CREATED, { product }));
		} catch (error) {
			return response.json(Signal.from(error));
		}
	}

	private async updateProduct(request: Request, response: Response): Promise<Response> {
		try {
			validateRequest(request);
			const { id } = request.params;
			const picture = request.file ? request.file.filename : undefined;
			const product = await this.$store.updateProducts(id, Object.assign({ picture }, request.body));
			return response.json(new Signal(Status.UPDATED, { product }));
		} catch (error) {
			return response.json(Signal.from(error));
		}
	}

	private async deleteProduct(request: Request, response: Response): Promise<Response> {
		try {
			const { id } = request.params;
			await this.$store.deleteProducts(id);
			return response.json(new Signal(Status.UPDATED));
		} catch (error) {
			return response.json(Signal.from(error));
		}
	}
}

export default StoreRoute;
