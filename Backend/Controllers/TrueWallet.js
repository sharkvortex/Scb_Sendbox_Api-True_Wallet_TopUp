import { redeemvouchers } from '../Api/TrueWallet.js';
import dotenv from 'dotenv';
dotenv.config();
import pool from '../lib/db.js';
import cookie from "fastify-cookie";
import Fastify from "fastify";
import jwt from 'jsonwebtoken';
const fastify = Fastify();
fastify.register(cookie);

export const TopupTrueWallet = async (request , reply)=>{
    const {voucher_link} = request.body;
    const gzToken = request.cookies.gzToken;
    
    if(!gzToken){
        return reply.status(401).send({
            status: 'FAIL',
            reason:  'กรุณาเข้าระบบก่อน'
        })
    }

    if(!voucher_link){
        return reply.status(400).send({
            status: 'FAIL',
            reason:  'กรุณาป้อนลิงค์'
        })
    }

    try{
        const decoded = await jwt.verify(gzToken , process.env.JWT_SECRET_KEY)
        const userId = decoded.id
        if(!userId){
            return reply.status(402).send({
                status: 'FAIL',
                reason:  'กรุณาเข้าระบบก่อน'
            })
        }
        
       const result = await redeemvouchers(process.env.PHONE_NUMBER , voucher_link)  
       if(result.status === 'SUCCESS'){
        try{
            const upDateBalance = await pool.query('UPDATE money SET balance = balance + ? WHERE user_id = ?', [result.amount, userId]);
            
        }catch(error){
            console.error("Error updating balance:", error);
            return reply.status(500).send({
                status: "FAIL",
                reason: "ไม่สามารถอัพเดตยอดเงินได้ ติดต่อแอดมิน"
            });
        }
       }
       
       
       reply.send(result);

    }catch(error){
        reply.send({
            status: "FAIL",
            reason:  "เกิดข้อผิดพลาดขณะทำรายการลองใหม่อีกครั้ง" || error.message 
        });
    }
}