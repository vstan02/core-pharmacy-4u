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

import { Model } from 'mongoose';

import { Collection, Entity } from '../database';
import { Signal, Status } from '../signals';

class MongoCollection<Type extends Entity> implements Collection<Type> {
	private readonly $model: Model<any>;

	public constructor(model: Model<any>) {
		this.$model = model;
	}

	public async get(id: string, select?: Array<string>): Promise<Type> {
		const entity = await this.$model.findById(id)
			.select(this.toSelect(select));

		if (!entity) {
			throw new Signal(Status.NOT_FOUND, 'Entity not found');
		}

		return this.normalize(entity);
	}

	public async getBy(data: object, select?: Array<string>): Promise<Type> {
		const result = await this.$model.findOne(data)
			.select(this.toSelect(select));

		if (!result) {
			throw new Signal(Status.NOT_FOUND, 'Entity not found');
		}

		return this.normalize(result);
	}

	public async getAll(select?: Array<string>): Promise<Array<Type>> {
		const result = await this.$model.find()
			.select(this.toSelect(select));
		return result.map(entity => this.normalize(entity));
	}

	public async create(entity: Type): Promise<string> {
		const result = new this.$model(entity);
		await result.save();
		return result.id;
	}

	public async update(id: string, entity: Type): Promise<void> {
		const data = await this.$model.findById(id);

		if (data) {
			Object.assign(data, entity);
			await this.$model.findByIdAndUpdate(id, data);
		} else {
			throw new Signal(Status.NOT_FOUND, 'Entity not found');
		}
	}

	public async delete(id: string): Promise<void> {
		await this.$model.findByIdAndDelete(id);
	}

	private toSelect(fields?: Array<string>): object {
		if (!fields) {
			return { __v: 0 };
		}

		let select = {};
		fields.map((field: string) => {
			select = { ...select, [field]: 1 };
		});
		return select;
	}

	private normalize(object: any): Type {
		object = { ...object._doc, id: object._id };
		delete object._id;
		return object;
	}
}

export default MongoCollection;
