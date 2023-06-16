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
// app.get("/api/courses", (req, res) => {
//   res.send([1, 3, 4, 54]);
// });
app.get("/api/courses/:id", (req, res) => {
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course) res.status(404).send("no courses match with this id");
  res.send(course);
});

app.post("/api/courses", function (req, res) {
  const schema = {
    name: Joi.string().min(3).required(),
  };
  const result = Joi.validate(req.body, schema);

  if (result.error) {
    res.status(400).send(result.error.details[0].message);
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

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listening at port ${port}`));
