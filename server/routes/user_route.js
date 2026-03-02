const express=require('express');
const user=require('../model/user');

const router=express.Router();

router.post('/add',async(req,res)=>{
    const{ name , email , phone , gender } =req.body;
    try{

        const exist=await user.findById({email:email});
        if(exist){
            return res.status(400).json({message:"User already exist"});
        }
        const user=new user({
            name:name,
            email:email,
            phone:phone,
            gender:gender
        });

        const saveduser=await user.save();
        res.status(201).json(saveduser);    
      
    }catch(err){
        res.status(400).json({message:err.message});
    }
});

