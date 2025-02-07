import TopUpQrCode from "./TopUpQrCode";

export function useQrTopUp() {
  const { QrCodeRequest } = TopUpQrCode();
  const GetAmount = async (amount) => {
    try {
      const res = await QrCodeRequest(amount);
      return res.data;
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  return {  GetAmount };
}
