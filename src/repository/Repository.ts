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

import { Database, Collection } from '../database';

import RepoCollection from './RepoCollection';

enum CollectionIndex {
	USERS,
	PRODUCTS
}

class Repository implements Database {
	private $collections: Map<CollectionIndex, RepoCollection<object>>;

	public constructor() {
		this.$collections = new Map<CollectionIndex, any>()
			.set(CollectionIndex.USERS, this.collection)
			.set(CollectionIndex.PRODUCTS, this.collection);
	}

	private get collection(): Collection<object> {
		return new RepoCollection<object>();
	}

	public get users(): Collection<object> {
		return this.$collections.get(CollectionIndex.USERS)!;
	}

	public get products(): Collection<object> {
		return this.$collections.get(CollectionIndex.PRODUCTS)!;
	}
}

export default Repository;
