import { Box, Button, Typography } from '@/shared';
import axios from 'axios';

const OrderCheckout = () => {
  const handleCharge = () => {
    const order_id = `ORDER-${Date.now()}`;
    axios
      .post('http://localhost:4000/epayment/payment/init', {
        payment_method: 'credit_card',
        order_id: order_id,
        amount: 12000, // mock 120.00 THB
        currency: 'THB',
        req_client_service: 'test-service',
        return_uri: `http://localhost:3000/charge-management?order_id=${order_id}`,
      })
      .then(response => {
        const location = response.headers.location;
        if (
          location &&
          typeof location === 'string' &&
          location.trim() !== ''
        ) {
          window.location.href = location;
        } else {
          if (response.data?.dh_card_url) {
            window.location.href = response.data.dh_card_url;
          }
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <>
      <Box>
        <Typography variant="h2">รายการสั่งซื้อ</Typography>
        <p>Product1234567890</p>
        <p>Total: 100 THB</p>
        <p>Shipping: 10 THB</p>
        <p>Tax: 10 THB</p>
        <p>Total: 120 THB</p>
        <Button variant="contained" color="primary" onClick={handleCharge}>
          จ่ายเงิน
        </Button>
        <br />
      </Box>
    </>
  );
};

export default OrderCheckout;
