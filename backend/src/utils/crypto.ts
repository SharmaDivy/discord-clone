import CryptoJS from "crypto-js";

const SECRET_KEY = process.env.SECRET_KEY;

export function encryptData(text: string) {
  const hmacVal = CryptoJS.AES.encrypt(text, SECRET_KEY || "").toString();
  return hmacVal;
}
