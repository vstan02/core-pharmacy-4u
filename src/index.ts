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

import { App } from './core';
import { Repository } from './repository';
import { Server } from './server';

import { HomeRoute, ErrorRoute } from './pages';
import { AuthRoute } from './auth';

import * as config from './config';

const database = new Repository();
const app = new App(database);
const server = new Server({
	port: config.PORT,
	host: config.HOST,
	static: config.STATIC,
	views: config.VIEWS,
	translator: {
		locales: config.TRANSL_LOCALES,
		directory: config.TRANSL_DIR
	}
});

server.routes = [
	new HomeRoute('/'),
	new AuthRoute('/auth', app),
	new ErrorRoute('*')
];

export default server.run();
