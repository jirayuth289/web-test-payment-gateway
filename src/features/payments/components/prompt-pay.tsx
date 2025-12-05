const PromptPay = () => {
  return (
    <div
      style={{ padding: '20px', maxWidth: '400px', border: '1px solid #ccc' }}
    >
      <h2>PromptPay Payment</h2>
      <hr />
      <p>
        <strong>Current Status:</strong> {status}
      </p>
    </div>
  );
};

export default PromptPay;
