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
export const HOST = process.env.HOST || '0.0.0.0';
export const STATIC = process.env.STATIC || resolve(__dirname, '../public');

// Database:
export const MONGO_URL = process.env.MONGO_URL || 'mongodb+srv://vstan:stan2002@cluster0.cgerr.mongodb.net/pharmacy?retryWrites=true&w=majority';

// Mailer:
export const MAILER_FROM = process.env.MAILER_FROM || 'Pharmacy 4U' +
	' <pharmacy@next-byte.com>';
export const MAILER_TO = process.env.MAILER_TO || 'contact.viagra.enligne@gmail.com';
export const MAILGUN_KEY = process.env.MAILGUN_KEY || 'b162ce3054c5caa0aafd65d395119cf2-203ef6d0-23082686';
export const MAILGUN_URL = process.env.MAILGUN_URL || 'sandbox5d0ae916469b40e9b5cebbdcb40291b7.mailgun.org';
