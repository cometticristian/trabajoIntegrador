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
		for (let i = 0; i < products.length; i++) {
			if (products[i].id == req.params.productId) {
				product = products[i];
			}
		}
		let category = [];
		products.forEach(function (similar) {
			if (similar.category == product.category) {
				category.push(similar);
			}

		})
		res.render('./products/detail', { product: product, category: category })
	},

	// Create - Form to create
	create: (req, res, next) => {
		res.render('./products/create-form')
	},

	// Create -  Method to store
	store: (req, res, next) => {

		let newProduct;
		let productIdMaker = 0;
		for (let i = 0; i < products.length; i++) {
			if (products[i].id > productIdMaker) {
				productIdMaker = products[i].id;
			}
		}

		if (req.files == "" && req.files[1] == undefined && req.files[2] == undefined && req.files[3] == undefined) {
			newProduct = {
				name: req.body.name,
				description: req.body.description,
				price: req.body.price,
				discount: req.body.discount,
				tax: req.body.tax,
				state: 1,
				onsale: 0,
				brand_id: req.body.brand,
				category_id: req.body.category,
				subcategory_id: req.body.pickSubCategory,
				image: 'logo-pickBazar.jpg'
			}
		} else if (req.files[0] != undefined && req.files[1] == undefined && req.files[2] == undefined && req.files[3] == undefined) {
			newProduct = {
				id: productIdMaker + 1,
				category: req.body.pickCategory,
				subCategory: req.body.pickSubCategory,
				name: req.body.name,
				brand: req.body.brand,
				description: req.body.description,
				price: Number(req.body.price),
				tax: req.body.tax,
				image: req.files[0].filename,
				secondPick: '',
				thirdPick: '',
				fourthPick: '',
				important: 'new',
				discount: Number(req.body.discount)
			}
		} else if (req.files[0] != undefined && req.files[1] != undefined && req.files[2] == undefined && req.files[3] == undefined) {
			newProduct = {
				id: productIdMaker + 1,
				category: req.body.pickCategory,
				subCategory: req.body.pickSubCategory,
				name: req.body.name,
				brand: req.body.brand,
				description: req.body.description,
				price: Number(req.body.price),
				tax: req.body.tax,
				image: req.files[0].filename,
				secondPick: req.files[1].filename,
				thirdPick: '',
				fourthPick: '',
				important: 'new',
				discount: Number(req.body.discount)
			}
		} else if (req.files[0] != undefined && req.files[1] != undefined && req.files[2] != undefined && req.files[3] == undefined) {
			newProduct = {
				id: productIdMaker + 1,
				category: req.body.pickCategory,
				subCategory: req.body.pickSubCategory,
				name: req.body.name,
				brand: req.body.brand,
				description: req.body.description,
				price: Number(req.body.price),
				tax: req.body.tax,
				image: req.files[0].filename,
				secondPick: req.files[1].filename,
				thirdPick: req.files[2].filename,
				fourthPick: '',
				important: 'new',
				discount: Number(req.body.discount)
			}
		} else if (req.files[0] != undefined && req.files[1] != undefined && req.files[2] != undefined && req.files[3] != undefined) {
			newProduct = {
				id: productIdMaker + 1,
				category: req.body.pickCategory,
				subCategory: req.body.pickSubCategory,
				name: req.body.name,
				brand: req.body.brand,
				description: req.body.description,
				price: Number(req.body.price),
				tax: req.body.tax,
				image: req.files[0].filename,
				secondPick: req.files[1].filename,
				thirdPick: req.files[2].filename,
				fourthPick: req.files[3].filename,
				important: 'new',
				discount: Number(req.body.discount)
			}
		}
		products.push(newProduct);
		fs.writeFileSync(productsDB, JSON.stringify(products));
		res.redirect('/products');
	},

	// Update - Form to edit
	edit: (req, res, next) => {
		let product;
		let id = req.params.productId;
		for (let i = 0; i < products.length; i++) {
			if (products[i].id == id) {
				product = products[i];
			}
		}
		res.render("./products/edit-form", { product: product })
	},

	// Update - Method to update
	update: (req, res, next) => {

		let id = req.params.productId;
		let productToEdit;
		let productEdited;

		for (let i = 0; i < products.length; i++) {
			if (products[i].id == id) {
				productToEdit = products[i];
			}
		}
		if (req.files == "" && req.files[1] == undefined && req.files[2] == undefined && req.files[3] == undefined) {
			productEdited = {
				id: productToEdit.id,
				category: req.body.pickCategory,
				subCategory: req.body.pickSubCategory,
				name: req.body.name,
				brand: req.body.brand,
				description: req.body.description,
				price: Number(req.body.price),
				tax: req.body.tax,
				important: productToEdit.important,
				image: 'logo-pickBazar.jpg',
				secondPick: '',
				thirdPick: '',
				fourthPick: '',
				discount: Number(req.body.discount)
			}
		} else if (req.files[0] != undefined && req.files[1] == undefined && req.files[2] == undefined && req.files[3] == undefined) {
			productEdited = {
				id: productToEdit.id,
				category: req.body.pickCategory,
				subCategory: req.body.pickSubCategory,
				name: req.body.name,
				brand: req.body.brand,
				description: req.body.description,
				price: Number(req.body.price),
				tax: req.body.tax,
				important: productToEdit.important,
				image: req.files[0].filename,
				secondPick: '',
				thirdPick: '',
				fourthPick: '',
				discount: Number(req.body.discount)
			}
		} else if (req.files[0] != undefined && req.files[1] != undefined && req.files[2] == undefined && req.files[3] == undefined) {
			productEdited = {
				id: productToEdit.id,
				category: req.body.pickCategory,
				subCategory: req.body.pickSubCategory,
				name: req.body.name,
				brand: req.body.brand,
				description: req.body.description,
				price: Number(req.body.price),
				tax: req.body.tax,
				important: productToEdit.important,
				image: req.files[0].filename,
				secondPick: req.files[1].filename,
				thirdPick: '',
				fourthPick: '',
				discount: Number(req.body.discount)
			}
		} else if (req.files[0] != undefined && req.files[1] != undefined && req.files[2] != undefined && req.files[3] == undefined) {
			productEdited = {
				id: productToEdit.id,
				category: req.body.pickCategory,
				subCategory: req.body.pickSubCategory,
				name: req.body.name,
				brand: req.body.brand,
				description: req.body.description,
				price: Number(req.body.price),
				tax: req.body.tax,
				important: productToEdit.important,
				image: req.files[0].filename,
				secondPick: req.files[1].filename,
				thirdPick: req.files[2].filename,
				fourthPick: '',
				discount: Number(req.body.discount)
			}
		} else if (req.files[0] != undefined && req.files[1] != undefined && req.files[2] != undefined && req.files[3] != undefined) {
			productEdited = {
				id: productToEdit.id,
				category: req.body.pickCategory,
				subCategory: req.body.pickSubCategory,
				name: req.body.name,
				brand: req.body.brand,
				description: req.body.description,
				price: Number(req.body.price),
				tax: req.body.tax,
				important: productToEdit.important,
				image: req.files[0].filename,
				secondPick: req.files[1].filename,
				thirdPick: req.files[2].filename,
				fourthPick: req.files[3].filename,
				discount: Number(req.body.discount)
			}
		}


		for (let i = 0; i < products.length; i++) {
			if (products[i].id == id) {
				products[i] = productEdited;
			}
		}

		fs.writeFileSync(productsDB, JSON.stringify(products));

		
		res.redirect('/products/detail/' + id);
	},

	// Delete - Delete one product from DB
	destroy: (req, res, next) => {

		let id = req.params.productId;

		products = products.filter((producto) => { return producto.id != id });

		fs.writeFileSync(productsDB, JSON.stringify(products));
		res.redirect('/products');
	}
};

module.exports = controller;


