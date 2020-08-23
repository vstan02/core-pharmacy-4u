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

import { App } from '../core';
import { Controller } from '../controllers';

class StoreService {
	private $products: Controller<any>;

	public constructor(app: App) {
		this.$products = app.products;
	}

	public async getProduct(id: string): Promise<object> {
		return this.$products.get(id);
	}

	public async getProducts(): Promise<object> {
		return this.$products.getAll();
	}

	public async createProducts(product: object): Promise<object> {
		const id = await this.$products.create(product);
		return this.$products.get(id);
	}

	public async updateProducts(id: string, product: object): Promise<void> {
		await this.$products.update(id, product);
	}

	public async deleteProducts(id: string): Promise<void> {
		await this.$products.delete(id);
	}
}

export default StoreService;
