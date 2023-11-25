import crypto from "node:crypto";
import jwt from "jsonwebtoken";
import { config } from "dotenv";
import { TokenizedUserDetails } from "../types/auth.js";
config();

const SECRET_KEY = process.env.SECRET_KEY;

export function encryptData(text: string) {
  const hmacVal = crypto
    .createHmac("sha256", SECRET_KEY || "")
    .update(text)
    .digest()
    .toString();
  return hmacVal;
}

export function generateJwtToken(user: TokenizedUserDetails) {
  const token = jwt.sign(
    {
      id: user.id,
      email: user.email,
    },
    SECRET_KEY as string,
    { expiresIn: "48h" }
  );

  return token;
}
