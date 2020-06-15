const userMiddlewares = {

    auth: function (req, res, next) {
        if (req.session.userLogged) {
            next();
        } else {
            res.redirect("/");
        }
    },

    gest: function (req, res, next) {
        if (!req.session.userLogged) {
            next();
        } else {
            res.redirect("/");
        }
    }
}

module.exports = userMiddlewares;