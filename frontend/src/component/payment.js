import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import axios from "axios";
import { clearCart } from "../redux/productslide";

const Payment = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cartItem } = useSelector((state) => state.product);
  const { _id, firstName, lastName, email } = useSelector((state) => state.user);
  const [paymentMethod, setPaymentMethod] = useState("online");
  const [address, setAddress] = useState({
    street: "",
    city: "",
    state: "",
    postalCode: "",
    country: ""
  });

  const calculateTotal = () => {
    return cartItem.reduce((sum, item) => sum + parseFloat(item.total), 0);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const orderData = {
        items: cartItem.map(item => ({
          productId: item._id,
          name: item.name,
          price: parseFloat(item.price),
          quantity: item.qty,
          image: item.image
        })),
        userId: _id,
        paymentMethod,
        totalAmount: calculateTotal(),
        deliveryFee: 5.99, // You can calculate this dynamically
        buyerDetails: {
          name: `${firstName} ${lastName}`,
          email,
          address
        }
      };

      const response = await axios.post("/create-order", orderData);
      
      if (response.data) {
        toast.success("Order placed successfully!");
        dispatch(clearCart());
        navigate(`/order-success/${response.data.orderId}`);
      }
    } catch (error) {
      toast.error("Failed to place order");
      console.error("Order Error:", error);
    }
  };

  return (
    <div className="payment-container">
      <h2>Payment Information</h2>
      <form onSubmit={handleSubmit}>
        {/* Payment method selection */}
        <div className="form-group">
          <label>Payment Method</label>
          <select 
            value={paymentMethod} 
            onChange={(e) => setPaymentMethod(e.target.value)}
            required
          >
            <option value="online">Online Payment</option>
            <option value="cod">Cash on Delivery</option>
          </select>
        </div>

        {/* Shipping address */}
        <div className="form-group">
          <label>Shipping Address</label>
          <input
            type="text"
            placeholder="Street"
            value={address.street}
            onChange={(e) => setAddress({...address, street: e.target.value})}
            required
          />
          <input
            type="text"
            placeholder="City"
            value={address.city}
            onChange={(e) => setAddress({...address, city: e.target.value})}
            required
          />
          <input
            type="text"
            placeholder="State"
            value={address.state}
            onChange={(e) => setAddress({...address, state: e.target.value})}
            required
          />
          <input
            type="text"
            placeholder="Postal Code"
            value={address.postalCode}
            onChange={(e) => setAddress({...address, postalCode: e.target.value})}
            required
          />
          <input
            type="text"
            placeholder="Country"
            value={address.country}
            onChange={(e) => setAddress({...address, country: e.target.value})}
            required
          />
        </div>

        {/* Order summary */}
        <div className="order-summary">
          <h3>Order Summary</h3>
          {cartItem.map((item) => (
            <div key={item._id} className="order-item">
              <img src={item.image} alt={item.name} width="50" />
              <span>{item.name} (x{item.qty})</span>
              <span>${item.total}</span>
            </div>
          ))}
          <div className="order-total">
            <strong>Total: ${calculateTotal().toFixed(2)}</strong>
          </div>
        </div>

        <button type="submit" className="pay-button">
          Place Order
        </button>
      </form>
    </div>
  );
};

export default Payment;