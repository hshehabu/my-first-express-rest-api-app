const express = require("express");
const app = express();

app.get('/', (req, res ) => {
  res.send('Hello world');
});
app.get('/api/courses' , (req , res)=>{
    res.send([1 , 3, 4, 54])
})
app.listen(3000, () => console.log("listening at port 2000"));
