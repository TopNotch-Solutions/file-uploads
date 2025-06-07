const { DataTypes } = require("sequelize");
const sequelize = require("../config/dbConfig");

const File = sequelize.define(
    "files",
    {
        id: {
            type: DataTypes.BIGINT,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
          },

        fileType: {
            type: DataTypes.STRING,
            allowNull: false
          },
          filePath: {
            type: DataTypes.STRING,
            allowNull: false
          }
    },{
        timestamps: false 
      }
);

module.exports = File;