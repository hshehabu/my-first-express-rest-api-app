const Joi = require("joi");
const express = require("express");
const app = express();

app.use(express.json());
var bodyParser = require("body-parser");
app.use(bodyParser.json());

const courses = [
  { id: 1, name: "amharic" },
  { id: 2, name: "english" },
  { id: 3, name: "biology" },
];
app.get("/", (req, res) => {
  res.send("Hello world");
});
app.get("/api/courses", (req, res) => {
  res.send(courses);
});
app.get("/api/courses/:id", (req, res) => {
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course) res.status(404).send("no courses match with this id");
  res.send(course);
});

app.post("/api/courses", function (req, res) {
  const { error } = validate(req.body);

  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }
  const { name } = req.body;
  const course = {
    id: courses.length + 1,
    name: name,
  };
  courses.push(course);
  res.send(course);
});

app.put("/api/courses/:id", (req, res) => {
  //look up the course
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  //if not
  if (!course) res.status(404).send("doesn't match any course");
  //if so
  const { error } = validate(req.body);
  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }
  course.name = req.body.name;
  res.send(course);
});
function validate(course) {
  const schema = {
    name: Joi.string().min(3).required(),
  };
  return Joi.validate(course, schema);
}
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listening at port ${port}`));
