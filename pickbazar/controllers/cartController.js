const fs = require('fs');
const path = require('path');

const cartDB = path.join(__dirname, '../data/cartDB.json');
let cart = JSON.parse(fs.readFileSync(cartDB, 'utf-8'));
let id=0;
const controller = {
	show: function(req,res,next){
		res.render ('cart', {cart:cart});
    },
    create: function(req,res,next){
        //cuando la session no tiene carrito ?/
		res.render ('cart', {cart:cart});
    },
    remove: function(req,res,next){
        //elimina 1 item del carrito
        id=Number(req.params.id);
        cart = cart.filter((cart) => { return cart.id != id });
        fs.writeFileSync(cartDB, JSON.stringify(cart));
        res.render ('cart', {cart:cart});
    },
    plus: function(req,res,next){
        //agrega una cantidad a un item del carrito
        id=Number(req.params.id);
        for (let i=0;i<cart.length;i++){
            if (cart[i].id==id){
                cart[i].units=cart[i].units+1;
                }
                
            }
        fs.writeFileSync(cartDB, JSON.stringify(cart));
		res.render ('cart', {cart:cart});
        
    },
    minus: function(req,res,next){
        //elimina un item al carrito
        id=Number(req.params.id);
        for (let i=0;i<cart.length;i++){
            if (cart[i].id==id && cart[i].units>1){
                
                cart[i].units=cart[i].units-1;
                }
            else
            {
                if (cart[i].id==id && cart[i].units==1)
                {
                    cart = cart.filter((cart) => { return cart.id != id });
                }
            }
                
        }
        fs.writeFileSync(cartDB, JSON.stringify(cart));
		res.render ('cart', {cart:cart});
        
    },
    add: function(req,res,next){
        //agrega un item al carrito
        /*id, name, price, discount, image, units*/
        /*si no existe cart para el usuario crearlo sino actualizarlo*/
        /*si el id existe, sumar 1 item a la cantidad*/
        id=Number(req.params.id);
        let existeItem=0;
        for (let i=0;i<cart.length;i++){
            if (cart[i].id==id){
                cart[i].units=cart[i].units+1;
                let existeItem=1;
                }
            }
        if (existeItem==0)
            {
                const productsDB = path.join(__dirname, '../data/productsDB.json');
                let products = JSON.parse(fs.readFileSync(productsDB, 'utf-8'));

                for (let i = 0; i < products.length; i++) {
                    if (products[i].id == id) {
                        let product = {
                            id : id,
                            name : products[i].name,
                            price : products[i].price,
                            discount : products[i].discount,
                            image : products[i].image,
                            units : 1
                        }
                        cart.push(product);
                    } 
                }
                
                
            }
        fs.writeFileSync(cartDB, JSON.stringify(cart));
		res.render ('cart', {cart:cart});
        
    }
}
    
module.exports = controller;