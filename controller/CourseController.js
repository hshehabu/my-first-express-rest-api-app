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

const getAllCourse = async (req, res) => {
  const courses = await Course
    .findAll
    // {
    // attributes: ["name", [Sequelize.fn("COUNT", Sequelize.col("id")), "n_ids"]],
    // }
    ();
  res.send(courses);
};
const getCourse = async (req, res) => {
  // const course = lookup(req.params.id);
  const course = await Course.findAll({
    where: {
      id: req.params.id,
    },
  });
  if (!course.id) return res.status(404).send("no courses match with this id");
  res.send(course);
};
const addCourse = async (req, res) => {
  const { error } = validate(req.body);

  if (error) return res.status(400).send(error.details[0].message);
  const { name } = req.body;

  const course = await Course.create({ name: name });
  res.send(course);
};
const updateCourse = async (req, res) => {
  // const course = lookup(req.params.id);

  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  const course = await Course.update(
    {
      name: req.body.name,
    },
    {
      where: {
        id: req.params.id,
      },
    }
  );
  if (!course.id) return res.status(404).send("doesn't match any course");

  res.send(await Course.findAll());
};
const deleteCourse = async (req, res) => {
  // const course = lookup(req.params.id);
  const course = await Course.findAll({
    where: {
      id: req.params.id,
    },
  });

  if (!course[0] || !course[0].id) return res.status(404).send("doesn't match any course");
  await Course.destroy({
    where: {
      id: course[0].id,
    },
  });

  res.send(await Course.findAll());
};

module.exports = {
  getAllCourse,
  getCourse,
  addCourse,
  updateCourse,
  deleteCourse,
  openConnection,
};
