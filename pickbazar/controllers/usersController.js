const fs = require('fs');
const path = require('path');
const bcrypt = require('bcrypt');
const { check, validationResult, body } = require('express-validator');


const usersDB = path.join(__dirname, '../data/usersDB.json');
let users = JSON.parse(fs.readFileSync(usersDB, 'utf-8'));

const controller = {

	login: (req, res, next) => {
		res.render('users/login');
	},

	processLogin: (req, res, next) => {
		/*
		Tomar los datos
		let userForm = req.body;
		buscar elusuario enla base de datos, por email:req.body.email
		Si el usuario existe
			bcrypt hashcompare entre user.password y req.body.password
			si la contraseña es valida
				Devuelvo user a la vista y redirijo
			Si la contraseña no es valida
				Vuelvo a la vista con un error
		Si el usuario no existe 
			redirijo a la vista donde estaba con un error
		*/
	},

	// Detail - Detail from one user
	profile: (req, res, next) => {
		let user
		for (let i = 0; i < users.length; i++) {
			if (users[i].id == req.params.userId) {
				user = users[i];
			}
		}

		res.render('./users/profile', { user: user })
	},

	// Create - Form to create
	register: (req, res, next) => {
		res.render('users/register')
	},

	// Create -  Method to store
	store: (req, res, next) => {

		let errors = validationResult(req);

		if (errors.isEmpty()) {

			let userIdMaker = 0;
			for (let i = 0; i < users.length; i++) {
				if (users[i].id > userIdMaker) {
					userIdMaker = users[i].id;
				}
			}
			let newUser = {
				id: userIdMaker + 1,
				first_name: req.body.first_name,
				last_name: req.body.last_name,
				email: req.body.email,
				phone: req.body.phone,
				password: bcrypt.hashSync(req.body.password, 10),
				category: req.body.category,
				avatar: req.files[0].filename
			}
			users.push(newUser);
			fs.writeFileSync(usersDB, JSON.stringify(users));
			res.redirect('login');
		} else {
			res.render('users/register', {errors: errors.errors});
		}
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