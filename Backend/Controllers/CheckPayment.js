import { QrCheckStatus } from "../Api/QrCodeSanbox.js";
import pool from "../lib/db.js";
import jwt from "jsonwebtoken";
function getCurrentDate() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

// Main
export const CheckStatusPayment = async (request, reply) => {
  const { reference1, reference2, authorization, requestUId, userId } = request.body;
  const transactionDate = getCurrentDate();
  const gzToken = request.cookies?.gzToken;

  let TokenuserId = null;

  if (gzToken) {
    try {
      const decoded = jwt.verify(gzToken, process.env.JWT_SECRET_KEY);
      TokenuserId = decoded.id;  
    } catch (error) {
     
      TokenuserId = userId;
    }
  } else {
    TokenuserId = userId;
  }

  if (!reference1 || !authorization || !requestUId) {
    return reply.status(400).send({
      error: "Missing required fields",
      missingFields: {
        reference1: !reference1 ? "reference1 is required" : undefined,
        reference2: !reference2 ? "reference2 is required" : undefined,
        authorization: !authorization ? "authorization is required" : undefined,
        requestUId: !requestUId ? "requestUId is required" : undefined,
      },
    });
  }

  try {
    const response = await QrCheckStatus(requestUId, authorization, reference1, reference2, transactionDate);
    const total = response.data[0].amount;

    if (response?.status?.code === 1000 && response.status.description === "Success") {
      try {
        await pool.query("UPDATE money SET balance = balance + ? WHERE user_id = ?", [total, TokenuserId || userId]);
        return response
      } catch (error) {
        console.error("Error updating balance:", error);
        return reply.status(500).send({
          status: "FAIL",
          reason: "ไม่สามารถอัพเดตยอดเงินได้ ติดต่อแอดมิน",
        });
      }
    }

    return reply.status(200).send({ status: "SUCCESS", data: response.data });
  } catch (error) {
    // console.error("Error checking payment status:", error);
    // return reply.status(500).send({ status: "FAIL", message: "เกิดข้อผิดพลาดในระบบ" });
  }
};
