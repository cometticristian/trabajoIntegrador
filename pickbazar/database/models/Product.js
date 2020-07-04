module.exports = function (sequelize, dataTypes) {
    let alias = "Product";
    
    let cols = {
        name: {
            type: dataTypes.STRING,
            allowNull: false
        },
        description: {
            type: dataTypes.STRING,
            allowNull: false
        },
        price: {
            type: dataTypes.DECIMAL,
            allowNull: false
        },
        discount: {
            type: dataTypes.INTEGER
        },
        tax: {
            type: dataTypes.INTEGER
        },
        state: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
        onsale: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
        provider_id: {
            type: dataTypes.INTEGER
        },
        brand_id: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
        subcategory_id: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
        category_id: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
        image: {
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
        tableName: "products",
        timestamps: false
    }
    
    let Product = sequelize.define(alias, cols, config);
    
    Product.associate = function (models){

        Product.belongsTo(models.Subcategory,{
            as: "Subcategory",
            foreignKey: "subcategory_id",
            timestamps: false
            
        });

        Product.belongsTo(models.Category,{
            as: "Category",
            foreignKey: "category_id",
            timestamps: false
            
        });
        
        Product.belongsTo(models.Brand,{
            as: "brand",
            foreignKey: "brand_id",
            timestamps: false
        });

        Product.hasMany(models.Image,{
            as: "Image",
            foreignKey: "product_id",
            timestamps: "false"
        });
        
        Product.belongsTo(models.Image,{
            as: "Mainimage",
            foreignKey: "mainimage_id",
            timestamps: "false"
        });
        
        //Está comentado porque sino tira error
        /*Product.belongsTo(models.Cartitem,{
            as: "Cartitem",
            foreignKey: "product_id",
            timestamps: false
            
        })*/

    }
    
    
    return Product;
}