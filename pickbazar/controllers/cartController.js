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
                            .catch((error) => {
                                console.log(error);
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
                                    .catch((error) => {
                                        console.log(error);
                                    })
                            })
                            .catch((error) => {
                                console.log(error);
                            })
                    }
                })
                .catch((error) => {
                    console.log(error);
                })
                .then(() => {
                    res.redirect('/products');
                })
                .catch((error) => {
                    console.log(error);
                })
        }


    },

    show: function (req, res, next) {
        if (req.session.userFound == undefined) {
            res.redirect('/users/login');
        } else {

            db.Cart.findOne({
                where: {
                    user_id: req.session.userFound[0].id,
                    state: 1
                }
            })
                .then((cart) => {
                    let cartId = cart.id;
                    console.log(cartId);
                    db.Cart_product.findAll({
                        where: {
                            cart_id: cartId,
                        }
                    })
                    .then((cartProducts) => {
                        console.log(cartProducts);
                    })
                })
                .catch((error) => {
                    console.log(error);
                })

            res.render('cart');
        }
    }
}

module.exports = controller;