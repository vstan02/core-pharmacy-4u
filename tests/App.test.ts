import { App } from '../src/core';
import { Repository } from '../src/repository';

describe('App', () => {
	describe('constructor', () => {
		it('should do not throw any error', () => {
			expect(() => {
				new App(new Repository());
			}).not.toThrow();
		});
	});
});
