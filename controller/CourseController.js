const courses = require("../db");
const lookup = require("../functions/lookup");
const validate = require("../functions/validator");
const Course = require("../model/Course");
const { Sequelize } = require("sequelize");

const openConnection = async () => {
  const sequelize = new Sequelize("courses", "root", "", {
    host: "localhost",
    dialect: "mysql",
  });
  try {
    await sequelize.authenticate();
    console.log("connection established successfully");
  } catch (error) {
    console.error("unable to connect to the database:", error);
  }
};

const getAllCourse = (req, res) => {

  res.send(courses);
};
const getCourse = (req, res) => {
  const course = lookup(req.params.id);
  if (!course) return res.status(404).send("no courses match with this id");
  res.send(course);
};
const addCourse = async (req, res) => {
  const { error } = validate(req.body);

  if (error) return res.status(400).send(error.details[0].message);
  const { name } = req.body;
 
  const course = await Course.create({ name: name });
  res.send(course);
};
const updateCourse = (req, res) => {
  const course = lookup(req.params.id);

  if (!course) return res.status(404).send("doesn't match any course");

  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  course.name = req.body.name;
  res.send(course);
};
const deleteCourse = (req, res) => {
  const course = lookup(req.params.id);
  if (!course) return res.status(404).send("doesn't match any course");

  const index = courses.indexOf(course);
  courses.splice(index, 1);

  res.send(course);
};

module.exports = {
  getAllCourse,
  getCourse,
  addCourse,
  updateCourse,
  deleteCourse,
  openConnection,
};
