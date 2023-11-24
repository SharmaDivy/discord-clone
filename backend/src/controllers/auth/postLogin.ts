import { RequestHandler } from "express";

const postLogin: RequestHandler = (req, res, next) => {
  res.send("Login route!!!");
};

export default postLogin;
