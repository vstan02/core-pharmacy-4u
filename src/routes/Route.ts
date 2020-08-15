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

import { Router } from 'express';

class Route {
	protected readonly $path: string;
	protected readonly $router: Router;

	protected constructor(path: string) {
		this.$path = path;
		this.$router = Router();
	}

	public get path(): string {
		return this.$path;
	}

	public get router(): Router {
		return this.$router;
	}
}

export default Route;
