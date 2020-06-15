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
				
		let errors = validationResult(req);
		
		let userFound;
		if (!errors.isEmpty()) {
			res.render('users/login', { errors: errors.errors });
		}
		
		userFound = users.filter(function (user) {
			return user.email == req.body.email && bcrypt.compareSync(req.body.password, user.password) //user.password == req.body.password;
		});
		
		if (userFound == "") {
			res.render('users/login', { errors: [{ msg: "Credenciales invalidas" }] });
			
			//console.log(userFound);
			//PRENDE SESION PARA EL USUARION LOGEADO
			//GUARDA AL USUARIO LOGUEADO PARA USARLOS EN LAS VISTAS
		} else {
			req.session.userFound = userFound;
			res.locals.userFound = userFound[0];
			//console.log(userFound[0]);
			//console.log(req.session.userFound[0]);
			//console.log("LOGIN-"+res.locals.userFound);
			res.redirect('/users/profile')
		}
	},
	logout: function(req,res,next){
        //cerrar sesión
        req.session.destroy();
        res.redirect("/users/login");
      },
	
	// Detail - Detail from one user
	profile: (req, res, next) => {
		let user = req.session.userFound
		//console.log("PROFILE-"+user2);
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
				category: 'active',
				avatar: req.files[0].filename
			}

			users.push(newUser);
			fs.writeFileSync(usersDB, JSON.stringify(users));
			res.redirect('login');
		} else {
			res.render('users/register', {errors: errors.errors, datos: req.body});
		}
	},
	
	
	// Update - Form to edit
	edit: (req, res, next) => {
		let user = req.session.userFound

		res.render("./users/edit-form", { user: user })
	},
	
	// Update - Method to update
	update: (req, res, next) => {

		let errors = validationResult(req);
		let user = req.session.userFound;
		console.log(user);

		if (errors.isEmpty()) {			
			userEdited = {
				id: user[0].id,
				first_name: req.body.first_name,
				last_name: req.body.last_name,
				email: req.body.email,
				phone: req.body.phone,
				password: bcrypt.hashSync(req.body.password, 10),
				category: 'active',
				avatar: ""
			}
			
			for (let i = 0; i < users.length; i++) {
				if (users[i].id == user[0].id) {
					users[i] = userEdited;
				}
			}

			req.session.userFound = [userEdited];
			

			fs.writeFileSync(usersDB, JSON.stringify(users));
			//console.log(req.session.userFound);
			res.redirect('/users/login');
			
		} else {
			res.render("users/edit-form", {errors: errors.errors, datos: req.body});	
		}

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