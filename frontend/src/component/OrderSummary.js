/* eslint-disable no-unused-vars */
import React from "react";
import { 
  FaBox, FaCheckCircle, FaMapMarkerAlt, FaPhone, 
  FaUser, FaEnvelope, FaCreditCard, FaMoneyBillWave, 
  FaShoppingBag, FaTruck 
} from "react-icons/fa";
import { SiStripe } from "react-icons/si";

const OrderSummary = ({ orderDetails }) => {
  if (!orderDetails) return null;

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
      {/* Order Confirmation Header */}
      <div className="bg-green-50 p-6 border-b border-green-100">
        <div className="flex items-center justify-center">
          <FaCheckCircle className="text-5xl text-green-500 mr-4" />
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Order Confirmed!</h1>
            <p className="text-gray-600">
              Thank you for your purchase. Your order #{orderDetails.orderId} has been received.
            </p>
          </div>
        </div>
      </div>

      {/* Rest of the Order Summary JSX (as provided earlier) */}
      {/* ... */}
    </div>
  );
};

export default OrderSummary;