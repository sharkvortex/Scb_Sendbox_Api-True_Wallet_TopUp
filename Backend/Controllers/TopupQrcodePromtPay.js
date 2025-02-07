import { QrcodeSanBox } from '../Api/QrCodeSanbox.js';
import dotenv from 'dotenv';
dotenv.config();



export const TopupQrcodePromtPay = async (request, reply) => {
    const { amount } = request.body;
    const gzToken = request.cookies.gzToken;
    if(!gzToken){
        return reply.status(401).send({
            status: 'FAIL',
            reason:  'กรุณาเข้าระบบก่อน'
        })
    }
    if (!amount) {
        return reply.status(400).send({ error: "Amount is required" });
    }
    try {
        const result = await QrcodeSanBox(amount);
        reply.status(200).send({ response:result});
    } catch (error) {
        console.error("Error in TopupQrcodePromtPay:", error);
        reply.status(500).send({ error: error.message || "Internal Server Error" });
    }
};

