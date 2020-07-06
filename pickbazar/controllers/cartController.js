const fs = require('fs');
const path = require('path');
const bcrypt = require('bcrypt');
const { check, validationResult, body } = require('express-validator');
const db = require ("../database/models")
const { Op } = require("sequelize");

const cartDB = path.join(__dirname, '../data/cartDB.json');
let cart = JSON.parse(fs.readFileSync(cartDB, 'utf-8'));
let id=0;
const controller = {
	show: function(req,res,next){
        //preguntar por el usuario
        //if (req.session.carrito!=undefined)
        //userId=req.session.userFound[0].id;
    
        let items = db.Cart_product.findAll(
			{
				where: { cart_id: 1},
				include: [{ association: "Product" }, { association: "Cart" }]
			})

            Promise.all([items])
			.then(function ([items]) {
                console.log(items);
				//res.render('./cart', {cart: items})
			})
			.catch(function (error) {
				console.log(error);
			})

        console.log(items);
        //res.render ('cart', {cart:items});
        
    },
    create: function(req,res,next){
        //cuando la session no tiene carrito ?/

        db.Cart.create({
            id_user: idUser,
            total: 1000,//req.body.description,
            state: 1,
            created_at: new Date()
        })
            .then((newCart) => {
                console.log(newCart);
                
                db.Cart_product.create({
                    product_id: newProduct.id,
                    cart_id: newCart.id,
                    subtotal: 100, //req.price.value,
                    units: 1,
                    discount: idUser,
                    date:new Date()
                })
            })
            .then(() => {
                res.redirect('/cart');
            })
            .catch((error) => {
                console.log(error);
            })


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
        
        
        //userId=req.session.userFound[0].id;
        userId=1;
        itemId=Number(req.params.id);
        carritoId=1;
        //
        let existeItem=0;

        let items = db.Cart_product.findAll(
			{
				where: { cart_id: carritoId},
				include: [{ association: "Product" }, { association: "Cart" }]
			})

            Promise.all([items])
			.then(function ([items]) {
				//console.log(categoryName[0].name);
				res.render('./cart', {items: items})
			})
			.catch(function (error) {
				console.log(error);
			})
            
     /* JSON CODE   
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
     */   
    }
}
    
module.exports = controller;