import express from "express";
import Todo from "../models/toDo.js";

const router = express.Router();

// GET all todos=====================

router.get("/", async (req, res) => {
  try {
    const todo = await Todo.find();
    res.status(200).json(todo);
  } catch (err) {
    res.status(500).json({ message: "Error task", error: err });
  }
});
//====================================

//POST create new todos===============

router.post("/new", async (req, res) => {
  try {
    const newTodo = await Todo.create({
      text: req.body.text,
      complete: false,
    });
    console.log("New Todo:", newTodo);
    res.status(201).json({ message: "Task added!", todo: newTodo });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error adding task", error: err });
  }
});
//===================================

//PUT update todo====================
router.put('/:id', async (req,res)=>{
    const {id} = req.params;
    const {complete} = req.body;
    try {
        const todo = await Todo.findByIdAndUpdate(id,{complete},{new:true})
        res.json(todo)
    } catch (err) {
        res.status(400).json({message:'unable to update todo', error: err});
        
    }
    
})


//===================================

export default router;
