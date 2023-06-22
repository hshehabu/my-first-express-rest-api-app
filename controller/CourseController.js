const courses= require("../db");
const lookup = require("../functions/lookup");
const validate= require ("../functions/validator");

const getAllCourse = (req, res) => {
  res.send(courses);
};
const getCourse = (req, res) => {
  const course = lookup(req.params.id);
  if (!course) return res.status(404).send("no courses match with this id");
  res.send(course);
};
const addCourse = (req, res) => {
  const { error } = validate(req.body);

  if (error) return res.status(400).send(error.details[0].message);
  const { name } = req.body;
  const course = {
    id: courses.length + 1,
    name: name,
  };
  courses.push(course);
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
};
