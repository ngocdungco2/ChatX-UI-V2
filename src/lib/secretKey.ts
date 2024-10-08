import CryptoJS from "crypto-js";

const SECRET_KEY = process.env.SECRET_HASH_KEY || "chatx2024";

// Hàm mã hóa
export function encrypt(text: string) {
  return CryptoJS.AES.encrypt(text, SECRET_KEY).toString();
}

// Hàm giải mã
export function decrypt(encryptedText: string) {
  const bytes = CryptoJS.AES.decrypt(encryptedText, SECRET_KEY);
  return bytes.toString(CryptoJS.enc.Utf8);
}
