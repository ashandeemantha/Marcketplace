import React from "react";
import { format } from "date-fns";
import { Link } from "react-router-dom";

const OrderCard = ({ order }) => {
  const totalItems = order.items.reduce((sum, item) => sum + item.quantity, 0);
  const totalAmount = order.totalAmount + order.deliveryFee;

  return (
    <Link
      to={`/order/${order.orderId}`}
      className="block p-4 mb-4 bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
    >
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-semibold text-gray-800">
            Order #{order.orderId}
          </h3>
          <p className="text-sm text-gray-500 mt-1">
            {format(new Date(order.createdAt), "MMMM d, yyyy - h:mm a")}
          </p>
        </div>
        <span
          className={`px-3 py-1 rounded-full text-xs font-medium ${
            order.status === "Paid"
              ? "bg-green-100 text-green-800"
              : "bg-yellow-100 text-yellow-800"
          }`}
        >
          {order.status}
        </span>
      </div>

      <div className="mt-4 flex items-center">
        <div className="flex -space-x-2">
          {order.items.slice(0, 4).map((item, index) => (
            <img
              key={index}
              src={item.image}
              alt={item.name}
              className="h-10 w-10 rounded-full ring-2 ring-white object-cover"
            />
          ))}
          {order.items.length > 4 && (
            <span className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center text-xs font-medium text-gray-600 ring-2 ring-white">
              +{order.items.length - 4}
            </span>
          )}
        </div>
        <p className="ml-4 text-sm text-gray-600">
          {totalItems} {totalItems === 1 ? "item" : "items"}
        </p>
      </div>

      <div className="mt-4 flex justify-between items-center">
        <p className="text-sm text-gray-600">
          {order.paymentMethod === "online" ? "Paid online" : "Cash on delivery"}
        </p>
        <p className="text-lg font-semibold text-gray-900">
          RS.{totalAmount.toFixed(2)}
        </p>
      </div>
    </Link>
  );
};

export default OrderCard;