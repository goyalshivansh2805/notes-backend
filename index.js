require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const connectToDB = require("./config/connection");
const logRequest = require("./middlewares/logRequests");
const cookieParser = require("cookie-parser");
const verifyId = require("./middlewares/VerifyID");
// const verifyId = require("./middlewares/verifyId");

const app = express();
const PORT = process.env.PORT || 5000;

connectToDB();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(logRequest);

app.use("/api/auth",require("./routes/auth"));


app.use("/api/notes",verifyId,require("./routes/notes"));

app.use("*",(req,res)=>{
    res.status(404).json({message:"EndPoint not found!"});
});

mongoose.connection.on("open",()=>{
    console.log("Connected to Database...");

    app.listen(PORT,()=>{
        console.log(`Server is listening on PORT ${PORT}`);
    });
});