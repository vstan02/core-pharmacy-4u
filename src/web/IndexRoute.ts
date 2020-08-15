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

import { Route } from '../routes';
import { Signal, Status } from '../signals';
import { Translator } from '../translator';

class IndexRoute extends Route {
	public constructor(path: string) {
		super(path);
		this.$router.get('/description', this.description);
	}

	private async description(request: Request, response: Response): Promise<Response> {
		try {
			const transl = new Translator(request.query.lang as string);
			return response.json(new Signal(Status.OK, {
				description: transl.translate('description')
			}));
		} catch (error) {
			return response.json(Signal.from(error));
		}
	}
}

export default IndexRoute;
