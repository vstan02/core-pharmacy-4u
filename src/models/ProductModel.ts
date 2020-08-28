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

/* eslint-disable */

import { Schema, model } from 'mongoose';

import Models from './Models';

const schema = new Schema({
	name: { type: String, required: true },
	link: { type: String, required: true },
	picture: { type: String, required: true },
	description_en: { type: String, required: true },
	description_fr: { type: String, required: true },
	description_it: { type: String, required: true },
	description_de: { type: String, required: true },
});

export default model(Models.PRODUCTS, schema);
