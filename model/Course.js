const { Sequelize, Model, DataTypes } = require("sequelize");

const sequelize = new Sequelize("courses", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

class Course extends Model {}

Course.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    timestamps: false,
  }
);

module.exports = Course;
