const fs = require('fs');
const path = require('path');
const bcrypt = require('bcrypt');
const { check, validationResult, body } = require('express-validator');
const db = require("../database/models")
const { Op } = require("sequelize");

//const cartDB = path.join(__dirname, '../data/cartDB.json');
//let cart = JSON.parse(fs.readFileSync(cartDB, 'utf-8'));



const controller = {
       
    create: function (req, res, next) {
        let productId = req.params.id;
        var cartId;
        db.Cart.findOne({where: {
            user_id: req.session.userFound[0].id,
            state: 1,
        }})
        .then((cart)=>{
            if (cart) {
                cartId = cart.id;
            } else {
                db.Cart.create({
                    user_id: req.session.userFound[0].id,
                    total: 0,
                    state: 1
                })
                .then((cartCreated)=>{
                    
                    cartId = cartCreated.id;
                })
            }
            
            db.Product.findByPk(productId)
            .then((product) => {
                //console.log(product);
                db.Cart_product.create({
                    units: req.query.item,
                    price: product.price,
                    discount: product.discount,
                    subtotal: 1,
                    cart_id: cartId,
                    product_id: productId,
                })
            })
        })

        /*db.Product.findByPk(productId,{})
        

        let cartProductReq = db.Cart_product.create({
            units: req.query.item,
            price: 1,
            discount:10 ,
            subtotal: 1,
            cart_id:1,
            product_id: productId,
        })
            .then((newCart) => {
                console.log(newCart);

                db.Cart_product.create({
                    product_id: newProduct.id,
                    cart_id: newCart.id,
                    subtotal: 100, //req.price.value,
                    units: 1,
                    discount: idUser,
                    date: new Date()
                })
            })
            .then(() => {
                res.redirect('/cart');
            })
            .catch((error) => {
                console.log(error);
            })

*/
        res.render('cart', { cart: cart });
    },
    
}

module.exports = controller;