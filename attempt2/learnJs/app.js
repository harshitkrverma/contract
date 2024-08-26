// app.js
import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

let users = [];
const port = process.env.PORT || 3000;

// GET request to fetch all users
app.get('/users', (req, res) => {
	res.status(200).json(users);
});

// POST request to add a new user
app.post('/users', (req, res) => {
	const user = req.body;
	if (user && user.name) {
		users.push(user);
		res.status(201).json(user);
		console.log(req)
	} else {
		res.status(400).json({ error: 'Name is required' });
	}
});

app.listen(port, ()=>{
	console.log("Server is running om http://localhost:"+port)
})
export default app;
