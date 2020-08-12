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

import { App } from '../core';
import { Controller } from '../controllers';
import { Signal, Status } from '../signals';

import Tokenizer, { TokenConfig } from './Tokenizer';

export interface ServiceConfig {
	token: TokenConfig;
}

class AuthService {
	private $users: Controller<any>;
	private $tokenizer: Tokenizer;

	public constructor(app: App, config: ServiceConfig) {
		this.$users = app.users;
		this.$tokenizer = new Tokenizer(config.token);
	}

	public async login(username: string, password: string): Promise<string> {
		let user = {};

		try {
			user = await this.$users.getBy({ username });
			await this.compare(user, { username, password });
		} catch (error) {
			this.handleError(error);
		}

		return this.createToken(user);
	}

	private async compare(user: any, data: object): Promise<void> {
		if (!await this.$users.compare(user.id, data)) {
			throw new Signal(Status.INVALID_REQUEST, 'Invalid password');
		}
	}

	private handleError(error: Error|Signal): void {
		let signal = Signal.from(error);

		if (signal.status == Status.NOT_FOUND) {
			signal = new Signal(Status.INVALID_REQUEST, 'Invalid username');
		}

		throw signal;
	}

	private createToken(payload: any): string {
		return this.$tokenizer.create(payload);
	}
}

export default AuthService;
