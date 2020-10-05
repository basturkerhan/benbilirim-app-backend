const express = require("express")
const app = express()
const dotenv = require("dotenv")
const router = require("./routers/index")
const cors = require("cors")
const customErrorHandler = require("./middlewares/errors/customErrorHandler")
const connectDatabase = require("./helpers/database/connectDatabase")
const upload = require("express-fileupload")

dotenv.config({
    path: "./config/env/config.env"
});

const PORT = process.env.PORT || 5000

connectDatabase()
app.use(cors())
app.use(express.json())
app.use("/v1",router)
app.use(customErrorHandler)
app.use(upload())

app.get("/",(req,res)=>{
    res.send("benbilirim express api")
})

app.listen(PORT,()=>{
    console.log("Server " + PORT + " Portunda Çalışıyor")
})