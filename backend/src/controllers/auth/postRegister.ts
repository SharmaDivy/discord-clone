import { RequestHandler } from "express";
import User from "../../models/user.js";
import { encryptData, generateJwtToken } from "../../utils/crypto.js";
import { AuthVerificationResponse } from "../../types/auth.js";

const postRegister: RequestHandler = async (req, res, next) => {
  try {
    const { username, email, password } = req.body as {
      username: string;
      password: string;
      email: string;
    };

    const userExists = await User.exists({ email: email });
    if (userExists) {
      return res.status(409).send("Email already registered");
    }

    const passwordHash = encryptData(password);

    const user = await User.create({
      name: username,
      email: email.toLowerCase(),
      password: passwordHash,
    });

    const token = generateJwtToken({ id: user.id, email: user.email });
    const response: AuthVerificationResponse = {
      token: token,
      userDetails: {
        name: user.name,
        email: user.email,
      },
    };

    return res.status(201).json(response);
  } catch (e) {
    next(e);
    return res.status(500).send("Something went wrong!");
  }
};

export default postRegister;
