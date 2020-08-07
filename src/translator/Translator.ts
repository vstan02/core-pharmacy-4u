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

import * as i18n from 'i18n';

interface TranslatorConfig {
	locales: Array<string>;
	directory: string;
}

class Translator {
	private static locales: Array<string>;
	private readonly $locale: string;

	public constructor(locale: string) {
		this.$locale = locale in Translator.locales ? locale : Translator.locales[0];
	}

	public translate(text: string): string {
		i18n.setLocale(this.$locale);
		return i18n.__(text);
	}

	public static configure(config: TranslatorConfig): void {
		i18n.configure(config);
		Translator.locales = config.locales;
	}
}

export default Translator;
