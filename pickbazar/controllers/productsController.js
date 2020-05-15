const fs = require('fs');
const path = require('path');

const controller = {
	// Root - Show all products
	root: (req, res) => {
		res.render('./products/products', {})
	},

	// Detail - Detail from one product
	detail: (req, res) => {
		res.render('./products/detail', {})
	},

	// Create - Form to create
	create: (req, res) => {
		res.render('./products/create-form')
	},
	
	// Create -  Method to store
	store: (req, res) => {
		res.send("Producto cargado correctamente");
	},

	// Update - Form to edit
	edit: (req, res) => {
		res.render("./products/edit-form", {})
    },
    
	// Update - Method to update
	update: (req, res) => {
		res.redirect('./products/products')//detail/'+ parseInt(req.params.productId))
	},

	// Delete - Delete one product from DB
	destroy : (req, res) => {
		res.redirect('./products/products');
    }
};

module.exports = controller;