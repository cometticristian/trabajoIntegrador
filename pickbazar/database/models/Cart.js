module.exports = function (sequelize, dataTypes) {
    let alias = "Cart";
    
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        user_id: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
        total: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
        state: {
            type: dataTypes.STRING,
            allowNull: false
        },
        created_at: {
            type: dataTypes.DATE,
            allowNull: false
        },
        updated_at: {
            type: dataTypes.DATE,
            allowNull: false
        }
    }
    
    let config = {
        tableName: "carts",
        timestamps: false
    }
    
    let Cart = sequelize.define(alias, cols, config);
    
    Cart.associate = function (models){
        
        //REVISAR RELACION USUARIO CARRITO
        Cart.belongsTo(models.User,{
            as: "User",
            foreignKey: "user_id",
            timestamps: false
            
        });

        Cart.belongsToMany(models.Product,{
            as: "product",
            through: "cart_product",
            foreignKey: "cart_id",
            otherKey: "product_id",
            timestamps: false
        })
         //agregue esto para q traiga los datos de la relacion
         Cart.hasMany(models.Cart_product,{
            as: "cart_item",
            foreignKey: "id"
        })

    }
    
    return Cart;
}