const QRCode = require("qrcode");

exports.generateQR = async (text) => {
  return await QRCode.toDataURL(text);
};
