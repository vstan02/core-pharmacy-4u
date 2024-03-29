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

import { Database } from '../database';
import { UsersController } from '../users';
import { ProductsController } from '../products';

class App {
	private readonly $database: Database;

	public constructor(database: Database) {
		this.$database = database;
	}

	public get users(): UsersController {
		return new UsersController(this.$database);
	}

	public get products(): ProductsController {
		return new ProductsController(this.$database);
	}
}

export default App;
