const express = require('express')
const app = express()
const dotenv = require('dotenv')
dotenv.config({ path: './.env' })
const web = require('./routes/web')
const connectDb = require('./db/connectdb')
const fileUpload = require("express-fileupload");//for file upload
const cookieparser = require('cookie-parser')
const cors = require('cors')



// for file upload
app.use(fileUpload({ useTempFiles: true }));

// for get token (cookies)
app.use(cookieparser())

app.use(express.json())// for data get from api/postman

app.use(cors()) // for api communication




connectDb()


//load route
app.use('/api', web)
//localhost:4000/api











//server create
app.listen(process.env.PORT, () => {
    console.log(`server running on localhost ${process.env.PORT}`);
})