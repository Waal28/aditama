import jwt from "jsonwebtoken";

// Secret key untuk membuat dan memverifikasi token
import { JWT_SECRET } from "../config/env.js";
// Middleware untuk menyimpan token di dalam header Authorization
export default function verifyToken(req, res, next) {
  // Ambil token dari header Authorization
  const token = req.headers["authorization"];

  // Jika token tidak ada, kirim respon Unauthorized
  if (!token)
    return res.status(401).json({ message: "Unauthorized", status: "failed" });

  // Pisahkan token dari skema "Bearer"
  const tokenParts = token.split(" ");
  const tokenBearer = tokenParts[1]; // Ambil bagian kedua setelah "Bearer"

  // Verifikasi token
  jwt.verify(tokenBearer, JWT_SECRET, (err, decoded) => {
    if (err)
      return res.status(403).json({ message: "Forbidden", status: "failed" });
    // Jika verifikasi berhasil, simpan informasi pengguna yang di-decode ke dalam req.user
    req.user = decoded;
    next();
  });
}
