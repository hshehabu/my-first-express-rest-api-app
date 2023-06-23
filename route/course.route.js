const express = require("express");
const route = express.Router();

const {
  getAllCourse,
  getCourse,
  addCourse,
  updateCourse,
  deleteCourse,
  openConnection,
} = require("../controller/CourseController");

route.get("/open", openConnection);
route.get("/courses", getAllCourse);
route.get("/courses/:id", getCourse);
route.post("/courses", addCourse);
route.put("/courses/:id", updateCourse);
route.post("/courses/:id", deleteCourse);

module.exports = route;
