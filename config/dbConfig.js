const Sequelize = require('sequelize');

const sequelize = new Sequelize({
    host: "localhost",
    username: "root",
    password: "",
    database: "files",
    dialect: "mysql",
    //port:"3307"
});

module.exports = sequelize;


