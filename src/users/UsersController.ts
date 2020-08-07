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

import { Database, Collection } from '../database';
import { Controller } from '../controllers';
import User from './User';

import PasswordManager from './PasswordManager';

class UsersController extends Controller<User> {
	private $users: Collection<User>;
	private $passManager: PasswordManager;

	public constructor(database: Database) {
		super();
		this.$users = database.users;
		this.$passManager = new PasswordManager();
	}

	public async get(id: string): Promise<User> {
		return this.$users.get(id, ['id', 'username']);
	}

	public async getAll(): Promise<Array<User>> {
		return this.$users.getAll(['id', 'username']);
	}

	public async create({ username, password }: User): Promise<string> {
		return this.$users.create({
			username, password: this.$passManager.create(password!)
		});
	}

	public async update(id: string, data: User): Promise<void> {
		const { username, password } = data;

		return this.$users.update(id, Object.assign({},
			username ? { username } : undefined,
			password ? { password: this.$passManager.create(password) } : undefined
		));
	}

	public async delete(id: string): Promise<void> {
		return this.$users.delete(id);
	}
}

export default UsersController;
