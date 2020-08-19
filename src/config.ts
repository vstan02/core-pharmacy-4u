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

import { resolve } from 'path';

// Crypto:
export const TRANSL_LOCALES = ['en', 'fr', 'it', 'de'];
export const TRANSL_DIR = resolve(__dirname, '../locales');

// Token:
export const TOKEN_SECRET: string = process.env.TOKEN_SECRET || 'topsecret';
export const TOKEN_DURATION: string = process.env.TOKEN_SECRET || '1h';

// Server:
export const PORT = Number(process.env.PORT) || 3000;
export const HOST = process.env.HOST || 'localhost';

// Database:
export const MONGO_URL = process.env.MONGO_URL || 'mongodb://localhost:27017/pharmacy';
