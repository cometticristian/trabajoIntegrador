const db = require('../database/models');
const fs = require('fs');
const path = require('path');
const { Op } = require("sequelize");

//const productsDB = path.join(__dirname, '../data/productsDB.json');
//let products = JSON.parse(fs.readFileSync(productsDB, 'utf-8'));

const controller = {

	root: (req, res, next) => {

		let selectedReq = db.Product.findAll(
			{
				limit: 8,
				include: [{ association: "Subcategory" }, { association: "Image" }]
			})

		let newsReq = db.Product.findAll({/*where:{id:{[Op.gt]:8}*/
			order: [['created_at', 'DESC']],
			limit: 4,
			include: [{ association: "Subcategory" }, { association: "Image" }]
		})

		Promise.all([selectedReq, newsReq])
			.then(function ([selected, news]) {
				//console.log(selected[0].Image[0].name);
				res.render("index", { selected: selected, news: news })
			})
			.catch(function (error) {
				console.log(error);
			})

		/*let selected = products.filter(product=>{
			return product.important=="home";
		});
		let news = products.filter(product=>{
			return product.important=="new";
		});
		res.render ('index', {selected, news});
		*/
	},

	search: (req, res, next) => {
		let search = req.query.keywords;
		if (req.query.keywords!=0){
		function capitalize(search) {
			return search[0].toUpperCase() + search.slice(1);
		  }
	
		db.Product.findAll(
			{where: {
				name: { [Op.or]: [{ [Op.substring]: search }, { [Op.startsWith]: capitalize(search) }] }
			},
				include: [{ association: "Subcategory" }, { association: "Image" }]
			})
			.then((category) => {
				console.log(category);
				
			res.render('products/search', { category: category });
		})

		}else{res.render('products/search', { category: [] });}
	}
	}

module.exports = controller;