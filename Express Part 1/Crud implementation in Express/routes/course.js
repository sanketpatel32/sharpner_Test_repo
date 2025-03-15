const express = require("express");
const router = express.Router();

const courses = [
    { id: 1, name: "Frontend", description: "HTML, CSS, JS, React" },
    { id: 2, name: "Backend", description: "Node.js, Express, MongoDB" },
  ];

  
router.get("/",(req,res)=>{
    const courseNames = courses.map(courses => courses.name).join(", ");
    res.send(`Courses : ${courseNames}`);
})
router.get("/:id",(req,res)=>{

    const id = req.params.id;
    const course = courses.find((s) => s.id == id);
    if (course) res.send(`Course: ${course.name}, Description: ${course.description}`);
    else res.status(404).send("Course not found");


    const courseNames = courses.map(courses => courses.name).join(", ");
    res.send(`Courses : ${courseNames}`);
})

module.exports = router;