import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import OrderSummary from "../component/OrderSummary";
import { toast } from "react-hot-toast";
import { FaSpinner } from "react-icons/fa";

const Success = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [orderDetails, setOrderDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (location.state?.orderId) {
      fetchOrderDetails(location.state.orderId);
    } else if (location.state?.orderDetails) {
      setOrderDetails(location.state.orderDetails);
      setLoading(false);
    } else {
      toast.error("No order information found");
      navigate("/");
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.state, navigate]);

  const fetchOrderDetails = async (orderId) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_SERVER_DOMIN}/orders/${orderId}`);
      const data = await response.json();
      if (response.ok) {
        setOrderDetails(data);
      } else {
        throw new Error(data.message || "Failed to fetch order details");
      }
    } catch (error) {
      toast.error(error.message);
      navigate("/");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <FaSpinner className="animate-spin text-4xl text-green-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      {orderDetails ? (
        <OrderSummary orderDetails={orderDetails} />
      ) : (
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-800">
            Unable to load order details
          </h2>
          <button
            onClick={() => navigate("/")}
            className="mt-4 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
          >
            Return to Home
          </button>
        </div>
      )}
    </div>
  );
};

export default Success;
