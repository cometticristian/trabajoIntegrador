const fs = require('fs');
const path = require('path');

const productsDB = path.join(__dirname, '../data/productsDB.json');
let products = JSON.parse(fs.readFileSync(productsDB, 'utf-8'));

const controller = {
	// Root - Show all products
	root: (req, res, next) => {
		res.render('./products/list', { category: products, nombreCategoria: "" })
	},
	
	category: (req, res, next) => {
		let category = []
		products.forEach(function (product) {
			if (product.category == req.params.productCategory) {
				category.push(product)
			}
		})
		res.render('./products/list', { category: category, nombreCategoria: req.params.productCategory })
	},
	
	subCategory: (req, res, next) => {
		let category = [];
		let nombreCategoria = "";
		products.forEach(function (product) {
			if (product.subCategory == req.params.productSubCategory) {
				category.push(product);
				nombreCategoria = product.category
			}
		})
		res.render('./products/list', { category: category, nombreCategoria: nombreCategoria + " || " + req.params.productSubCategory })
	},
	
	// Detail - Detail from one product
	detail: (req, res, next) => {
		let product
		for(let i=0; i<products.length; i++){
			if(products[i].id == req.params.productId){
				product = products[i];
			}
		}
		let category = [];
		products.forEach(function (similar) {
			if (similar.category == product.category) {
				category.push(similar);
			}
			
		})
		//category=[category[0],category[1], category[2],category[3]];
		res.render('./products/detail', {product:product, category:category})
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


