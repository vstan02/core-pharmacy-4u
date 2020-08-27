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

import { Request } from 'express';

import { Signal, Status } from '../signals';

import { validationResult } from 'express-validator';

function capitalize(str: string): string {
	return str.charAt(0).toUpperCase() + str.slice(1);
}

function validateFields(request: Request, fields: Array<string>): void {
	fields.map((field: string) => {
		const descriptor = Object.getOwnPropertyDescriptor(request, field);
		if (!descriptor || !descriptor.value) {
			throw new Signal(Status.INVALID_REQUEST, `${ capitalize(field) } is required!`);
		}
	});
}

export default function (request: Request, fields?: Array<string>): void {
	validateFields(request, fields || []);
	const errors = validationResult(request);

	if (!errors.isEmpty()) {
		throw new Signal(Status.INVALID_REQUEST, errors.array()[0].msg);
	}
}
