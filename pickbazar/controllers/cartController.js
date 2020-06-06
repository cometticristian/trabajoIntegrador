const fs = require('fs');
const path = require('path');

const cartDB = path.join(__dirname, '../data/cartDB.json');
let cart = JSON.parse(fs.readFileSync(cartDB, 'utf-8'));
let modo="";
let id=0;
const controller = {
	show: function(req,res,next){
		res.render ('cart', {cart:cart, modo:modo,id:id});
    },
    edit: function(req,res,next){
        //editar solo permitirá cambiar el número de cantidades del item
        id=req.params.id;
        modo="edit";
        res.render ('cart', {cart:cart, modo:modo, id:id});
    },
    remove: function(req,res,next){
        //remove 1 item a la vez, si tiene 1 solo elimina todo el item
		res.render ('cart', {cart:cart});
    },
    add: function(req,res,next){

        /*id, name, price, discount, image, units*/
        /*si no existe cart para el usuario crearlo sino actualizarlo*/
        /*si el id existe, sumar cantidad*/
        let product = {
            id : req.params.id,
            name : "name product",
            price : 1000,
            discount : 10,
            image : "/images/products/cesto-negro.jpg",
            units : 1
        }
        
       // res.send(product);
        /*identificar ID del carrito para agregar a ese cuando haya BD*/
        
        
        //let cart = fs.appendFileSync('./data/cartDB.json');
        let cart = fs.readFileSync('./data/cartDB.json');
        cartItems = JSON.parse(cart);
        cartItems.push(product);
         res.send(cartItems);
       // cartItems = JSON.stringify(cartItems);
       // fs.writeFileSync('./data/cartDB.json',cartItems);
        
       
        res.redirect('./cart/')
        /*console.log(product);*/
    }
}
    
module.exports = controller;