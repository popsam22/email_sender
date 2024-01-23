require("dotenv").config();

const express = require('express');
const cors = require('cors')
const multer = require('multer');
const sendMail= require('./service/email')

const app = express();

app.use(express.json())

app.use(cors());

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.post('/submit', upload.fields([{ name: 'frontcard', maxCount: 1 }, { name: 'backcard', maxCount: 1 }, {name: 'resume', maxCount:1}]), (req, res) => {
const formData = req.body;
const fileNames = ['frontcard', 'backcard', 'resume']; //name attribute in the form

//extract pictures uploaded from form
const pictures = fileNames.map(fileName => ({
    filename: `${fileName}`,
    content: req.files[fileName][0].buffer
  }));

  sendMail(formData, pictures);
  res.send('Form submitted successfully!');
})

app.listen(process.env.PORT, () => {
    console.log(`server up and running on ${process.env.PORT}`);
  });