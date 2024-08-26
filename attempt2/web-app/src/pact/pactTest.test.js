// import { Pact } from '@pact-foundation/pact';
// import * as path from 'path';
// import { addUser, getUsers } from '../api/userService';
//
// const provider = new Pact({
// 	consumer: 'UserConsumer',
// 	provider: 'UserProvider',
// 	port: 3000,
// 	log: path.resolve(process.cwd(), 'logs', 'pact.log'),
// 	dir: path.resolve(process.cwd(), 'pacts'),
// 	logLevel: 'DEBUG',
// 	spec: 2,
// });
//
// describe('Pact with User API', () => {
// 	beforeAll(() => provider.setup());
// 	afterAll(async () => {
// 		await provider.verify();
// 		await provider.finalize(); // Ensure the mock server is properly stopped
// 	});
//
// 	describe('GET /users', () => {
// 		beforeEach(() => {
// 			return provider.addInteraction({
// 				state: 'users exist',
// 				uponReceiving: 'a request for users',
// 				withRequest: {
// 					method: 'GET',
// 					path: '/users',
// 				},
// 				willRespondWith: {
// 					status: 200,
// 					body: [
// 						{
// 							name: 'John Doe',
// 						},
// 					],
// 				},
// 			});
// 		});
// 		afterEach(async () => {
// 			await provider.finalize();
// 			console.log("This is called ")
// 		})
//
// 		it('should fetch all users', async () => {
// 			const users = await getUsers();
// 			expect(users).toEqual([{ name: 'John Doe' }]);
// 		});
// 	});
//
// 	describe('POST /users', () => {
// 		beforeEach(() => {
// 			return provider.addInteraction({
// 				state: 'user can be created',
// 				uponReceiving: 'a request to create a user',
// 				withRequest: {
// 					method: 'POST',
// 					path: '/users',
// 					headers: { 'Content-Type': 'application/json' },
// 					body: { name: 'Jane Doe' },
// 				},
// 				willRespondWith: {
// 					status: 201,
// 					body: {
// 						name: 'Jane Doe',
// 					},
// 				},
// 			});
// 		});
//
// 		it('should create a new user', async () => {
// 			const newUser = await addUser({ name: 'Jane Doe' });
// 			expect(newUser).toEqual({ name: 'Jane Doe' });
// 		});
// 	});
// });


import { Pact } from '@pact-foundation/pact';
import * as path from 'path';
import { addUser, getUsers } from '../api/userService';

const provider = new Pact({
	consumer: 'UserConsumer',
	provider: 'UserProvider',
	port: 3000,
	log: path.resolve(process.cwd(), 'logs', 'pact.log'),
	dir: path.resolve(process.cwd(), 'pacts'),
	logLevel: 'DEBUG',
	spec: 2,
});

describe('Pact with User API', () => {
	beforeAll(async () => {
		await provider.setup();
	});
	
	afterAll(async () => {
		await provider.finalize();
	});
	
	afterEach(async () => {
		await provider.verify();
	});
	
	describe('GET /users and POST /users', () => {
		beforeEach(async () => {
			// Setup GET /users interaction
			await provider.addInteraction({
				state: 'users exist',
				uponReceiving: 'a request for users',
				withRequest: {
					method: 'GET',
					path: '/users',
				},
				willRespondWith: {
					status: 200,
					body: [
						{
							name: 'John Doe',
						},
					],
					headers: {
						'Content-Type': 'application/json',
					},
				},
			});
			
			// Setup POST /users interaction
			await provider.addInteraction({
				state: 'user can be created',
				uponReceiving: 'a request to create a user',
				withRequest: {
					method: 'POST',
					path: '/users',
					headers: { 'Content-Type': 'application/json' },
					body: { name: 'Jane Doe' },
				},
				willRespondWith: {
					status: 201,
					body: {
						name: 'Jane Doe',
					},
					headers: {
						'Content-Type': 'application/json',
					},
				},
			});
		});
		
		it('should fetch all users', async () => {
			const users = await getUsers();
			expect(users).toEqual([{ name: 'John Doe' }]);
		});
		
		it('should create a new user', async () => {
			const newUser = await addUser({ name: 'Jane Doe' });
			expect(newUser).toEqual({ name: 'Jane Doe' });
		});
	});
});
