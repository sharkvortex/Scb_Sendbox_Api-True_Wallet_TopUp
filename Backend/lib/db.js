import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

const pool = mysql.createPool({
  host: process.env.DB_HOST || "mysql",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "1234",
  database: process.env.DB_NAME || "myapp",
});

const ConnectDatabase = async () => {
  try {
    const connection = await pool.getConnection();
    console.log("✅ Database connected....");
    connection.release();
  } catch (error) {
    console.error("❌ Database connection failed:", error.message);
  }
};

ConnectDatabase();

export default pool;
