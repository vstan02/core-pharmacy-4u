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

import { App } from './core';
import { Repository } from './repository';
import { Server } from './server';

import { IndexRoute } from './web';
import { AuthRoute } from './auth';
import { StoreRoute } from './store';

import * as config from './config';
import { TOKEN_SECRET } from './config';

const database = new Repository();
const app = new App(database);
const server = new Server({
	port: config.PORT,
	host: config.HOST,
	translator: {
		locales: config.TRANSL_LOCALES,
		directory: config.TRANSL_DIR
	}
});

const authConfig = {
	token: { duration: config.TOKEN_DURATION, secret: TOKEN_SECRET }
};

server.routes = [
	new IndexRoute('/'),
	new AuthRoute('/auth', app, authConfig),
	new StoreRoute('/store', app)
];

app.users.create({ username: 'admin', password: 'test123' })
   .then(() => console.log('Admin created!'));

app.products.create({ name: 'Test', description: 'A test description' })
   .then(() => console.log('Product created!'));

export default server.run();
