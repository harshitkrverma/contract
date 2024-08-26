import React, { useState, useEffect } from 'react';
import { getUsers, addUser } from '../api/userService.js';

const UserList = () => {
	const [users, setUsers] = useState([]);
	const [name, setName] = useState('');
	
	useEffect(() => {
		const fetchUsers = async () => {
			try {
				const usersList = await getUsers();
				setUsers(usersList);
			} catch (error) {
				console.error(error.message);
			}
		};
		
		fetchUsers();
	}, []);
	
	const handleAddUser = async () => {
		try {
			const newUser = await addUser({ name });
			setUsers([...users, newUser]);
			setName('');
		} catch (error) {
			console.error(error.message);
		}
	};
	
	return (
		<div>
			<h1>User List</h1>
			<ul>
				{users.map((user, index) => (
					<li key={index}>{user.name}</li>
				))}
			</ul>
			<input
				type="text"
				value={name}
				onChange={(e) => setName(e.target.value)}
				placeholder="Enter name"
			/>
			<button onClick={handleAddUser}>Add User</button>
		</div>
	);
};

export default UserList;
