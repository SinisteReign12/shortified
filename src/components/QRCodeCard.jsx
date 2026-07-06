"use client";

import QRCode from "react-qr-code";

export default function QRCodeCard({ value }) {
  return (
    <div className="w-min border rounded-lg p-4 mt-4">
      <h3 className="font-semibold mb-2">
        QR Code
      </h3>

      <QRCode
        value={value}
        size={150}
      />
    </div>
  );
}