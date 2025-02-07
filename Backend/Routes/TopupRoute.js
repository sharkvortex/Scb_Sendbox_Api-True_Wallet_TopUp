import {TopupTrueWallet   } from '../Controllers/TrueWallet.js'
import { TopupQrcodePromtPay } from '../Controllers/TopupQrcodePromtPay.js'
import { CheckStatusPayment } from '../Controllers/CheckPayment.js'
const TopupRoutes = async (fastify, options) => {
    fastify.post('/api/topup-truewallet' , TopupTrueWallet)
    fastify.post('/api/topup-qrPromptPay' , TopupQrcodePromtPay)
    fastify.post('/api/status-qrcode-payment' , CheckStatusPayment)
}

export default TopupRoutes;