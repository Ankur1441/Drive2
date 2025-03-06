const express = require('express');
const userRouter = require('./routes/user.routes');
const dotenv = require('dotenv');
dotenv.config();
const connectToDB = require("./config/db")
connectToDB();
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const indexRouter = require('./routes/index.routes');
const cors = require("cors");

const app = express();
app.use(cors());
app.set('view engine', 'ejs')
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(morgan("dev"));

app.use('/',indexRouter)
app.use('/user',userRouter )

// app.use('/api', uploadRouter); // The endpoint will be "/api/upload"


app.listen(3000, ()=>{
    console.log("server is running on port 3000")
})

