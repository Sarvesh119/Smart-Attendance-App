import  express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
import router from "./routes/router.js"
import cors from "cors";

const app=express()
app.use(cors({
  origin: "http://localhost:5173", 
  methods: ["GET", "POST", "DELETE"],
}));


app.use(express.json());
const port=process.env.PORT || 5000;
dotenv.config();
mongoose.connect(process.env.MongodbUrl, { useNewUrlParser: true, useUnifiedTopology: true })
.then(()=>{
    console.log("MongoDB is conneted sucessfully.....");
})
.catch((err)=>{
    console.log("Your Error is:",err.message);
    process.exit(1);
})
 app.use("/api/notes",router)

app.listen(port,()=>{
    console.log(`Server is runnnig on: ${port}`);
})









// import express, { json } from "express"
// import cors from "cors";
// import dotenv from "dotenv";
// import mongoose from "mongoose";
// import router from "./routes/router.js";

// dotenv.config();
// const app=express()
// app.use(cors)
// app.use(express.json())
// const PORT=process.env.PORT|| 5000

// mongoose.connect(process.env.MongodbUrl)
// .then(()=>{
//     console.log("👌 MOngoDB Connected Successfully.....")
// })
// .catch((err)=>{
//     console.error("Error Occured",err.message);
//     process.exit(1);
// })

// app.use("/api/notes",router)

// app.listen(PORT,()=>{
//     console.log(`Server is running on ${PORT}`)
// })
