import { Router } from "express";
import auth from "../controllers/auth/index.js";
import Joi from "joi";
import { createValidator } from "express-joi-validation";

const router = Router();
const validator = createValidator({});

const registerSchema = Joi.object({
  username: Joi.string().min(3).max(50).required(),
  password: Joi.string().min(8).max(20).required(),
  email: Joi.string().email().required(),
});

const loginSchema = Joi.object({
  username: Joi.string().min(3).max(50).required(),
  password: Joi.string().min(8).max(20).required(),
});

router.post("/register", validator.body(registerSchema), auth.postRegister);
router.post("/login", validator.body(loginSchema), auth.postLogin);

export default router;
