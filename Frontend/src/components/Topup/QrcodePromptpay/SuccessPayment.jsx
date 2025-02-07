import React, { useState, useEffect } from "react";
import { Check, Wallet } from "lucide-react";

export default function SuccessPayment({ data }) {
  const { response } = data;
  const [showAnimation, setShowAnimation] = useState(false);
  const [totaltopup, setTotaltopup] = useState('');
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (response?.status?.code === 1000 && response.status.description === "Success") {
      sessionStorage.removeItem('dataQR');
      setTotaltopup(response.data[0].amount);
      setShowAnimation(true);
    
      const duration = 2500; 
      const interval = 50; 
      const steps = duration / interval;
      let currentStep = 0;

      const progressInterval = setInterval(() => {
        currentStep++;
        setProgress((currentStep / steps) * 100);
        
        if (currentStep >= steps) {
          clearInterval(progressInterval);
          document.location.href = '/';
        }
      }, interval);

      return () => clearInterval(progressInterval);
    }
  }, [response]);

  return (
    <>
      {showAnimation && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-[51]">
          <div className={`relative bg-white rounded-3xl shadow-2xl max-w-md w-full mx-4 overflow-hidden transform transition-all duration-1000 ${
            showAnimation ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
          }`}>
            {/* Progress bar */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gray-100">
              <div 
                className="h-full bg-gradient-to-r from-blue-500 via-indigo-500 to-blue-500 transition-all duration-300 ease-out"
                style={{ 
                  width: `${progress}%`,
                  backgroundSize: '200% 100%',
                  animation: 'gradient 2s linear infinite'
                }}
              />
            </div>
            
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute -right-16 -top-16 w-64 h-64 rounded-full bg-blue-50 opacity-30" />
              <div className="absolute -left-16 -bottom-16 w-64 h-64 rounded-full bg-indigo-50 opacity-30" />
            </div>

            <div className="relative p-8">
              <div className="flex flex-col items-center">
                <div className="relative mb-8">
                  <div className={`w-24 h-24 bg-green-100 rounded-full flex items-center justify-center transform transition-all duration-1000 ${
                    showAnimation ? "scale-100" : "scale-0"
                  }`}>
                    <div className="relative">
                      <Wallet className={`w-12 h-12 text-green-500 transition-all duration-500 ${
                        showAnimation ? "opacity-100" : "opacity-0"
                      }`} />
                      <div className={`absolute inset-0 flex items-center justify-center transition-all duration-500 ${
                        showAnimation ? "opacity-100 scale-100" : "opacity-0 scale-0"
                      }`}>
                        <Check className="w-12 h-12 text-green-500" />
                      </div>
                    </div>
                  </div>
                  
                  <div className="absolute inset-0 w-24 h-24 rounded-full border-4 border-green-500 animate-ping opacity-40" />
                  <div className="absolute inset-0 w-24 h-24 rounded-full border-4 border-green-300 animate-pulse opacity-30" />
                </div>

              
                <div className={`text-center space-y-4 transform transition-all duration-700 delay-300 ${
                  showAnimation ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
                }`}>
                  <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                    เติมเงินสำเร็จ
                  </h2>
                  <p className="font-bold text-xl text-blue-500">
                    จำนวน: <span>{totaltopup}</span> บาท
                  </p>
                </div>

                
                <div className={`w-full mt-8 flex justify-center transform transition-all duration-700 delay-500 ${
                  showAnimation ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
                }`}>
                  <div className="w-16 h-1 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500" />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

    </>
  );
}