const express = require("express");
const userGetAll = (req,res)=>{
    res.send("Fetching all users")
};

const userPost = (req,res)=>{
    res.send("Adding a new user")
}


const userGet = (req,res)=>{
    res.send(`Fetching user with ID: ${req.params.id}`)
};


module.exports = {userGet,userGetAll,userPost};