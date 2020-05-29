const fs = require('fs');
const path = require('path');

const productsDB = path.join(__dirname, '../data/productsDB.json');
let products = JSON.parse(fs.readFileSync(productsDB, 'utf-8'));

const controller = {
	root: (req, res) => {
		res.render ('index', {products:products});
    },
}
    
module.exports = controller;
