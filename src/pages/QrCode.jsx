import React from "react";
import "./QrCode.css";
import QRCode from "react-qr-code";

const QrCode = () => {
  return (
    <div className="qrcode-container">
      <div className="qrcode-title">QR Code</div>
      <div className="qrcode-content">
        <QRCode
          size={200}
          value="https://carpooli.netlify.app"
          bgColor="#ccc"
          fgColor="#282c34"
        />
        <h3>carpooli.netlify.app</h3>
      </div>
    </div>
  );
};

export default QrCode;
