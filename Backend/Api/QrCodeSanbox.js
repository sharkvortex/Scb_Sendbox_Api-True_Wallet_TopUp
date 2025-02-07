import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

// Request Token
export async function ReQuestToken() {
  try {
    const requestUId = uuidv4();
    const response = await axios.post(
      "https://api-sandbox.partners.scb/partners/sandbox/v1/oauth/token",
      {
        applicationKey: process.env.APPLICATION_KEY,
        applicationSecret: process.env.APPLICATION_SECRET,
      },
      {
        headers: {
          "Content-Type": "application/json",
          resourceOwnerId: process.env.APPLICATION_KEY,
          requestUId: requestUId,
          "accept-language": "TH",
        },
      }
    );
    return { ...response.data, requestUId: requestUId };
  } catch (error) {
    console.error("Error fetching token:", error);
    throw error;
  }
}

function generateRef1() {
  return "TOPUP" + uuidv4().replace(/-/g, "").toUpperCase().slice(0, 15);
}
function generateRef3() {
  return uuidv4().replace(/-/g, "").toUpperCase().slice(0, 20);
}

// Create QR Code
export async function CreateQrCode(amount) {
  const ref1 = generateRef1();
  const ref2 = process.env.NAME_SHOP
  const ref3 = generateRef3();
  try {
    const result = await ReQuestToken();
    const accessToken = result.data.accessToken;
    const requestUId = result.requestUId;
    const response = await axios.post(
      "https://api-sandbox.partners.scb/partners/sandbox/v1/payment/qrcode/create",
      {
        qrType: "PPCS",
        amount: amount,
        ppType: "BILLERID",
        ppId: process.env.BILLER_ID,
        ref1: ref1,
        ref2: ref2,
        ref3: ref3,
        invoice: "TOPUP",
        merchantId: process.env.MERCHANT_ID,
        terminalId: process.env.TERMINAL_ID,
        csExtExpiryTime: "5",
      },
      {
        headers: {
          "content-type": "application/json",
          resourceOwnerId: process.env.APPLICATION_KEY,
          requestUId: result.requestUId,
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return {
      ...response.data,
      reference1: ref1,
      reference2: ref2,
      reference3: ref3,
      accessToken: accessToken,
      requestUId: requestUId,
    };
  } catch (error) {
    console.error("Error creating QR Code:", error);
    throw error;
  }
}

// Main QR Code function
export async function QrcodeSanBox(amount) {
  try {
    const qrData = await CreateQrCode(amount);
    return qrData;
  } catch (error) {
    console.error("Error in QrcodePromtPay:", error);
    throw error;
  }
}

// -------------------------------------------------------------------------------------------  \\

// CheckPaymentStatus
export async function QrCheckStatus(
  requestUId,
  authorization,
  reference1,
  reference2,
  transactionDate,
) {
  const eventCode = '00300100'; 
  const billerId = process.env.BILLER_ID;

  const url = `https://api-sandbox.partners.scb/partners/sandbox/v1/payment/billpayment/inquiry?billerId=${billerId}&reference1=${reference1}&reference2=${reference2}&transactionDate=${transactionDate}&eventCode=${eventCode}`;
  // console.log('authorization',authorization)
  // console.log('requestUId',requestUId)
  // console.log('billerId',billerId);
  // console.log('reference1',reference1);
  // console.log('reference2',reference2);
  // console.log('transactionDate',transactionDate);
  // console.log('eventCode',eventCode);
  try {
    const res = await axios.get(url, {
      headers: {
        "Content-type": "application/json",
        resourceOwnerId: process.env.APPLICATION_KEY,  
        requestUId: requestUId, 
        Authorization: `Bearer ${authorization}`,  
        "Accept-language": "TH", 
      },
    });
    if (res.data?.status?.code === 1000 && res.data?.status?.description === "Success") {
      return res.data;
    }
  } catch (error) {
    // console.error("❌ API Error:", error.response?.data || error.message);
    // return { error: "Request failed", details: error.response?.data || error.message };
  }
}
