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

import * as express from 'express';

import { Route } from '../routes';
import { Translator } from '../translator';

interface TranslatorConfig {
	locales: Array<string>;
	directory: string;
}

interface ServerConfig {
	port: number;
	host: string;
	static: string;
	views: string;
	translator: TranslatorConfig;
}

class Server {
	private readonly $port: number;
	private readonly $host: string;
	private readonly $app: express.Application;

	public constructor(config: ServerConfig) {
		this.$port = config.port;
		this.$host = config.host;
		this.$app = express();
		this.static = config.static;
		this.views = config.views;
		this.translator = config.translator;
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

	private set static(path: string) {
		this.$app.use(express.static(path));
	}

	private set views(path: string) {
		this.$app.set('views', path);
	}

	private set translator(config: TranslatorConfig) {
		Translator.configure(config);
	}

	public set routes(routes: Array<Route>) {
		routes.map((route: Route) => { this.route = route });
	}

	private set route(route: Route) {
		this.$app.use(route.path, route.router);
	}
}

export default Server;
