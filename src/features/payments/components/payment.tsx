import { Box, Button, Typography } from '@/shared/components';

const Payment = () => {
  return (
    <Box>
      <Typography variant="h1">เลือกช่องทางการชำระเงิน</Typography>
      <Button variant="contained" color="primary">
        Credit Card
      </Button>
      <Button variant="contained" color="primary">
        PromptPay
      </Button>
    </Box>
  );
};

export default Payment;
