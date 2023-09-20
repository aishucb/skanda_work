import React from 'react';
import Form from './Form';
import OTPVerification from './OTPVerification';
import AdditionalFields from './AdditionalFields'; // Create this component

function WriteData() {
  const [step, setStep] = React.useState(1);
  const [otpVerified, setOTPVerified] = React.useState(false); // State to track OTP verification

  const handleOTPVerificationSuccess = () => {
    setOTPVerified(true);
  };

  return (
    <div className="write-data-container">
      {step === 1 ? (
        <Form onNext={() => setStep(2)} />
      ) : step === 2 && !otpVerified ? (
        <OTPVerification onVerificationSuccess={handleOTPVerificationSuccess} />
      ) : (
        <AdditionalFields />
      )}
    </div>
  );
}

export default WriteData;
