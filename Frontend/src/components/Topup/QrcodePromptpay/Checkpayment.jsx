import { useEffect, useRef, useState } from "react";
import useCheckpayment from "../../hooks/TopUp/useCheckpayment.jsx";
import SuccessPayment from './SuccessPayment.jsx'
export default function Checkpayment({ data }) {
  const storedData = sessionStorage.getItem('dataQR');
  const [QrStored , setQrStord] = useState({});

  useEffect(() => {
    if (storedData) {
      const dataQR = JSON.parse(storedData);
      setQrStord(dataQR);
    }
  }, []);

  const { ref1, ref2, acToken, requestUId } = data;
  const { FetchcheckStatus } = useCheckpayment();
  const intervalId = useRef(null); 
  const [response , setResponse] = useState([]);

  useEffect(() => {
    const reference1 = ref1 || QrStored.reference1;
    const reference2 = ref2 || QrStored.reference2;
    const token = acToken || QrStored.acToken;
    const uid = requestUId || QrStored.requestUId;

    if (reference1 && reference2 && token && uid) {
      if (intervalId.current) {
        clearInterval(intervalId.current);
        intervalId.current = null;
      }

      intervalId.current = setInterval(async () => {
        const res = await FetchcheckStatus(reference1, reference2, token, uid);

        if (res?.status?.code === 1000 && res?.status?.description === "Success") {
          if (intervalId.current) {
            clearInterval(intervalId.current);
            intervalId.current = null;
          }
          setResponse(res);
        }
      }, 5000);

      return () => {
        if (intervalId.current) {
          clearInterval(intervalId.current);
          intervalId.current = null;
        }
      };
    }
  }, [ref1, ref2, acToken, requestUId, QrStored]);

  return (
    <>
      <SuccessPayment data={{response: response}} />
    </>
  );
}
