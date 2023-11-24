import { RequestHandler } from "express";
import User from "../../models/user.js";
import { encryptData } from "../../utils/crypto.js";

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

    const jwtToken = "JWT TOKEN";

    return res.status(201).json({
      name: user.name,
      email: user.email,
      jwtToken,
    });
  } catch (e) {
    next(e);
    return res.status(500).send("Something went wrong!");
  }
};

export default postRegister;
