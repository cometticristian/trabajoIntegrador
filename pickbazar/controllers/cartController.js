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
        console.log(req.session.userFound);

        if (req.session.userFound == undefined) {
            res.redirect('/users/login');
        } else {
            let productId = req.params.id;
            var cartId;
            db.Cart.findOne({
                where: {
                    user_id: req.session.userFound[0].id,
                    state: 1,
                }
            })
                .then((cart) => {
                    if (cart) {
                        cartId = cart.id;
    
                        db.Product.findByPk(productId)
                            .then((product) => {
                                db.Cart_product.create({
                                    units: req.query.item,
                                    price: product.price,
                                    discount: product.discount,
                                    subtotal: 1,
                                    cart_id: cartId,
                                    product_id: productId,
                                })
                            })
    
                    } else {
                        db.Cart.create({
                            user_id: req.session.userFound[0].id,
                            total: 0,
                            state: 1
                        })
                            .then((cartCreated) => {
                                cartId = cartCreated.id;
    
                                db.Product.findByPk(productId)
                                    .then((product) => {
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
                    }
                })
                .then(() => {
                    res.redirect('/products');
                })
        }


    },
}

module.exports = controller;