import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const OrderDetails = () => {
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { orderId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await fetch(`http://localhost:8080/orders/${orderId}`);
        if (!response.ok) throw new Error("Order not found");
        const data = await response.json();
        setOrder(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [orderId]);

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );

  if (error)
    return (
      <div className="text-center py-10">
        <p className="text-red-500 text-lg">{error}</p>
        <button
          onClick={() => navigate("/orders")}
          className="mt-4 px-4 py-2 bg-blue-400 text-white rounded hover:bg-blue-700"
        >
          Back to Orders
        </button>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50">
      
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <button
          onClick={() => navigate("/orders")}
          className="flex items-center text-blue-600 hover:text-green-500 mb-6"
        >
          <svg
            className="w-5 h-5 mr-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          Back to Orders
        </button>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-2xl font-bold text-gray-800">
                  Order #{order.orderId}
                </h1>
                <p className="text-gray-500 mt-1">
                  Placed on{" "}
                  {new Date(order.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>
              <span
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                  order.status === "Paid"
                    ? "bg-green-100 text-green-800"
                    : "bg-yellow-100 text-yellow-800"
                }`}
              >
                {order.status}
              </span>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8 p-6">
            <div>
              <h2 className="text-lg font-semibold mb-4">Shipping Information</h2>
              <div className="space-y-2">
                <p className="font-medium">{order.buyerDetails.name}</p>
                <p>{order.buyerDetails.address}</p>
                <p>
                  {order.buyerDetails.city}, {order.buyerDetails.state}
                </p>
                <p>Phone: {order.buyerDetails.phone}</p>
              </div>

              <h2 className="text-lg font-semibold mt-6 mb-4">Payment Method</h2>
              <p className="capitalize">{order.paymentMethod}</p>
              {order.transactionId && (
                <p className="text-sm text-gray-500 mt-1">
                  Transaction ID: {order.transactionId}
                </p>
              )}
            </div>

            <div>
              <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
              <div className="space-y-4">
                {order.items.map((item, index) => (
                  <div
                    key={index}
                    className="flex justify-between border-b pb-4"
                  >
                    <div className="flex items-center space-x-4">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 rounded-md object-cover"
                      />
                      <div>
                        <p className="font-medium">{item.name}</p>
                        <p className="text-sm text-gray-500">
                          Qty: {item.quantity}
                        </p>
                      </div>
                    </div>
                    <p className="font-medium">
                      RS.{(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-6 space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span>RS.{order.totalAmount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Delivery Fee</span>
                  <span>RS.{order.deliveryFee.toFixed(2)}</span>
                </div>
                <div className="flex justify-between border-t pt-2 mt-2">
                  <span className="font-semibold">Total</span>
                  <span className="font-semibold">
                    RS.{(order.totalAmount + order.deliveryFee).toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;