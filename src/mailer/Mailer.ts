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

import * as mailgun from 'mailgun-js';

interface MailerConfig {
	domain: string;
	apiKey: string;
}

class Mailer {
	private static apiKey: string;
	private static domain: string;
	private $from: string;
	private $to: string;
	private $mailgun: mailgun.Mailgun;

	public constructor(from: string, to: string) {
		this.$from = from;
		this.$to = to;
		this.$mailgun = mailgun({
			apiKey: Mailer.apiKey,
			domain: Mailer.domain
		});
	}

	public send(subject: string, content: string): void {
		this.$mailgun.messages()
			.send({
				subject,
				html: content,
				from: this.$from,
				to: this.$to
			}).catch((error: Error) => { throw error });
	}

	public static configure(config: MailerConfig): void {
		Mailer.apiKey = config.apiKey;
		Mailer.domain = config.domain;
	}
}

export default Mailer;
