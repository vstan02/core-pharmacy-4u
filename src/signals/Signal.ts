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

import Status from './Status';

class Signal {
	public status: Status;

	public constructor(status: Status, data?: string|object) {
		this.status = status;
		data && (this.data = data);
	}

	private set data(value: string|object) {
		this.defineSignalProperties(typeof value === 'string' ? {
			details: value
		} : value);
	}

	private defineSignalProperties(data: object): void {
		for (const property of Object.keys(data)) {
			const propertyDescriptor = Object.getOwnPropertyDescriptor(data, property);
			propertyDescriptor && Object.defineProperty(this, property, propertyDescriptor);
		}
	}

	public static from(error: Error|Signal): Signal {
		if (error instanceof Signal) {
			return error;
		}

		return new Signal(Status.INTERNAL_ERROR, this.getErrorMessage(error));
	}

	private static getErrorMessage(error: Error): string {
		return process.env.NODE_ENV === 'production'
			? 'Internal error' : error.message.replace('.', '');
	}
}

export default Signal;
