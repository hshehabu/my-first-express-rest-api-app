const express = require("express");
const app = express();
const courseRoute = require("./route/course.route");

app.use(express.json());
var bodyParser = require("body-parser");
app.use(bodyParser.json());

app.use("/api", courseRoute);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listening at port ${port}`));
