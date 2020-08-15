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

describe('Repository', () => {
	let repo: Repository;

	describe('constructor', () => {
		it('should do not throw any error', () => {
			expect(() => {
				repo = new Repository();
			}).not.toThrow();
		});
	});

	describe('users', () => {
		it('should be defined', () => {
			expect(repo.users).toBeDefined();
		});

		it('should be a collection', () => {
			expect(isCollection(repo.users)).toBe(true);
		});
	});

	describe('posts', () => {
		it('should be defined', () => {
			expect(repo.posts).toBeDefined();
		});

		it('should be a collection', () => {
			expect(isCollection(repo.posts)).toBe(true);
		});
	});

	describe('categories', () => {
		it('should be defined', () => {
			expect(repo.categories).toBeDefined();
		});

		it('should be a collection', () => {
			expect(isCollection(repo.categories)).toBe(true);
		});
	});

	describe('products', () => {
		it('should be defined', () => {
			expect(repo.products).toBeDefined();
		});

		it('should be a collection', () => {
			expect(isCollection(repo.products)).toBe(true);
		});
	});

	describe('comments', () => {
		it('should be defined', () => {
			expect(repo.comments).toBeDefined();
		});

		it('should be a collection', () => {
			expect(isCollection(repo.comments)).toBe(true);
		});
	});
});
