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

import StoreService from './StoreService';

class StoreRoute extends Route {
	private $store: StoreService;

	public constructor(path: string, app: App) {
		super(path);
		this.$store = new StoreService(app);

		this.$router.get('/', this.read.bind(this));
	}

	private async read(request: Request, response: Response): Promise<Response> {
		try {
			return response.json(new Signal(Status.OK, {
				products: await this.$store.getAll()
			}));
		} catch (error) {
			return response.json(Signal.from(error));
		}
	}
}

export default StoreRoute;
