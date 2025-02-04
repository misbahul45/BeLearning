'use client';
import { Button } from '@/components/ui/button';
import React, { useEffect, useState } from 'react';

interface Props {
  transactionToken: string;
}

interface MidtransResult {
  order_id: string;
  transaction_status: string;
  fraud_status?: string;
  payment_type?: string;
}

const MidtransPayment = ({ transactionToken }: Props) => {
  const [snapLoaded, setSnapLoaded] = useState(false);

  useEffect(() => {
    const scriptUrl = "https://app.sandbox.midtrans.com/snap/snap.js";
    const clientKey = process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY as string;

    const script = document.createElement("script");
    script.src = scriptUrl;
    script.setAttribute("data-client-key", clientKey);
    script.async = true;
    script.onload = () => setSnapLoaded(true);
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handlePay = () => {
    if (!snapLoaded) {
      alert("Skrip Snap belum dimuat!");
      return;
    }
    if (!transactionToken) {
      alert("Token transaksi belum didapatkan!");
      return;
    }

    window.snap.pay(transactionToken, {
      onSuccess: function (result: MidtransResult) {
        alert("Pembayaran berhasil!");
        console.log(result);
      },
      onPending: function (result: MidtransResult) {
        alert("Menunggu pembayaran...");
        console.log(result);
      },
      onError: function (result: MidtransResult) {
        alert("Pembayaran gagal!");
        console.log(result);
      },
      onClose: function () {
        alert("Anda menutup popup tanpa menyelesaikan pembayaran.");
      },
    });
  };

  return (
    <div>
      <Button onClick={handlePay}>
        Buy Course
      </Button>
    </div>
  );
};

export default MidtransPayment;
