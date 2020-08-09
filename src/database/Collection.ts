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

import Entity from './Entity';

interface Collection<Type extends Entity> {
	get(id: string, select?: Array<string>): Promise<Type>;
	getBy(data: object, select?: Array<string>): Promise<Type>;
	getAll(select?: Array<string>): Promise<Array<Type>>;
	create(entity: Type): Promise<string>;
	update(id: string, entity: Type): Promise<void>;
	delete(id: string): Promise<void>;
}

export default Collection;
