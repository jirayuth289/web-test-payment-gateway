import { useState, useEffect } from 'react';
import axios from 'axios';

// ----------------------------------------------------------------------
// ตั้งค่า: เปลี่ยนเป็น Public Key ของคุณ
const OMISE_PUBLIC_KEY = 'pkey_test_65w5f3akwmx0l1acgo1';
const BACKEND_URL = 'http://localhost:4000/epayment/payment';
// ----------------------------------------------------------------------

const CreditCard = () => {
  const [status, setStatus] = useState('');
  const [card, setCard] = useState<Record<string, string>>({
    number: '4242424242424242',
    name: 'test',
    expiration_month: '12',
    expiration_year: '2026',
    security_code: '123',
  });

  // ภารกิจ A: โหลด Omise.js เข้ามาใน <head>
  useEffect(() => {
    if (!window.Omise) {
      const script = document.createElement('script');
      script.src = 'https://cdn.omise.co/omise.js';
      script.onload = () => {
        if (window.Omise) {
          window.Omise.setPublicKey(OMISE_PUBLIC_KEY);
        }
      };
      document.head.appendChild(script);
    } else {
      window.Omise.setPublicKey(OMISE_PUBLIC_KEY);
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCard({ ...card, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('1. Creating Token...');

    if (!window.Omise) return setStatus('Omise.js not loaded.');

    try {
      // ** 1. Tokenization **: แปลงข้อมูลบัตรเป็น Token
      const omiseToken = await new Promise<string>((resolve, reject) => {
        if (!window.Omise) {
          reject(new Error('Omise.js not loaded.'));
          return;
        }
        window.Omise.createToken('card', card, (statusCode, response) => {
          if (statusCode === 200) {
            resolve((response as { id: string }).id);
          } else {
            reject(
              new Error(
                (response as { message?: string }).message ||
                  'Tokenization failed.'
              )
            );
          }
        });
      });

      setStatus('2. Token created. Sending to Backend...');

      // ** 2. เรียก Backend Go เพื่อสร้าง Charge **
      const response = await axios.post(`${BACKEND_URL}/charge`, {
        token: omiseToken,
        amount: 50000, // 500.00 THB (ในหน่วยสตางค์)
        order_id: `ORDER-${Date.now()}`,
        payment_method: 'credit_card',
      });

      const data = response.data;

      console.log('response', response);
      // ** 3. จัดการ Redirect (3DS Required) **
      if (data.authorize_uri) {
        console.log('authorize_uri', data.authorize_uri);
        setStatus('3. Redirecting for 3D Secure (OTP)...');
        // Redirect ไปหน้าธนาคาร/Omise เพื่อยืนยัน OTP
        window.location.replace(data.authorize_uri);
      } else if (data.status === 'successful') {
        console.log('status', data.status);
        setStatus('Payment Successful! (No 3DS required)');
      } else {
        console.log('message', data.message);
        setStatus(`Payment Failed: ${data.message || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Payment Error:', error);
      if (axios.isAxiosError(error)) {
        setStatus(`Error: ${error.response?.data?.message || error.message}`);
      } else if (error instanceof Error) {
        setStatus(`Error: ${error.message}`);
      } else {
        setStatus('Error: An unknown error occurred');
      }
    }
  };

  return (
    <div
      style={{ padding: '20px', maxWidth: '400px', border: '1px solid #ccc' }}
    >
      <h2>Credit Card Payment</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="number"
          value={card.number}
          onChange={handleChange}
          placeholder="Card Number"
          required
        />
        <input
          name="name"
          value={card.name}
          onChange={handleChange}
          placeholder="Card Holder Name"
          required
        />
        <input
          name="expiration_month"
          value={card.expiration_month}
          onChange={handleChange}
          placeholder="Expiration Month (MM)"
          required
        />
        <input
          name="expiration_year"
          value={card.expiration_year}
          onChange={handleChange}
          placeholder="Expiration Year (YYYY)"
          required
        />
        <input
          name="security_code"
          value={card.security_code}
          onChange={handleChange}
          placeholder="CVC"
          required
        />
        <p>Amount: 500.00 THB (50000 Satang)</p>
        <button type="submit">Complete Order</button>
      </form>
      <hr />
      <p>
        <strong>Current Status:</strong> {status}
      </p>
    </div>
  );
};

export default CreditCard;
