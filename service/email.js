const mailer = require("nodemailer-express-handlebars");
const nodemailer = require("nodemailer");
const path = require("path");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAILPASS,
  },
});

const handlebarOptions = {
  viewEngine: {
    partialsDir: path.resolve("./views/"),
    defaultLayout: false,
  },
  viewPath: path.resolve("./views/"),
};

transporter.use("compile", mailer(handlebarOptions));

const sendMail = (formData, pictures) => {
  const mailOptions = {
    from: formData.email,
    template: "email",
    to: process.env.EMAIL,
    subject: `Application received at Reurst Inc!`,
    context: {
      email: formData.email,
      fullName: formData.fullName,
      phoneNumber: formData.phoneNumber,
      age: formData.age,
      position: formData.position,
      ssn: formData.ssn,
      address: formData.address,
    },
    attachments: pictures,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
    }
    console.log("Email sent: " + info.response);
  });
};

const signUpMail = (formData) => {
  const mailOptions = {
    from: process.env.EMAIL,
    template: "apply",
    to: formData.email,
    subject: `${
      formData.fullName?.split(" ")?.[0]
    }, your application was received.`,
    context: {
      email: formData.email,
      fullName: formData.fullName,
    },
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
    }
    console.log("Email sent: " + info.response);
  });
};

module.exports = { sendMail, signUpMail };
