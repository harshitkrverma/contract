import axios from 'axios';

const API_URL = process.env.MOCK_SERVER_URL ||'http://localhost:3000';

export const getUsers = async () => {
	try {
		const response = await axios.get(`${API_URL}/users`);
		return response.data;
	} catch (error) {
		throw new Error('Failed to fetch users');
	}
};

export const addUser = async (user) => {
	try {
		const response = await axios.post(`${API_URL}/users`, user, {
			headers: { 'Content-Type': 'application/json' },
			timeout: 5000,
		});
		return response.data;
	} catch (error) {
		// console.error('Error details:', error); // Log the full error
		// throw new Error('Failed to add user: ' + error.message); // Include the error message
	}
};
