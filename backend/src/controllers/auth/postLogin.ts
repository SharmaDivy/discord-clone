import { RequestHandler } from "express";
import User from "../../models/user.js";
import { encryptData, generateJwtToken } from "../../utils/crypto.js";
import { AuthVerificationResponse } from "../../types/auth.js";

const postLogin: RequestHandler = async (req, res, next) => {
  try {
    const { email, password } = req.body as {
      email: string;
      password: string;
    };

    const user = await User.findOne({ email: email.toLowerCase() });

    if (user && user.password === encryptData(password)) {
      const token = generateJwtToken({ id: user.id, email: user.email });
      const response: AuthVerificationResponse = {
        token,
        userDetails: {
          name: user.name,
          email: user.email,
        },
      };

      return res.status(200).json(response);
    }

    return res.status(400).send("Invalid credentials");
  } catch (e) {
    console.error(e);
    return res.status(500).send("Something went wrong!");
  }
};

export default postLogin;
