import jwt from "jsonwebtoken";
import { config } from "dotenv";
import { RequestHandler } from "express";
import { TokenizedUserDetails } from "../types/auth.js";
config();

const authorize: RequestHandler = async (req, res, next) => {
  try {
    const token = (req.body.token ||
      req.query.token ||
      req.headers.authorization) as string;

    if (!token) {
      return res.status(403).send("Missing token");
    }

    const parsedToken = token.replace(/^Bearer\s+/, "");
    const tokenizedUserDetails = jwt.verify(
      parsedToken,
      process.env.SECRET_KEY || ""
    );

    req.user = tokenizedUserDetails as TokenizedUserDetails;

    next();
  } catch (e) {
    return res.status(403).send(e);
  }
};

export default authorize;
