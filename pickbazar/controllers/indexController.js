const fs = require('fs');
const path = require('path');


const controller = {
	root: (req, res) => {
		res.render ('index');
    },
}
    
module.exports = controller;
