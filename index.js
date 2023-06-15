const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("Hello world");
});
app.get("/api/courses", (req, res) => {
  res.send([1, 3, 4, 54]);
});
app.get('/api/posts/:year/:date' , (req , res) =>{
    // res.send(req.params);
    res.send(req.query);
})
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listening at port ${port}`));
