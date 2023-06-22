const express = require ('express')
const route = express.Router();

const {
  getAllCourse,
  getCourse,
  addCourse,
  updateCourse,
  deleteCourse,
} = require("../controller/CourseController");

route.get("/courses", getAllCourse);
route.get("/courses/:id", getCourse);
route.post("/courses", addCourse);
route.put("courses/:id", updateCourse);
route.delete("courses/:id", deleteCourse);

module.exports = route;
