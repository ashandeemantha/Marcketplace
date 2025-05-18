/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CartProduct from "../component/CartProduct";
import emptyCartImage from "../assest/empty.gif";
import { toast } from "react-hot-toast";

import {
  FaShoppingCart,
  FaArrowRight,
  FaLock,
  FaShieldAlt,
  FaTruck,
  FaCreditCard,
  FaMoneyBillWave,
  FaMapMarkerAlt,
  FaPhone,
  FaSpinner,
  FaUser,
  FaEnvelope
} from "react-icons/fa";
import { SiStripe } from "react-icons/si";

const Cart = () => {
  const productCartItem = useSelector((state) => state.product.cartItem);
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();

  const [paymentMethod, setPaymentMethod] = useState("online");
  const [buyerDetails, setBuyerDetails] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    address: user?.address || ""
  });

  const [mapStatus, setMapStatus] = useState({
    loaded: false,
    loading: false,
    error: null
  });

  const totalPrice = productCartItem.reduce((acc, curr) => acc + parseInt(curr.total), 0);
  const totalQty = productCartItem.reduce((acc, curr) => acc + parseInt(curr.qty), 0);
  const deliveryFee = totalPrice > 5000 ? 0 : 500;
  const grandTotal = totalPrice + deliveryFee;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBuyerDetails((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  useEffect(() => {
    if (buyerDetails.address && !window.google) {
      setMapStatus({ loaded: false, loading: true, error: null });

      const script = document.createElement("script");
     script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}&libraries=places&callback=initMap`;

      script.async = true;
      script.onload = () => {
        setMapStatus({ loaded: true, loading: false, error: null });
      };
      script.onerror = () => {
        setMapStatus({ loaded: false, loading: false, error: "Failed to load Google Maps" });
      };
      document.head.appendChild(script);

      return () => {
        document.head.removeChild(script);
      };
    } else if (window.google) {
      setMapStatus({ loaded: true, loading: false, error: null });
    }
  }, [buyerDetails.address]);

  useEffect(() => {
    if (mapStatus.loaded && buyerDetails.address) {
      initMap();
    }
  }, [mapStatus.loaded, buyerDetails.address]);

  const initMap = () => {
    const mapElement = document.getElementById("delivery-map");
    if (!mapElement || !window.google) return;

    const geocoder = new window.google.maps.Geocoder();

    geocoder.geocode({ address: buyerDetails.address }, (results, status) => {
      if (status === "OK" && results[0]) {
        new window.google.maps.Map(mapElement, {
          center: results[0].geometry.location,
          zoom: 15,
          disableDefaultUI: true,
          zoomControl: true
        });
      } else {
        setMapStatus((prev) => ({
          ...prev,
          error: "Could not locate this address. Please check the details."
        }));
      }
    });
  };

  const handlePayment = async () => {
    if (!user.email) {
      toast("Please login to proceed with payment!");
      setTimeout(() => navigate("/login"), 1000);
      return;
    }

    if (!buyerDetails.phone || !buyerDetails.address) {
      toast.error("Please provide phone number and delivery address");
      return;
    }

    const orderData = {
      items: productCartItem,
      userId: user._id,
      deliveryFee,
      totalAmount: grandTotal,
      buyerDetails,
      subtotal: totalPrice
    };

    if (paymentMethod === "online") {
      navigate("/stripe-payment", { state: orderData });
    } else if (paymentMethod === "cod") {
      try {
        const response = await fetch(`${process.env.REACT_APP_SERVER_DOMIN}/create-order`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...orderData, paymentMethod: "cod" })
        });

        const data = await response.json();
        if (response.ok) {
          navigate("/success", {
            state: { orderDetails: { ...data, status: "Pending" } }
          });
        } else {
          throw new Error(data.message || "Failed to place order");
        }
      } catch (error) {
        toast.error(error.message);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-200 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center mb-8">
          <FaShoppingCart className="text-2xl text-green-600 mr-3" />
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Your Shopping Cart</h1>
          <span className="ml-auto bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
            {productCartItem.length} {productCartItem.length === 1 ? "item" : "items"}
          </span>
        </div>

        {productCartItem.length > 0 ? (
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Left: Cart Items */}
            <div className="lg:w-2/3">
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="hidden md:grid grid-cols-12 bg-gray-100 p-4 border-b">
                  <div className="col-span-5 font-medium text-gray-600">Product</div>
                  <div className="col-span-2 font-medium text-gray-600 text-center">Price</div>
                  <div className="col-span-3 font-medium text-gray-600 text-center">Quantity</div>
                  <div className="col-span-2 font-medium text-gray-600 text-right">Total</div>
                </div>
                {productCartItem.map((el) => (
                  <CartProduct key={el._id} {...el} />
                ))}
              </div>
              <div className="mt-4">
                <button
                  onClick={() => navigate("/")}
                  className="flex items-center text-green-600 hover:text-green-800"
                >
                  <FaArrowRight className="transform rotate-180 mr-2" />
                  Continue Shopping
                </button>
              </div>
            </div>

            {/* Right: Summary */}
            <div className="lg:w-1/3">
              <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
                <h2 className="text-xl font-bold text-gray-800 mb-6 pb-2 border-b">
                  Order Summary
                </h2>
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal ({totalQty} items)</span>
                    <span className="font-medium">Rs. {totalPrice.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Delivery</span>
                    <span className="font-medium">
                      {deliveryFee === 0 ? (
                        <span className="text-green-600">FREE</span>
                      ) : (
                        `Rs. ${deliveryFee}`
                      )}
                    </span>
                  </div>
                </div>
                <div className="flex justify-between text-lg font-bold py-4 border-t border-b mb-6">
                  <span>Total</span>
                  <span>Rs. {grandTotal.toLocaleString()}</span>
                </div>

                {/* Buyer Info */}
                <div className="mb-6">
                  <h3 className="text-md font-semibold mb-3">Contact & Delivery Information</h3>
                  <Input label="Full Name" icon={<FaUser />} name="name" value={buyerDetails.name} onChange={handleInputChange} />
                  <Input label="Email" type="email" icon={<FaEnvelope />} name="email" value={buyerDetails.email} onChange={handleInputChange} />
                  <Input label="Phone Number" type="tel" icon={<FaPhone />} name="phone" value={buyerDetails.phone} onChange={handleInputChange} />
                  <Textarea label="Delivery Address" icon={<FaMapMarkerAlt />} name="address" value={buyerDetails.address} onChange={handleInputChange} />

                  {buyerDetails.address && (
                    <div className="mt-4">
                      <div
                        id="delivery-map"
                        style={{
                          height: "200px",
                          width: "100%",
                          borderRadius: "8px",
                          backgroundColor: "#f0f0f0",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center"
                        }}
                      >
                        {mapStatus.loading ? (
                          <div className="flex items-center text-gray-500">
                            <FaSpinner className="animate-spin mr-2" />
                            Loading map...
                          </div>
                        ) : mapStatus.error ? (
                          <div className="text-red-500 text-sm text-center">{mapStatus.error}</div>
                        ) : null}
                      </div>
                      <p className="text-xs text-gray-500 mt-1">
                        Map showing approximate delivery location
                      </p>
                    </div>
                  )}
                </div>

                {/* Payment Method */}
                <div className="mb-6">
                  <h3 className="text-md font-semibold mb-2">Select Payment Method</h3>
                  <PaymentOption
                    icon={<SiStripe className="text-blue-500 text-xl mr-2" />}
                    label="Online Payment"
                    value="online"
                    checked={paymentMethod === "online"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                  <PaymentOption
                    icon={<FaMoneyBillWave className="text-green-500 text-xl mr-2" />}
                    label="Cash on Delivery"
                    value="cod"
                    checked={paymentMethod === "cod"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                </div>

                <div className="flex items-center text-sm text-gray-500 mb-6">
                  <FaLock className="mr-2" />
                  <span>Secure SSL encrypted payment</span>
                </div>

                <button
                  onClick={handlePayment}
                  className="w-full bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-lg font-medium transition-colors flex items-center justify-center"
                >
                  {paymentMethod === "online" ? (
                    <>
                      <FaCreditCard className="mr-2" />
                      Proceed to Payment
                    </>
                  ) : (
                    "Place Order (COD)"
                  )}
                </button>

                <div className="mt-6 flex flex-wrap justify-center gap-4">
                  <Badge icon={<FaShieldAlt />} text="Quality Guarantee" />
                  <Badge icon={<FaTruck />} text="Islandwide Delivery" />
                </div>
              </div>
            </div>
          </div>
        ) : (
          <EmptyCart navigate={navigate} />
        )}
      </div>
    </div>
  );
};

// Helper Components
const Input = ({ label, icon, ...props }) => (
  <div className="mb-4">
    <label className="block text-sm font-medium text-gray-700 mb-1 items-center gap-2">
      {icon} {label}
    </label>
    <input
      {...props}
      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
    />
  </div>
);

const Textarea = ({ label, icon, ...props }) => (
  <div className="mb-4">
    <label className="block text-sm font-medium text-gray-700 mb-1 items-center gap-2">
      {icon} {label}
    </label>
    <textarea
      {...props}
      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
      rows="3"
    />
  </div>
);

const PaymentOption = ({ icon, label, value, checked, onChange }) => (
  <label className="inline-flex items-center p-2 rounded hover:bg-gray-50 w-full cursor-pointer">
    <input
      type="radio"
      className="form-radio h-4 w-4 text-green-600"
      name="paymentMethod"
      value={value}
      checked={checked}
      onChange={onChange}
    />
    <div className="ml-3 flex items-center">{icon}<span>{label}</span></div>
  </label>
);

const Badge = ({ icon, text }) => (
  <div className="flex items-center text-xs text-gray-500 gap-1">
    {icon}
    {text}
  </div>
);

const EmptyCart = ({ navigate }) => (
  <div className="flex flex-col items-center justify-center py-12">
    <img src={emptyCartImage} className="w-full max-w-xs md:max-w-sm" alt="Empty cart" />
    <h2 className="text-2xl font-bold text-gray-700 mt-6">Your cart is empty</h2>
    <p className="text-gray-500 mt-2 mb-8 max-w-md text-center">
      Looks like you haven't added any products to your cart yet. Start shopping to find amazing deals!
    </p>
    <button
      onClick={() => navigate("/")}
      className="bg-green-600 hover:bg-green-700 text-white py-2 px-6 rounded-lg font-medium transition-colors"
    >
      Browse Products
    </button>
  </div>
);

export default Cart;
