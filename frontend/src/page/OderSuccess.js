import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";

const OrderSuccess = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await axios.get(`/orders/${orderId}`);
        setOrder(response.data);
      } catch (error) {
        toast.error("Failed to fetch order details");
        console.error("Order Fetch Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [orderId]);

  if (loading) return <div>Loading...</div>;
  if (!order) return <div>Order not found</div>;

  return (
    <div className="order-success">
      <h2>Order Confirmation</h2>
      <p>Thank you for your order!</p>
      
      <div className="order-details">
        <h3>Order #{order.orderId}</h3>
        <p>Status: {order.status}</p>
        <p>Total Amount: RS.{order.totalAmount.toFixed(2)}</p>
        <p>Payment Method: {order.paymentMethod}</p>
      </div>

      <div className="order-items">
        <h4>Items Ordered:</h4>
        {order.items.map((item) => (
          <div key={item.productId} className="order-item">
            <img src={item.image} alt={item.name} width="50" />
            <span>{item.name}</span>
            <span>${item.price} x {item.quantity}</span>
          </div>
        ))}
      </div>

      <div className="shipping-info">
        <h4>Shipping Address:</h4>
        <p>{order.buyerDetails.name}</p>
        <p>{order.buyerDetails.address.street}</p>
        <p>{order.buyerDetails.address.city}, {order.buyerDetails.address.state} {order.buyerDetails.address.postalCode}</p>
        <p>{order.buyerDetails.address.country}</p>
      </div>
    </div>
  );
};

export default OrderSuccess;