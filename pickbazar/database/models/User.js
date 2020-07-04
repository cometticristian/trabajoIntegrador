module.exports = function (sequelize, dataTypes) {
    let alias = "User";
    
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        firstName: {
            type: dataTypes.STRING,
            allowNull: false
        },
        lastName: {
            type: dataTypes.STRING,
            allowNull: false
        },
        email: {
            type: dataTypes.STRING,
            allowNull: false
        },
        password: {
            type: dataTypes.STRING,
            allowNull: false
        },
        user: {
            type: dataTypes.STRING
        },
        phone: {
            type: dataTypes.STRING,
            allowNull: false
        },
        address: {
            type: dataTypes.STRING,
            allowNull: false
        },
        userType: {
            type: dataTypes.STRING,
            allowNull: false
        },
        state: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
        avatar: {
            type: dataTypes.STRING
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
        tableName: "users",
        timestamps: false
    }
    
    let User = sequelize.define(alias, cols, config);
    
    User.associate = function (models){
        User.belongsTo(models.Cart,{
            as: "Cart",
            foreignKey: "user_id",
            timestamps: false
            
        });
    }
    
    
    return User;
}