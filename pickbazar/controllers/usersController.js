const fs = require('fs');
const path = require('path');

const usersDB = path.join(__dirname, '../data/usersDB.json');
let users = JSON.parse(fs.readFileSync(usersDB, 'utf-8'));

const controller = {
	
	// Detail - Detail from one user
	detail: (req, res, next) => {
		let user
		for (let i = 0; i < users.length; i++) {
			if (users[i].id == req.params.userId) {
				user = users[i];
			}
		}
				
		res.render('./users/profile', { user: user })
	},

	// Create - Form to create
	create: (req, res, next) => {
		res.render('./login')
	},

	// Create -  Method to store
	store: (req, res, next) => {
		let userIdMaker = 0;
		for (let i = 0; i < users.length; i++) {
			if (users[i].id > userIdMaker) {
				userIdMaker = users[i].id;
			}
		}
		let newUser = {
			id: userIdMaker + 1,
			first_name: req.body.pickFirstName,
			last_name: req.body.pickLastName,
			email: req.body.email,
			password: req.body.password,
			category: req.body.category,
			avatar: ""
		}
		users.push(newUser);
		fs.writeFileSync(usersDB, JSON.stringify(users));
		res.redirect('./users/profile');
	},

	// Update - Form to edit
	edit: (req, res, next) => {
		let user;
		let id = req.params.userId;
		for (let i = 0; i < users.length; i++) {
			if (users[i].id == id) {
				user = users[i];
			} 
		}
		res.render("./users/edit-form", { user: user })
	},

	// Update - Method to update
	update: (req, res, next) => {
		let id = req.params.userId;
		userEdited = {
			id: Number(id),
			first_name: req.body.pickFirstName,
			last_name: req.body.pickLastName,
			email: req.body.email,
			password: req.body.password,
			category: req.body.category,
			avatar: ""
		}

		for (let i = 0; i < users.length; i++) {
			if (users[i].id == id) {
				users[i] = userEdited;
			}
		}
		fs.writeFileSync(usersDB, JSON.stringify(users));

		console.log(id);
		res.redirect('./users/profile/' + id);
	},

	// Delete - Delete one product from DB
	destroy: (req, res, next) => {

		let id = req.params.userId;

		users = users.filter((user) => { return user.id != id });

		fs.writeFileSync(usersDB, JSON.stringify(users));
		res.redirect('/login');
	}
};

module.exports = controller;