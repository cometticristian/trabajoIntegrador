const fs = require('fs');
const path = require('path');
const db = require('../database/models');
const { Op } = require("sequelize");


const productsDB = path.join(__dirname, '../data/productsDB.json');
let products = JSON.parse(fs.readFileSync(productsDB, 'utf-8'));

const controller = {
	// Root - Show all products
	root: (req, res, next) => {
		db.Product.findAll(
			{
				include: [{ association: "Subcategory" },
				{ association: "Image" }]
			})

			.then(function (products) {
				res.render('./products/list', { category: products, nombreCategoria: "" })
			})
			.catch(function (error) {
				console.log(error);
			})
	},

	category: (req, res, next) => {

		let productReq = db.Product.findAll({
			where: { category_id: req.params.productCategory },
			include: [{ association: "Category" }, { association: "Image" }]
		})

		let categoryReq = db.Category.findAll({
			where: { id: req.params.productCategory }
		})

		Promise.all([productReq, categoryReq])
			.then(function ([category, categoryName]) {
				res.render('./products/list', {
					category: category,
					nombreCategoria: categoryName[0].name
				})
			})
			.catch(function (error) {
				console.log(error);
			})
	},

	/*let category = []
	products.forEach(function (product) {
		if (product.category == req.params.productCategory) {
			category.push(product)
		}
	})
	res.render('./products/list', { category: category,
		nombreCategoria: req.params.productCategory })
		*/

	subCategory: (req, res, next) => {

		let productReq = db.Product.findAll({
			where: { subcategory_id: req.params.productSubCategory },
			include: [{ association: "Subcategory" },
			{ association: "Category" },
			{ association: "Image" }]
		})

		let subcategoryReq = db.Subcategory.findAll(
			{
				where: { id: req.params.productSubCategory },
				include: [{ association: "Category" },
				{ association: "Product" }]
			})


		Promise.all([productReq, subcategoryReq])
			.then(function ([category, subcategoryName]) {
				console.log(subcategoryName[0].Category.name);
				res.render('./products/list', {
					category: category,
					nombreCategoria: subcategoryName[0].Category.name + " || " + subcategoryName[0].name
				})
			})
			.catch(function (error) {
				console.log(error);
			})
	},

	/*let category = [];
	let nombreCategoria = "";
	products.forEach(function (product) {
		if (product.subCategory == req.params.productSubCategory) {
			category.push(product);
			nombreCategoria = product.category
		}
	})
	res.render('./products/list', { category: category,
		nombreCategoria: nombreCategoria + " || " + req.params.productSubCategory })
		*/

	// Detail - Detail from one product
	detail: (req, res, next) => {

		db.Product.findByPk(req.params.productId,
			{
				include: [{ association: "Subcategory" },
				{ association: "Category" },
				{ association: "Image" }]
			})
			.then((product) => {
				categoria = product.category_id
				return product;
			})
			.then((productDetail) => {
				db.Product.findAll(
					{
						where: { category_id: productDetail.category_id },
						limit:4,
						include: [{ association: "Subcategory" },
						{ association: "Category" },
						{ association: "Image" }]
					})
					.then((similar) => {
						res.render('./products/detail', {
							product: productDetail,
							category: similar
						})
					})
					.catch(function (error) {
						console.log(error);
					})
			})
	},

	/*let product
	for (let i = 0; i < products.length; i++) {if (products[i].id == req.params.productId) {product = products[i];}}let category = []; products.forEach(function (similar) {if (similar.category == product.category) {category.push(similar);}})
	res.render('./products/detail', { product: product, category: category })
	*/


	// Create - Form to create
	create: (req, res, next) => {
		let categories = db.Category.findAll()
		let subCategories = db.Subcategory.findAll()

		Promise.all([categories, subCategories])
			.then(([categories, subCategories]) => {
				res.render('./products/create-form', { categories, subCategories })
			})
			.catch((error) => {
				console.log(error);
			})

	},

	// Create -  Method to store
	store: (req, res, next) => {
		let marcaBody = req.body.brand;
		marcaBody = marcaBody.toLowerCase();
		function MaysPrimera(string) {
			return string.charAt(0).toUpperCase() + string.slice(1);
		}
		marcaBody = MaysPrimera(marcaBody);

		db.Brand.findAll()
			.then((marcas) => {
				let contador = 0;
				let marca;
				for (let i = 0; i < marcas.length; i++) {
					if (marcaBody == marcas[i].dataValues.name) {
						contador++;
						marca = marcas[i]
					}
				}
				if (contador > 0) {
					db.Product.create({
						name: req.body.name,
						description: req.body.description,
						price: Number(req.body.price),
						discount: Number(req.body.discount),
						tax: req.body.tax,
						state: 1,
						category_id: req.body.category,
						subcategory_id: req.body.subcategory,
						brand_id: marca.dataValues.id
					})
						.then((newProduct) => {
							console.log(newProduct);
							
							db.Image.create({
								name: req.files[0].filename,
								main: 1,
								product_id: newProduct.id
							})
						})
						.then(() => {
							res.redirect('/products');
						})
						.catch((error) => {
							console.log(error);
						})
				} else {
					db.Brand.create({
						name: marcaBody
					})
						.then((brand) => {
							db.Product.create({
								name: req.body.name,
								description: req.body.description,
								price: Number(req.body.price),
								discount: Number(req.body.discount),
								tax: req.body.tax,
								state: 1,
								category_id: req.body.category,
								subcategory_id: req.body.subcategory,
								brand_id: brand.id
							})
								.then((newProduct) => {
									console.log(newProduct)
									db.Image.create({
										name: req.files[0].filename,
										main: 1,
										product_id: newProduct.id
									})
								})
						})
						.then(() => {
							res.redirect('/products');
						})
						.catch((error) => {
							console.log(error);
						})
				}
			})
			.catch((error) => {
				console.log(error);
			})

	},



	/* 		db.Product.create({
		name: req.body.name,
		description: req.body.description,
		price: Number(req.body.price),
		discount: Number(req.body.discount),
		tax: req.body.tax,
		state: 1,
		category_id: req.body.category,
		subcategory_id: req.body.subcategory,
		
		
		
		
		brand_id: req.body.brand
	})
	.then(() => {
		res.redirect('/products');
	})
	.catch((error) => {
		console.log(error);
	})
}, */



	/* let newProduct;
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
			price: Number(req.body.price),
			discount: Number(req.body.discount),
			tax: req.body.tax,
			state: 1,
			category_id: req.body.pickCategory,
			subcategory_id: req.body.pickSubCategory,
			brand_id: req.body.brand},
			
			
			image: 'logo-pickBazar.jpg',
			secondPick: '',
			thirdPick: '',
			fourthPick: '',
			important: 'new',
			
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
}, */

	// Update - Form to edit
	edit: (req, res, next) => {

		let categories = db.Category.findAll()
		let subCategories = db.Subcategory.findAll()
		let product = db.Product.findByPk(req.params.productId, {
			include: [{ association: 'Category' }, { association: 'Subcategory' }]
		})

		Promise.all([categories, subCategories, product])
			.then(([categories, subCategories, product]) => {
				res.render("./products/edit-form", { categories, subCategories, product })
			})
			.catch((error) => {
				console.log(error);
			})
	},

	// Update - Method to update
	update: (req, res, next) => {
		db.Product.update({
			name: req.body.name,
			description: req.body.description,
			price: Number(req.body.price),
			discount: Number(req.body.discount),
			tax: req.body.tax,
			state: 1,
			category_id: req.body.category,
			subcategory_id: req.body.subcategory,
		}, {
			where: {
				id: req.params.productId
			}
		})
			.then((productEdited) => {
				console.log(productEdited);
				console.log('$$$$$$$$$$$$$$$$$$$$$');
				console.log(productEdited.id);

				db.Image.update({
					name: req.files[0].filename,
					main: 1,
					product_id: productEdited.id
				}, {
					where: {
						product_id: productEdited.id
					}
				})
			})
			.then(() => {
				res.redirect('/products/detail/' + req.params.productId)
			})
			.catch((error) => {
				console.log(error);
			})

		/* 					db.Product.create({
								name: req.body.name,
								description: req.body.description,
								price: Number(req.body.price),
								discount: Number(req.body.discount),
								tax: req.body.tax,
								state: 1,
								category_id: req.body.category,
								subcategory_id: req.body.subcategory,
								brand_id: marca.dataValues.id
							})
								.then((newProduct) => {
									db.Image.create({
										name: req.files[0].filename,
										main: 1,
										product_id: newProduct.id
									})
								})
								.then(() => {
									res.redirect('/products');
								})
								.catch((error) => {
									console.log(error);
								})
						} else {
							db.Brand.create({
								name: marcaBody
							})
								.then((brand) => {
									db.Product.create({
										name: req.body.name,
										description: req.body.description,
										price: Number(req.body.price),
										discount: Number(req.body.discount),
										tax: req.body.tax,
										state: 1,
										category_id: req.body.category,
										subcategory_id: req.body.subcategory,
										brand_id: brand.id
									})
										.then((newProduct) => {
											console.log(newProduct)
											db.Image.create({
												name: req.files[0].filename,
												main: 1,
												product_id: newProduct.id
											})
										})
								})
								.then(() => {
									res.redirect('/products');
								})
								.catch((error) => {
									console.log(error);
								})
						}
					})
					.catch((error) => {
						console.log(error);
					}) */

		/* let id = req.params.productId;
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


		res.redirect('/products/detail/' + id); */
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


