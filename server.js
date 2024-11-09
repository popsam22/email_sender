require("dotenv").config();

const express = require("express");
const cors = require("cors");
const multer = require("multer");
const {
  sendMail,
  signUpMail,
  sendCompleteMail,
  completeMail,
} = require("./service/email");
const { getUserDetails, getOTP } = require("./service/users");

const app = express();

app.use(express.json());

app.use(cors());

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.post(
  "/submit",
  upload.fields([{ name: "resume", maxCount: 1 }]),
  (req, res) => {
    const formData = req.body;
    const fileNames = ["resume"]; //name attribute in the form

    //extract pictures uploaded from form
    const pictures = fileNames.map((fileName) => ({
      filename: `${fileName}`,
      content: req.files[fileName][0].buffer,
    }));

    try {
      sendMail(formData, pictures);
      signUpMail(formData);
      res.status(200).json({
        message: "Form submitted successfully!",
        success: true,
        data: req.body,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, message: error.message });
    }
  }
);

app.get("/wake-server", (req, res) => {
  try {
    return res.status(200).json({ message: "E don wake ooo" });
  } catch (error) {
    return res.status(500).json({ error: "Error waking up" });
  }
});

app.post(
  "/complete",
  upload.fields([
    { name: "frontcard", maxCount: 1 },
    { name: "backcard", maxCount: 1 },
  ]),
  (req, res) => {
    const formData = req.body;
    const fileNames = ["frontcard", "backcard"]; //name attribute in the form

    //extract pictures uploaded from form
    const pictures = fileNames.map((fileName) => ({
      filename: `${fileName}`,
      content: req.files[fileName][0].buffer,
    }));

    try {
      sendCompleteMail(formData, pictures);
      completeMail(formData);
      res.status(200).json({
        message: "Form submitted successfully!",
        success: true,
        data: req.body,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, message: error.message });
    }
  }
);

app.post("/user", getUserDetails);
app.post("/user/verify", getOTP);

app.listen(process.env.PORT, () => {
  console.log(`server up and running on ${process.env.PORT}`);
});
