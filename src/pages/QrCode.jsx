import React from "react";
import "./QrCode.css";
import QRCode from "react-qr-code";

const QrCode = () => {
  return (
    <div className="qrcode-container">
      <div>
        <QRCode
          size={200}
          value="https://carpooli.netlify.app"
          bgColor="#282c34"
          fgColor="#282c34"
        />
      </div>
      <h3>carpooli.netlify.app</h3>
    </div>
  );
};

export default QrCode;
