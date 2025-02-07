import { useState, useRef } from "react";
import { QrCode, Wallet, ArrowRight } from "lucide-react";
import { toast } from "react-toastify";
import {Link} from 'react-router-dom'
import TrueMoneyTopUp from "./TrueMoneyWallet/TrueMoneyTopUp.jsx";
import { useQrTopUp } from "../hooks/TopUp/useQrTopUp.jsx";
import QrTopUp from "./QrcodePromptpay/QrTopUp.jsx";
import Checkpayment from "./QrcodePromptpay/Checkpayment.jsx";
export default function TopupForm() {
  const [selectedMethod, setSelectedMethod] = useState(null);
  const [voucher_link, setvoucher_link] = useState("");
  const paymentMethods = [
    {
      id: "truemoney",
      name: "TrueMoney Wallet",
      description: "เติมเงินด้วยอั่งเปา",
      icon: Wallet,
      gradient: "from-orange-500 to-red-500",
      hoverGradient: "from-orange-600 to-red-600",
      accent: "bg-orange-100 text-orange-600",
      selected: "bg-orange-500",
    },
    {
      id: "qrcode",
      name: "QR Code",
      description: "เติมเงินผ่าน QR Code",
      icon: QrCode,
      gradient: "from-blue-500 to-indigo-500",
      hoverGradient: "from-blue-600 to-indigo-600",
      accent: "bg-blue-100 text-blue-600",
      selected: "bg-blue-500",
    },
  ];
  const [loading ,setloading] =useState()

  // TrueWallet
  const {TopUpVoucher} = TrueMoneyTopUp();
  // ------------------
  // PromptPay
  const {GetAmount} = useQrTopUp();
  // ------------------
  // CheckPayment
  
  const [dataQrcode , setdataQrcode] =useState('')
  const [ref1 , setref1]=useState('')
  const [ref2 , setref2]=useState('')
  const [acToken , setacToken]=useState('')
  const [requestUId , setrequestUId]=useState('')
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (selectedMethod === "truemoney") {

      if(!voucher_link){
        toast.error('กรุณากรอกลิงก์')
      
        return;
      }
      setloading(true)
      try{
       const response = await TopUpVoucher(voucher_link)
       if(response.status === 'FAIL'){
        toast.error(response.reason);
        return;
       }else{
        toast.success(`${response.reason} จำนวน ${response.amount} บาท`);
        setTimeout(() => {
          window.location.href = "/"
        }, 1500);
        return;
       }
      }catch(error){
        toast.error('รีเฟรชและลองใหม่อีกครั้ง')
        console.log(error);
      }finally{
        setloading(false)
        setvoucher_link('')
      }
    } else if (selectedMethod === "qrcode") {
      const amount = voucher_link;
      if(!amount){
        toast.error('กรุณากรอกจำนวนเงิน')
        return;
      }
      try{
        setloading(true)
        const response = await GetAmount(amount);
        setdataQrcode(response.response);
        setref1(response.response.reference1);
        setref2(response.response.reference2);
        setacToken(response.response.accessToken);
        setrequestUId(response.response.requestUId);

      }catch(error){
        toast.error('รีเฟรชและลองใหม่อีกครั้ง')
        console.log(error);
      }finally{
        setloading(false)
      }
      
    }
  };

  return (
    <>
    <QrTopUp data={{dataQrcode:dataQrcode}}  />
    <Checkpayment data={{ref1:ref1, ref2:ref2 ,acToken:acToken,requestUId:requestUId}}/>
      <div className="h-[calc(100vh-70px)] bg-gradient-to-br from-gray-900 to-gray-800 text-white">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">เติมเงิน</h1>
            <p className="text-gray-400 text-lg">
              เลือกวิธีการเติมเงินที่คุณต้องการ
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              {paymentMethods.map((method) => (
                <button
                  key={method.id}
                  onClick={() => setSelectedMethod(method.id)}
                  className={`relative overflow-hidden rounded-2xl transition-all duration-300 ${
                    selectedMethod === method.id
                      ? `bg-gradient-to-r ${method.gradient} transform scale-[1.02]`
                      : "bg-gray-800 hover:bg-gray-700"
                  }`}
                >
                  <div className="p-6">
                    <div className="flex items-center space-x-4">
                      <div
                        className={`p-3 rounded-xl ${
                          selectedMethod === method.id
                            ? "bg-white/20"
                            : method.accent
                        }`}
                      >
                        <method.icon
                          className={`w-6 h-6 ${
                            selectedMethod === method.id ? "text-white" : ""
                          }`}
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-xl">{method.name}</h3>
                        <p
                          className={`text-sm ${
                            selectedMethod === method.id
                              ? "text-white/80"
                              : "text-gray-400"
                          }`}
                        >
                          {method.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>

            {selectedMethod && (
              <div className="animate-fadeIn">
                <div className="bg-gray-800/50 backdrop-blur rounded-2xl p-6">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-300">
                        {selectedMethod === "truemoney"
                          ? "ลิ้งค์อั่งเปา"
                          : "จำนวนเงินที่ต้องการเติม"}
                      </label>
                      <input
                        type={
                          selectedMethod === "truemoney" ? "text" : "number"
                        }
                        step='any'
                        placeholder={
                          selectedMethod === "truemoney"
                            ? "วางลิ้งค์ของคุณที่นี่"
                            : "ระบุจำนวนเงิน"
                        }
                        className="w-full bg-gray-700 text-white px-4 py-3 rounded-xl border border-gray-600 
                        focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none
                        transition-all duration-300"
                        value={voucher_link}
                        onChange={(e) => setvoucher_link(e.target.value)}
                      />
                    </div>

                    <button
                      disabled={loading}
                      type="submit"
                      className={`w-full hover:cursor-pointer p-4 rounded-xl font-semibold text-white transition-all duration-300
                      flex items-center justify-center space-x-2 ${
                        selectedMethod === "truemoney"
                          ? "bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600"
                          : "bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600"
                      }`}
                    >
                      {loading ? (
                        <div className="flex">
                          <div className="w-6 h-6 border-4 border-gray-300 border-t-red-500 rounded-full animate-spin"></div>
                          <div><p className="text-sm ml-2">รอสักครู่...</p></div>
                        </div>
                      ) : (
                        <>
                          <ArrowRight className="w-5 h-5" />
                          <span>
                            {selectedMethod === "truemoney"
                              ? "เติมเงิน"
                              : "ยืนยันการเติมเงิน"}
                          </span>
                        </>
                      )}
                    </button>
                  </form>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
