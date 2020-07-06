const fs = require('fs');
const path = require('path');
const bcrypt = require('bcrypt');
const { check, validationResult, body } = require('express-validator');
const db = require ("../database/models")
const { Op } = require("sequelize");

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
			return user.email == req.body.email &&
			bcrypt.compareSync(req.body.password, user.password)
		});
		
		if (userFound == "") {
			res.render('users/login', { errors: [{ msg: "Credenciales invalidas" }] });
			
			//console.log(userFound);
			//PRENDE SESION PARA EL USUARION LOGEADO
			//GUARDA AL USUARIO LOGUEADO PARA USARLOS EN LAS VISTAS
		} else {
			req.session.userFound = userFound;
			req.session.carrito = [];
			res.locals.userFound = userFound[0];

			if (req.body.remember != undefined){
				res.cookie('remember', userFound[0].email, {maxAge: 180000000})
			}

			res.redirect('/')
		}
	},
	logout: function(req,res,next){
        //cerrar sesión
		req.session.destroy();
		res.clearCookie('remember')
		res.redirect("/");
      },
	
	// Detail - Detail from one user
	profile: (req, res, next) => {
		let user = req.session.userFound
		//console.log("PROFILE-"+user2);
		res.render('./users/profile', { user: user })
	},
	
	// Create - Form to create
	register: (req, res, next) => {
		return res.render('users/register');
        	
	},
	
	// Create -  Method to store
	store: (req, res, next) => {
		
		let errors = validationResult(req);
		
		if (errors.isEmpty()) {
			/*let newUser;
			let userIdMaker = 0;
			for (let i = 0; i < users.length; i++) {
				if (users[i].id > userIdMaker) {
					userIdMaker = users[i].id;
				}
			}*/
			if (req.files == '') {
				//newUser = {
					//id: userIdMaker + 1,
				db.User.create({
					firstName: req.body.firstName,
					lastName: req.body.lastName,
					email: req.body.email,
					password: bcrypt.hashSync(req.body.password, 10),
					user:"",
					phone: req.body.phone,
					address:"",
					userType: "client",
					state: 1,
					avatar: 'default.png',
					created_at:"2020-07-03"
				});
			} else {
				//newUser = {
					//id: userIdMaker + 1,
				db.User.create({	
					firstName: req.body.firstName,
					lastName: req.body.lastName,
					email: req.body.email,
					password: bcrypt.hashSync(req.body.password, 10),
					user:"",
					phone: req.body.phone,
					address:"",
					userType: "client",
					state: 1,
					avatar: req.files[0].filename
				});
			}

			//users.push(newUser);
			//fs.writeFileSync(usersDB, JSON.stringify(users));
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

		if (errors.isEmpty()) {		
			
			if (req.files == '') {
				userEdited = {
					id: user[0].id,
					first_name: req.body.first_name,
					last_name: req.body.last_name,
					email: req.body.email,
					phone: req.body.phone,
					password: bcrypt.hashSync(req.body.password, 10),
					category: user[0].category,
					avatar: 'default.png'
				}
			} else {
				userEdited = {
					id: user[0].id,
					first_name: req.body.first_name,
					last_name: req.body.last_name,
					email: req.body.email,
					phone: req.body.phone,
					password: bcrypt.hashSync(req.body.password, 10),
					category: user[0].category,
					avatar: req.files[0].filename
				}
			}

			
			for (let i = 0; i < users.length; i++) {
				if (users[i].id == user[0].id) {
					users[i] = userEdited;
				}
			}

			req.session.userFound = [userEdited];
			

			fs.writeFileSync(usersDB, JSON.stringify(users));
			res.redirect('/users/login');
			
		} else {
			res.render("users/edit-form", {errors: errors.errors, datos: req.body});	
		}

	},
	
	// Delete - change user category to 'inactive'
	destroy: (req, res, next) => {
		//cambia categoría a inactivo
		req.session.userFound[0].category = "inactive"
		//reemplaza en en la base de datos de usuarios por el modificado
		for (let i = 0; i < users.length; i++) {
			if (users[i].id == req.session.userFound[0].id) {
				users[i] = req.session.userFound[0];
			}
		}
		//cierra sesion
		req.session.destroy();
		res.clearCookie('remember')
		//escribo en el JSON
		fs.writeFileSync(usersDB, JSON.stringify(users));
		res.redirect('/users/login');
	}
};

module.exports = controller;