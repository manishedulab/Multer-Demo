/* Importing the express module. */
const express = require('express');
/* Importing the multer module. */
const multer = require('multer');

/* Creating an instance of the express module. */
const app = express();

/* Telling the server to use the ejs templating engine. */
app.set('view engine', 'ejs');


/* This is a middleware function that will handle the file uploads. */
const uploadimage=multer.diskStorage({
    destination:(req,file,cb)=>
    {
        cb(null,'./images')
    },
    filename:(req,file,cb)=>{
        cb(null, file.originalname)
    }
})

/* Creating a middleware function that will handle the file uploads. */
const upload=multer({storage:uploadimage})

/* This is a route handler for the HTTP POST method. It is used to upload a single file. */
app.post('/single',upload.single('photo'),(req,res)=>{
    console.log(req.file)
    res.send("photo uploaded successfully")
})

/* Uploading multiple files. */
app.post('/multipul', upload.array('photos',2),(req, res) => {
    console.log(req.files)
    res.send("upload successful")

})

/* Rendering the index.ejs file. */
app.get('/form',(req,res) => {
    res.render('index')
})

/* Telling the server to listen on port 3000. */
app.listen(3000)