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

import { Request, Response, urlencoded } from 'express';

import { App } from '../core';
import { Route } from '../routes';
import { Translator } from '../translator';
import { Signal } from '../signals';
import AuthService from './AuthService';

class AuthRoute extends Route {
	private $auth: AuthService;

	public constructor(path: string, app: App) {
		super(path);
		this.$auth = new AuthService(app);

		const middleware = urlencoded({ extended: false });
		this.$router.get('/', this.index);
		this.$router.post('/login', middleware, this.login.bind(this));
		this.$router.post('/register', middleware, this.register.bind(this));
	}

	private index(request: Request, response: Response): void {
		const transl = new Translator(request.query.lang as string);
		return response.render('auth.ejs', {
			description: transl.translate('description')
		});
	}

	private async login(request: Request, response: Response): Promise<void> {
		try {
			const { username, password } = request.body;
			await this.$auth.login(username, password);
			return response.redirect('/');
		} catch (error) {
			const transl = new Translator(request.query.lang as string);
			return response.render('error.ejs', {
				...Signal.from(error),
				description: transl.translate('description')
			});
		}
	}

	private async register(request: Request, response: Response): Promise<void> {
		try {
			const { username, password } = request.body;
			await this.$auth.register(username, password);
			return response.redirect('/');
		} catch (error) {
			const transl = new Translator(request.query.lang as string);
			return response.render('error.ejs', {
				...Signal.from(error),
				description: transl.translate('description')
			});
		}
	}
}

export default AuthRoute;
