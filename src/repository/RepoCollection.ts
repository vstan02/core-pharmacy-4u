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

import { Collection, Entity } from '../database';

class RepoCollection<Type extends Entity> implements Collection<Type> {
	private $last: number;
	private $entities: Map<string, Type>;

	public constructor() {
		this.$last = 0;
		this.$entities = new Map<string, Type>();
	}

	public async get(id: string, select?: Array<string>): Promise<Type> {
		const entity = this.$entities.get(id);
		if (!entity) {
			throw new Error('Entity not found!');
		}

		return this.select(entity, select);
	}

	public async getBy(data: object, select?: Array<string>): Promise<Type> {
		const result = Array.from(this.$entities.values())
			.filter((entity: Type) => this.compare(entity, data))[0];

		if (!result) {
			throw new Error('Entity not found!');
		}

		return this.select(result, select);
	}

	public async getAll(select?: Array<string>): Promise<Array<Type>> {
		return Array.from(this.$entities.values())
			.map((entity: Type) => this.select(entity, select));
	}

	public async create(entity: Type): Promise<string> {
		entity.id = (++this.$last).toString();
		this.$entities.set(entity.id, entity);
		return entity.id;
	}

	public async update(id: string, entity: Type): Promise<void> {
		const data = this.$entities.get(id);

		if (data) {
			Object.assign(data, entity, { id: data.id });
			this.$entities.set(data.id!, data);
		} else {
			throw new Error('Entity not found!');
		}
	}

	public async delete(id: string): Promise<void> {
		this.$entities.delete(id);
	}

	private select(entity: Type, select?: Array<string>): Type {
		if (!select) {
			return entity;
		}

		return Object.assign({}, ...select.map((prop: string) => {
			const value = this.getObjectProperty(entity, prop);
			return value ? { [prop]: value } : undefined;
		}));
	}

	private compare(first: object, second: object): boolean {
		for (const property of Object.keys(second)) {
			const value1 = this.getObjectProperty(first, property);
			const value2 = this.getObjectProperty(second, property);

			if (value1 !== value2) {
				return false;
			}
		}

		return true;
	}

	private getObjectProperty(object: object, prop: string): any {
		const descriptor = Object.getOwnPropertyDescriptor(object, prop);
		return descriptor ? descriptor.value : undefined;
	}
}

export default RepoCollection;
