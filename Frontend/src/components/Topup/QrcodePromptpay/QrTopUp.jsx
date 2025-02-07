import { useEffect, useState } from "react";
import { Clock, X, RefreshCcw } from "lucide-react";
import HeadQR from "../../../assets/headQr.png";
import CountdownTimer from "../../Timer/CountdownTimer";
export default function QrTopUp({ data }) {
  const { dataQrcode } = data;

  const dataQR = {
    acToken: dataQrcode?.accessToken,
    reference1: dataQrcode?.reference1,
    reference2: dataQrcode?.reference2,
    reference3: dataQrcode?.reference3,
    requestUId: dataQrcode?.requestUId,
    QrImage: dataQrcode?.data?.qrImage,
    amount: dataQrcode?.data?.amount,
    Timeleft: dataQrcode?.data?.csExtExpiryTime,
  };

  const [QrStored, setQrStored] = useState(() => {
    const storedData = sessionStorage.getItem("dataQR");
    return storedData ? JSON.parse(storedData) : {};
  });

  const isValidData =
    (dataQR.QrImage && dataQR.amount && dataQR.acToken && dataQR.Timeleft) ||
    (QrStored.QrImage &&
      QrStored.amount &&
      QrStored.acToken &&
      QrStored.Timeleft);

  useEffect(() => {
    if (isValidData && dataQR.QrImage) {
      sessionStorage.setItem("dataQR", JSON.stringify(dataQR));
    }
  }, [dataQR, isValidData]);

  useEffect(() => {
    const storedData = sessionStorage.getItem("dataQR");
    if (storedData) {
      setQrStored(JSON.parse(storedData));
    }
  }, []);
  const [Timeexpriy, setTimeexpriy] = useState(false);
  const handleTimeleft = () => {
    setTimeexpriy(true);
  };

  const handleCancel_New = () => {
    sessionStorage.removeItem("dataQR");
    document.location.href = "/topup";
  };
  return (
    <>
      {isValidData && (
        <div className="fixed inset-0 z-[50] flex items-center justify-center bg-gray-900/80 backdrop-blur-sm p-4">
          <div className="w-full max-w-md animate-fade-in-up">
            <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
              <img
                src={HeadQR}
                alt="QR Thai"
                className="w-full  object-cover"
              />

              <div className="p-2">
                <div className="flex flex-col items-center">
                  <div className="bg-white p-3 rounded-xl shadow-md">
                    <img
                      src={`data:image/png;base64,${
                        dataQR.QrImage || QrStored.QrImage
                      }`}
                      alt="QR Code"
                      className="w-[200px] h-[200px] object-contain"
                    />
                  </div>
                </div>

                {/* Shop Info */}
                <div className="mt-4 text-center">
                  <h2 className="text-2xl font-bold text-gray-800">
                    SHARKVORTEXSHOP
                  </h2>

                  {/* Reference Numbers */}
                  <div className="mt-4 space-y-2 bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">REF1:</span>
                      <div className="flex items-center gap-2">
                        <span className="font-medium">
                          {dataQR.reference1 || QrStored.reference1}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">REF2:</span>
                      <div className="flex items-center gap-2">
                        <span className="font-medium">
                          {dataQR.reference2 || QrStored.reference2}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 flex justify-center items-center gap-2">
                    <span className="text-gray-800 font-semibold">
                      XXX-X-X5835-X
                    </span>
                  </div>

                  <div className="mt-4 bg-blue-50 p-4 rounded-lg">
                    <p className="text-gray-800">
                      <span className="text-l">จำนวน</span>
                      <br />
                      <span className="text-2xl font-bold">
                        {dataQR.amount || QrStored.amount} บาท
                      </span>
                    </p>
                  </div>

                  <div className="mt-4 flex items-center justify-center gap-2 text-red-500">
                    <Clock className="w-4 h-4" />
                    <span>สแกนภายใน</span>
                    <span className="font-medium">
                      <CountdownTimer
                        time={dataQR.Timeleft || QrStored.Timeleft}
                        onTimeout={handleTimeleft}
                      />
                    </span>
                  </div>
                  {Timeexpriy ? (
                    <>
                      <button
                        onClick={handleCancel_New}
                        className="mt-6 w-full py-3 hover:cursor-pointer px-4   text-blue-500 font-medium rounded-lg transition-colors flex items-center justify-center gap-2"
                      >
                        <RefreshCcw className="w-4 h-4" />
                        ทำรายการใหม่
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={handleCancel_New}
                        className="mt-6 w-full py-3 hover:cursor-pointer px-4  text-red-500 font-medium rounded-lg transition-colors flex items-center justify-center gap-2"
                      >
                        <X className="w-4 h-4" />
                        ยกเลิกรายการ
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
