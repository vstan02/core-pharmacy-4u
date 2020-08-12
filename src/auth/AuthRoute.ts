/**
 * Pharmacy 4U - Online pharmacy for you
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
import { API } from '../routes';
import { Signal, Status } from '../signals';

import AuthService, { ServiceConfig } from './AuthService';

class AuthRoute extends API {
	private $auth: AuthService;

	public constructor(path: string, app: App, config: ServiceConfig) {
		super(path);
		this.$auth = new AuthService(app, config);
		this.$router.post('/', this.login.bind(this));
	}

	private async login(request: Request, response: Response): Promise<Response> {
		try {
			const { username, password } = request.body;
			const token = await this.$auth.login(username, password);
			return response.json(new Signal(Status.OK, { token }));
		} catch (error) {
			return response.json(Signal.from(error));
		}
	}
}

export default AuthRoute;
