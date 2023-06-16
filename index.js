const express = require("express");
const app = express();

app.use(express.json());
const courses = [
  { id: 1, course: "amharic" },
  { id: 2, course: "english" },
  { id: 3, course: "biology" },
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


app.post('/api/courses', (res, req) => {
  const course = {
    id: courses.length + 1,
    course: req.body.course,
  };
  courses.push(course);
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listening at port ${port}`));
