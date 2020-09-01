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

import * as path from 'path';
import { check } from 'express-validator';
import * as multer from 'multer';

function storage(upload: string): multer.StorageEngine {
	return multer.diskStorage({
		destination(req, file, done) {
			return done(null, upload);
		},
		filename(req, file, done) {
			return done(null, Date.now() + path.extname(file.originalname));
		}
	});
}

export default function (config: any): any {
	const upload = multer({ storage: storage(config.upload) });

	return {
		post: [
			upload.single('picture'),
			check('name')
				.exists().withMessage('Name is required!')
				.notEmpty().withMessage('Name is required!'),
			check(['description_en', 'description_de', 'description_fr', 'description_it'])
				.optional(),
			check('link')
				.exists().withMessage('Link is required!')
				.notEmpty().withMessage('Link is required!')
		],
		put: [
			upload.single('picture'),
			check('name')
				.optional()
				.notEmpty().withMessage('Name is required!'),
			check(['description_en', 'description_de', 'description_fr', 'description_it'])
				.optional()
				.notEmpty().withMessage('Description is required!'),
			check('link')
				.optional()
				.notEmpty().withMessage('Link is required!')
		]
	};
};
