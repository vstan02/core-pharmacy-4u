import { Repository } from '../src/repository';

function isCollection(object: object): boolean {
	return (
		'get' in object
		&& 'getAll' in object
		&& 'create' in object
		&& 'update' in object
		&& 'delete' in object
	);
}

describe('Store', () => {
	let store: Repository;

	describe('constructor', () => {
		it('should do not throw any error', () => {
			expect(() => {
				store = new Repository();
			}).not.toThrow();
		});
	});

	describe('users', () => {
		it('should be defined', () => {
			expect(store.users).toBeDefined();
		});

		it('should be a collection', () => {
			expect(isCollection(store.users)).toBe(true);
		});
	});

	describe('posts', () => {
		it('should be defined', () => {
			expect(store.posts).toBeDefined();
		});

		it('should be a collection', () => {
			expect(isCollection(store.posts)).toBe(true);
		});
	});

	describe('categories', () => {
		it('should be defined', () => {
			expect(store.categories).toBeDefined();
		});

		it('should be a collection', () => {
			expect(isCollection(store.categories)).toBe(true);
		});
	});

	describe('products', () => {
		it('should be defined', () => {
			expect(store.products).toBeDefined();
		});

		it('should be a collection', () => {
			expect(isCollection(store.products)).toBe(true);
		});
	});

	describe('comments', () => {
		it('should be defined', () => {
			expect(store.comments).toBeDefined();
		});

		it('should be a collection', () => {
			expect(isCollection(store.comments)).toBe(true);
		});
	});
});
