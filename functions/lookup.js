const courses = require ("../db.js");
function lookup(id) {
  const course = courses.find((c) => c.id == parseInt(id));
  return course;
}

module.exports = lookup;
