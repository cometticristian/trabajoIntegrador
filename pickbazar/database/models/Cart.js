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
        Cart.hasOne(models.User,{
            as: "User",
            foreignKey: "user_id",
            timestamps: false
            
        });
        
        /*Cart.hasMany(models.Cartitem,{
            as: "Cartitem",
            foreignKey: "cart_id",
            timestamps: false
            
        })*/
    }
    
    
    return Cart;
}