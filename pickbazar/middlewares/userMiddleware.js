const userMiddleware = {
    
    auth: function (req, res, next) {
        if (req.session.userLogged) {
            next();
        } else {
            res.redirect("users/login");
        }
    },

    gest: function (req, res, next) {
        if (!req.session.userLogged) {
            next();
        }
    }
}

module.exports = userMiddleware;