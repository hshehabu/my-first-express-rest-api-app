import courses from '../db';
import lookup from '../functions/lookup,js';
const getAllCourse =  (req , res)=> {
    res.send =  (courses);
}
const getCourse =  (req , res) => {

    const course = lookup(req.params.id);
    if (!course) return res.status(404).send("no courses match with this id");
    res.send(course);
}
const addCourse =  (req , res)=> {
    
}
const editCourse =  (req , res)=> {
    
}
const deleteCourse =  (req , res)=> {
    
}
