module.exports = function (sequelize, dataTypes) {
    let alias = "Cart_product";
    
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        
        units: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
        
        price: {
            type: dataTypes.DECIMAL,
            allowNull: false
        },
        
        discount: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
        
        subtotal: {
            type: dataTypes.DECIMAL,
            allowNull: false
        },
        
        cart_id: {
            type: dataTypes.INTEGER,
            allowNull: false
        },

        product_id: {
            type: dataTypes.INTEGER,
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
        tableName: "cart_product",
        timestamps: false
    }
    
    let Cart_product = sequelize.define(alias, cols, config);
    
   
    return Cart_product;
}