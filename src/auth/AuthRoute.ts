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
import { Route } from '../routes';
import { Translator } from '../translator';
import { Signal } from '../signals';
import AuthService from './AuthService';
import Status from '../signals/Status';

class AuthRoute extends Route {
	private $auth: AuthService;

	public constructor(path: string, app: App) {
		super(path);
		this.$auth = new AuthService(app);

		this.$router.get('/', this.index);
		this.$router.post('/register', this.register.bind(this));
	}

	private index(request: Request, response: Response): void {
		const transl = new Translator(request.query.lang as string);
		return response.render('auth.ejs', {
			description: transl.translate('description')
		});
	}

	private register(request: Request, response: Response): void {
		try {
			return response.redirect('/');
		} catch (error) {
			const transl = new Translator(request.query.lang as string);
			return response.render('error.ejs', {
				...new Signal(Status.INTERNAL_ERROR, 'Internal error'),
				description: transl.translate('description')
			});
		}
	}
}

export default AuthRoute;
