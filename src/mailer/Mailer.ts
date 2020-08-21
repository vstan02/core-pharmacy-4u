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
	from: string;
	to: string;
	domain: string;
	apiKey: string;
}

class Mailer {
	private $from: string;
	private $to: string;
	private $mailgun: mailgun.Mailgun;

	public constructor(config: MailerConfig) {
		this.$from = config.from;
		this.$to = config.to;
		this.$mailgun = mailgun({
			apiKey: config.apiKey,
			domain: config.domain
		});
	}

	public send(subject: string, content: string): void {
		this.$mailgun.messages()
			.send({
				subject,
				text: content,
				from: this.$from,
				to: this.$to
			}).catch((error: Error) => { throw error });
	}
}

export default Mailer;
