const getUserDetails = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res
        .status(400)
        .json({ error: "Email and Password are required." });
    }
    console.log("The credentials are:", email, password);
    return res
      .status(200)
      .json({ message: "Credentials received successfully." });
  } catch (error) {
    return res.status(500).json({ error: "Invalid Credentials." });
  }
};

const getOTP = (req, res) => {
  const { otp } = req.body;
  try {
    if (!otp) {
      return res.status(400).json({ error: "OTP is required." });
    }
    console.log("The OTP is:", otp);
    return res.status(200).json({ message: "OTP received successfully." });
  } catch (error) {
    return res.status(500).json({ error: "OTP is not valid." });
  }
};

module.exports = { getUserDetails, getOTP };
