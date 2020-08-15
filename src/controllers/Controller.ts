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

import { Entity } from '../database';

abstract class Controller<Type extends Entity> {
	public abstract async get(id: string): Promise<Type>;
	public abstract async getBy(data: object): Promise<Type>;
	public abstract async getAll(): Promise<Array<Type>>;
	public abstract async create(entity: Type): Promise<string>;
	public abstract async update(id: string, data: Type): Promise<void>;
	public abstract async delete(id: string): Promise<void>;
	public abstract async compare(id: string, entity: Type): Promise<boolean>;
}

export default Controller;
