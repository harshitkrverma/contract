// test/app.test.js
import request from 'supertest';
import app from '../app.js';

afterAll(async () => {
	// Code to run after all tests
	// e.g., disconnect from a database, stop a server, etc.
	console.log('Cleanup after all tests');
});

describe('GET /users', () => {
	it('should return an empty array initially', async () => {
		const res = await request(app).get('/users');
		expect(res.statusCode).toBe(200);
		expect(res.body).toEqual([]);
	});
});

describe('POST /users', () => {
	it('should add a new user and return it', async () => {
		const newUser = { name: 'John Doe' };
		const res = await request(app).post('/users').send(newUser);
		expect(res.statusCode).toBe(201);
		expect(res.body).toEqual(newUser);
	});
	
	it('should return 400 if name is missing', async () => {
		const res = await request(app).post('/users').send({});
		expect(res.statusCode).toBe(400);
		expect(res.body).toEqual({ error: 'Name is required' });
	});
});

describe('GET /users after adding a user', () => {
	it('should return the array with the added user', async () => {
		const res = await request(app).get('/users');
		expect(res.statusCode).toBe(200);
		expect(res.body).toEqual([{ name: 'John Doe' }]);
	});
});
