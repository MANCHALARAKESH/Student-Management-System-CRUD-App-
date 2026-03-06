const express= require("express");
const User = require("../model/user");
const router=express.Router();

//add student
router.post("/addStudent",async(req,res)=>{
    const {email,name,age,grade}=req.body;
    try{
        const exist=await User.find({email});
        if(exist.length>0){
            return res.status(400).json({message:"Student with this email already exists"});
        }
        const newStudent=new User({
            name,
            email,
            age,
            grade,
            role:"student"
        });

        await newStudent.save();
        res.status(201).json({message:"Student added successfully", student:newStudent});

    }catch(err){
        res.status(500).json({message:err.message});
    };
});

//get all students
router.get("/getAll", (req, res) => {
    console.log("GET STUDENTS API HIT");
  User.find({ role: "student" })
    .then((students) => {
      res.status(200).json(students);
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });

});

//delete student
router.delete("/deleteStudent/:id",async(req,res)=>{
    const {id}=req.params;
    try{
        const student=await User.findById(id);
        if(!student){
            return res.status(404).json({message:"Student not found"});
        }
        await student.remove();
        res.status(200).json({message:"Student deleted successfully"});
    }catch(err){
        res.status(500).json({message:err.message});
    }

});

//update student
router.put("/updateStudent/:id",async(req,res)=>{
    const {id}=req.params;
    const {name,email,age,grade}=req.body;
    try{
        const student=await User.findById(id);
        if(!student){
            return res.status(404).json({message:"Student not found"});
        }
        student.name=name || student.name;
        student.email=email || student.email;
        student.age=age || student.age;
        student.grade=grade || student.grade;
        await student.save();
        res.status(200).json({message:"Student updated successfully", student});

    }catch(err){
        res.status(500).json({message:err.message});
    }
});

//add more user related routes here (like update user, get user by id etc.)

module.exports=router;