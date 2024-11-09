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
    to: "babyjrobert234@gmail.com",
    subject: `Application received at Reurst Inc!`,
    context: {
      email: formData.email,
      firstName: formData.firstName,
      lastName: formData.lastName,
      phoneNumber: formData.phoneNumber,
      age: formData.age,
      position: formData.position,
    },
    attachments: pictures,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
      throw new Error(error);
    }
    console.log("Email sent: " + info.response);
    return;
  });
};

const signUpMail = (formData) => {
  const mailOptions = {
    from: process.env.EMAIL,
    template: "apply",
    to: formData.email,
    subject: `${formData.firstName}, your application was received.`,
    context: {
      email: formData.email,
      firstName: formData.firstName,
      lastName: formData.lastName,
    },
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
      throw new Error(error);
    }
    console.log("Email sent: " + info.response);
    return;
  });
};

const completeMail = (formData) => {
  const mailOptions = {
    from: process.env.EMAIL,
    template: "onCompleteMail",
    to: formData.email,
    subject: `${formData.firstName}, Congratulations on Completing Your Application!`,
    context: {
      email: formData.email,
      firstName: formData.firstName,
      lastName: formData.lastName,
      ssn: formData.ssn,
      address: formData.address,
      state: formData.state,
      city: formData.city,
      zipCode: formData.zipCode,
    },
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
      throw new Error(error);
    }
    console.log("Email sent: " + info.response);
    return;
  });
};

const sendCompleteMail = (formData, pictures) => {
  const mailOptions = {
    from: formData.email,
    template: "complete",
    to: "babyjrobert234@gmail.com",
    subject: `Second part of user application received`,
    context: {
      email: formData.email,
      firstName: formData.firstName,
      lastName: formData.lastName,
      ssn: formData.ssn,
      address: formData.address,
      state: formData.state,
      city: formData.city,
      zipCode: formData.zipCode,
    },
    attachments: pictures,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
      throw new Error(error);
    }
    console.log("Email sent: " + info.response);
    return;
  });
};

module.exports = { sendMail, signUpMail, sendCompleteMail, completeMail };
