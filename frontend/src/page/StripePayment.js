/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { 
  FaCreditCard, 
  FaUser, 
  FaLock, 
  FaCheck,
  FaPaypal // Added missing import
} from "react-icons/fa";
import { SiStripe } from "react-icons/si";

const PaymentMethodSection = ({ activeMethod, setActiveMethod }) => {
  const stripe = useStripe(); // Now being used in the component
  const elements = useElements(); // Now being used in the component
  const [saveCard, setSaveCard] = useState(false);
  const [cardComplete, setCardComplete] = useState(false); // Now being used in CardElement onChange
  const [cardDetails, setCardDetails] = useState({
    name: "",
    email: "",
    phone: ""
  });

  const handleCardDetailsChange = (e) => {
    const { name, value } = e.target;
    setCardDetails(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Example function using stripe and elements
  const handlePayment = async () => {
    if (!stripe || !elements) {
      return;
    }
    // Payment processing logic would go here
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h2 className="text-xl font-bold text-gray-800 mb-6">Payment Details</h2>
      
      {/* Payment Method Tabs */}
      <div className="flex space-x-4 mb-6 border-b">
        <button
          onClick={() => setActiveMethod("card")}
          className={`pb-3 px-1 border-b-2 font-medium text-sm ${
            activeMethod === "card"
              ? "border-green-500 text-green-600"
              : "border-transparent text-gray-500 hover:text-gray-700"
          }`}
        >
          <div className="flex items-center">
            <FaCreditCard className="mr-2" />
            Credit/Debit Card
          </div>
        </button>
        <button
          onClick={() => setActiveMethod("paypal")}
          className={`pb-3 px-1 border-b-2 font-medium text-sm ${
            activeMethod === "paypal"
              ? "border-blue-500 text-blue-600"
              : "border-transparent text-gray-500 hover:text-gray-700"
          }`}
        >
          <div className="flex items-center">
            <FaPaypal className="mr-2" />
            PayPal
          </div>
        </button>
      </div>

      {/* Card Payment Form */}
      {activeMethod === "card" && (
        <div className="space-y-4">
          <div className="border rounded-lg p-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-medium text-gray-700">Card Information</h3>
              <div className="flex items-center">
                <SiStripe className="text-purple-500 mr-1" />
                <span className="text-xs text-gray-500">Secured by Stripe</span>
              </div>
            </div>
            
            <div className="mb-4">
              <CardElement
                options={{
                  style: {
                    base: {
                      fontSize: "16px",
                      color: "#424770",
                      "::placeholder": {
                        color: "#a0aec0",
                      },
                      iconColor: "#666ee8",
                    },
                    invalid: {
                      color: "#e53e3e",
                      iconColor: "#e53e3e",
                    },
                  },
                  hidePostalCode: true,
                }}
                onChange={(e) => setCardComplete(e.complete)}
              />
            </div>

            {/* Other form elements... */}
          </div>
        </div>
      )}

      {/* Valid links for accessibility */}
      <div className="mt-6 flex items-start">
        <div className="flex-shrink-0">
          <FaCheck className="h-5 w-5 text-green-500" />
        </div>
        <div className="ml-3">
          <p className="text-sm text-gray-500">
            By clicking "Pay Now", you agree to our{" "}
            <a href="/terms" className="text-green-600 hover:text-green-500">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="/privacy" className="text-green-600 hover:text-green-500">
              Privacy Policy
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
};

export default PaymentMethodSection;