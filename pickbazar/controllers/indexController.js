const fs = require('fs');
const path = require('path');

const productsDB = path.join(__dirname, '../data/productsDB.json');
let products = JSON.parse(fs.readFileSync(productsDB, 'utf-8'));

const controller = {
	root: (req, res, next) => {
		let user = req.session.userFound
		console.log(res.locals.userFound);

		let selected = products.filter(product=>{
			return product.important=="home";
		});
		let news = products.filter(product=>{
			return product.important=="new";
		});
		res.render ('index', {selected, news, user});
		//console.log(user);
		
    },
}
    
module.exports = controller;
