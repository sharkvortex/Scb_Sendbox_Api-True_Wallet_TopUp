import twApi from "@opecgame/twapi";

// True Wallet TopUp \\
export async function redeemvouchers(phone_number, voucher_link) {
  voucher_link = voucher_link.trim();

  if (voucher_link.length === 0) {
    return {
      status: "FAIL",
      reason: "กรุณากรอกลิงค์อั่งเปา",
    };
  }
  try {
    const tw = await twApi(voucher_link, phone_number);

    switch (tw.status.code) {
      case "SUCCESS":
        return {
          status: "SUCCESS",
          reason: "เติมเงินสำเร็จ",
          amount: tw.data.my_ticket.amount_baht,
        };

      case "CANNOT_GET_OWN_VOUCHER":
        return {
          status: "FAIL",
          reason: "ไม่สามารถรับซองตัวเองได้",
        };

      case "TARGET_USER_NOT_FOUND":
        return {
          status: "FAIL",
          reason: "เบอร์มือถือผู้รับไม่ถูกต้อง",
        };

      case "INTERNAL_ERROR":
        return {
          status: "FAIL",
          reason: "ลิงค์ไม่สามารถใช้ได้",
        };

      case "VOUCHER_OUT_OF_STOCK":
        return {
          status: "FAIL",
          reason: "ไม่สามารถใช้งานได้ลิงค์ได้ใช้งานไปแล้ว",
        };

      case "VOUCHER_NOT_FOUND":
        return {
          status: "FAIL",
          reason: "ลิงค์ไม่ถูกต้อง",
        };

      case "VOUCHER_EXPIRED":
        return {
          status: "FAIL",
          reason: "ลิงค์หมดอายุแล้ว",
        };

      default:
        return {
          status: "FAIL",
          reason: "เกิดข้อผิดพลาด ลองอีกครั้งภายหลัง",
        };
    }
  } catch (error) {
    return {
      status: "FAIL",
      reason: error.message || "Request failed",
    };
  }
}


