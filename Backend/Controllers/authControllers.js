import Fastify from "fastify";
import bcrypt from "bcrypt";
import pool from "../lib/db.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import cookie from "fastify-cookie";
dotenv.config();
const fastify = Fastify();
fastify.register(cookie);

export const Register = async (request, reply) => {
  const { username, email, password, acceptTerms } = request.body;
  try {
    if (!username || !email || !password || acceptTerms !== true) {
      return reply.status(400).send({ message: "กรุณากรอกข้อมูลให้ครบถ้วน" });
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      return reply.status(400).send({ message: "อีเมลไม่ถูกต้อง" });
    }

    const [rows] = await pool.query(
      "SELECT * FROM users WHERE email = ? OR username = ?",
      [email, username]
    );
    if (rows.length > 0) {
      return reply
        .status(409)
        .send({ message: "อีเมลหรือชื่อผู้ใช้นี้มีการลงทะเบียนแล้ว" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const [result] = await pool.query(
      "INSERT INTO users (username, email, password) VALUES (?, ?, ?)",
      [username, email, hashedPassword]
    );

    const userId = result.insertId;
    await pool.query("INSERT INTO money (user_id, balance) VALUES (?, ?)", [
      userId,
      0.0,
    ]);

    const gzToken = jwt.sign(
      { id: userId, username },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "1h" }
    );

    reply.setCookie("gzToken", gzToken, {
      httpOnly: true,
      secure: false,
      maxAge: 3600 * 1000,
      sameSite: "Strict",
      path: "/",
    });

    return reply
      .status(201)
      .send({ message: "สมัครสมาชิกสำเร็จ", userId, gzToken });
  } catch (error) {
    console.error("เกิดข้อผิดพลาด:", error);
    reply.status(500).send({ message: "เกิดข้อผิดพลาดในระบบ" });
  }
};

export const Login = async (request, reply) => {
  const { username, password } = request.body;

  try {
    if (!username || !password) {
      return reply.status(400).send({ message: "กรุณากรอกข้อมูลให้ครบถ้วน" });
    }

    const [rows] = await pool.query(
      "SELECT * FROM users WHERE username = ? OR email = ?",
      [username, username]
    );
    if (rows.length === 0) {
      return reply.status(404).send({ message: "ไม่พบผู้ใช้ในระบบ" });
    }

    const user = rows[0];
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return reply.status(401).send({ message: "รหัสผ่านไม่ถูกต้อง" });
    }

    const gzToken = jwt.sign(
      { id: user.id, username: user.username },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "1h" }
    );

    reply.setCookie("gzToken", gzToken, {
      httpOnly: true,
      secure: false,
      maxAge: 3600 * 1000,
      sameSite: "Strict",
      path: "/",
    });
    
    return reply.status(200).send({ message: "เข้าสู่ระบบสำเร็จ", gzToken ,userId:user.id });
  } catch (error) {
    console.error("เกิดข้อผิดพลาด:", error);
    reply.status(500).send({ message: "เกิดข้อผิดพลาดในระบบ" });
  }
};

export const isLogin = async (request, reply) => {
  try {
    const gzToken = request.cookies.gzToken;

    if (!gzToken) {
      return reply.send({ isLogIn: false });
    }

    const decoded = await new Promise((resolve, reject) => {
      jwt.verify(gzToken, process.env.JWT_SECRET_KEY, (err, decoded) => {
        if (err) {
          reply.clearCookie("gzToken", {
            path: "/",
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
          });
          return resolve(null);
        }
        resolve(decoded);
      });
    });

    const [balanceRows] = await pool.query(
      "SELECT balance FROM money WHERE user_id = ?",
      [decoded.id]
    );

    if (balanceRows.length === 0) {
      return reply.send({ isLogIn: false });
    }

    const balance = balanceRows[0].balance;

    return reply.send({
      isLogIn: true,
      userId: decoded.id,
      username: decoded.username,
      balance: balance,
    });
  } catch (error) {
    // console.error("เกิดข้อผิดพลาดในการตรวจสอบ Token หรือฐานข้อมูล:", error);
    return reply.status(500).send({ isLoggedIn: false });
  }
};

export const Logout = async (request, reply) => {
  reply.clearCookie("gzToken", {
    path: "/",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
  });
  reply.send({ message: "Logged out successfully" });
};
