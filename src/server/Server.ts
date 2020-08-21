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

import * as express from 'express';
import * as cors from 'cors';

import { Route } from '../routes';
import { Translator } from '../translator';
import { Mailer } from '../mailer';

interface TranslatorConfig {
	locales: Array<string>;
	directory: string;
}

interface MailerConfig {
	apiKey: string;
	domain: string;
}

interface ServerConfig {
	port: number;
	host: string;
	translator: TranslatorConfig;
	mailer: MailerConfig;
}

class Server {
	private readonly $port: number;
	private readonly $host: string;
	private readonly $app: express.Application;

	public constructor(config: ServerConfig) {
		this.$port = config.port;
		this.$host = config.host;
		this.$app = express();
		this.translator = config.translator;
		this.mailer = config.mailer;
		this.middleware = [
			cors(),
			express.json()
		];
	}

	public run(): void {
		this.setup();

		this.$app.listen(this.port, this.host, error => {
			if (error) {
				throw error;
			}

			console.log('>>> ' + this.url);
		});
	}

	private setup(): void {
		this.$app.set('view engine', 'ejs');
		this.$app.set('x-powered-by', false);
	}

	public get url(): string {
		return `http://${ this.host }:${ this.port }`;
	}

	public get host(): string {
		return this.$host;
	}

	public get port(): number {
		return this.$port;
	}

	private set translator(config: TranslatorConfig) {
		Translator.configure(config);
	}

	private set mailer(config: MailerConfig) {
		Mailer.configure(config);
	}

	private set middleware(middleware: Array<express.RequestHandler>) {
		middleware.map((middleware: express.RequestHandler) => {
			this.$app.use(middleware);
		});
	}

	public set routes(routes: Array<Route>) {
		routes.map((route: Route) => {
			this.$app.use(route.path, route.router);
		});
	}
}

export default Server;
