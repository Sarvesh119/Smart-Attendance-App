
import express from "express";
import Note from "../model/Note.js"
const router=express.Router();


router.get("/",async(req,res)=>{
    const notes=await Note.find();
    res.json(notes);
    
})

router.post("/",async(req,res)=>{
    console.log("📩 Incoming body:", req.body);
    const newNote=new Note({title:req.body.title,content:req.body.content});
    await newNote.save()
    res.json(newNote);
})
router.delete("/:id",async(req,res)=>{
    const deleteNote= await Note.findByIdAndDelete(req.params.id);
    if(deleteNote){
        res.json({message:"Id deleted"});
    }
    else{
        res.status(404).json({message:"Id Not Found"});
    }
})

export default router;































// import express from "express"
// import Note from "../model/Note.js";

// const router= express.Router();

// router.get("/",async(req,res)=>{
//     console.log("HElo")
//     const notes=await Note.find();
//     res.json(notes);
// })

// router.post("/",async(req,res)=>{
//     const NewNote=new Note({title:req.body.title,content:req.body.content});
//     await NewNote.save();
//     res.json(NewNote);
// })

// router.delete("/:id",async(req,res)=>{
//     const Delete= await Note.findByIdAndDelete(req.params.id);
//     if(Delete){
//         res.json({message:"deleted"});
//     }
//     else{
//         res.status(404).json({message:"Id not found"});
//     }
// })

// export default router;