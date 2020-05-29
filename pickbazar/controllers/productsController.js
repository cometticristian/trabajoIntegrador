const fs = require('fs');
const path = require('path');

const productsDB = path.join(__dirname, '../data/productsDB.json');
let products = JSON.parse(fs.readFileSync(productsDB, 'utf-8'));

const controller = {
	// Root - Show all products
	root: (req, res, next) => {
		res.render('./products/products', { products: products })
	},

	category: (req, res, next) => {

		let category = []
		for (let i = 0; i < products.length; i++) {
			if (products[i].category == req.params.productCategory) {
				category.push(products[i])
			}
		}
		res.render('./products/products', { category: category })
	},

	subCategory: (req, res, next) => {

		let category = []
		for (let i = 0; i < products.length; i++) {
			if (products[i].subCategory == req.params.productSubCategory) {
				category.push(products[i])
			}
		}
		res.render('./products/products', { category: category })
	},

	// Detail - Detail from one product
	detail: (req, res, next) => {
		res.render('./products/detail', {})
	},

	// Create - Form to create
	create: (req, res, next) => {
		res.render('./products/create-form')
	},

	// Create -  Method to store
	store: (req, res, next) => {
		res.send("Producto cargado correctamente");
	},

	// Update - Form to edit
	edit: (req, res, next) => {
		res.render("./products/edit-form", {})
	},

	// Update - Method to update
	update: (req, res, next) => {
		res.redirect('./products/products')//detail/'+ parseInt(req.params.productId))
	},

	// Delete - Delete one product from DB
	destroy: (req, res, next) => {
		res.redirect('./products/products');
	}
};

module.exports = controller;


 