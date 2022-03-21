const admin = require("firebase-admin");

const sendNotification = async (
  title, // string
  body, // string
  type, // 'PETUGAS_STARTED' | 'PETUGAS_ARRIVED' | 'PAYMENT_COMPLETE' | 'NEW_ORDER',
  deviceTokens, // Array of strings
  payloadData // object
) => {
  if (!deviceTokens || deviceTokens.length === 0) return;
  const sendPushNotifProm = admin
    .messaging()
    .sendToDevice(deviceTokens, {
      data: {
        type,
        ...payloadData,
      },
      notification: { title, body },
    })
    .then(() => {
      console.log("Success in sending notification");
    })
    .catch((error) => {
      console.log("Error sending message:", error);
    });

  await Promise.all([sendPushNotifProm]);
};

// Usage example
// sendNotification(
//   "Petugas telah sampai!,
//   "Petugas telah sampai untuk mengambil pesanan anda",
//   "PETUGAS_ARRIVED",
//   [
//     "eaHaCIw7SJyJ4DARTixQic:APA91bEWv5YfALog8UMhc92-y1UENTiwBFjL30gQptIUFDhF3WR_EGaKV4F_r9YeW_Rkk_Kv27UzZbsYm53XJD2RrNLXTf7y-42ybzyKDfFriKBqVGIOqqvjWTA44qlfzoasplcOnHC8",
//   ],
// {
//   orderId: 'iniOrderIdYangBersangkutan'
// }
// );

module.exports = { sendNotification };
