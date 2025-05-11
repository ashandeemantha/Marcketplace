import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import CartProduct from "../component/CartProduct";
import emptyCartImage from "../assest/empty.gif";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
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
  const user = useSelector(state => state.user);
  const navigate = useNavigate();

  // Payment and buyer details state
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

  // Calculate totals
  const totalPrice = productCartItem.reduce(
    (acc, curr) => acc + parseInt(curr.total),
    0
  );
  const totalQty = productCartItem.reduce(
    (acc, curr) => acc + parseInt(curr.qty),
    0
  );

  const deliveryFee = totalPrice > 5000 ? 0 : 500;
  const grandTotal = totalPrice + deliveryFee;

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBuyerDetails(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Load Google Maps script when needed
  useEffect(() => {
    if (buyerDetails.address && !window.google) {
      setMapStatus({ loaded: false, loading: true, error: null });
      
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places`;
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

  // Initialize map when conditions are met
  useEffect(() => {
    if (mapStatus.loaded && buyerDetails.address) {
      initMap();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
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
        setMapStatus(prev => ({
          ...prev,
          error: "Could not locate this address. Please check the details."
        }));
      }
    });
  };

  const handlePayment = async () => {
    if (!user.email) {
      toast("Please login to proceed with payment!");
      setTimeout(() => {
        navigate("/login");
      }, 1000);
      return;
    }

    // Validate buyer details
    if (!buyerDetails.phone || !buyerDetails.address) {
      toast.error("Please provide phone number and delivery address");
      return;
    }

    if (paymentMethod === "online") {
      navigate("/stripe-payment", { 
        state: { 
          items: productCartItem,
          userId: user._id,
          deliveryFee,
          totalAmount: grandTotal,
          buyerDetails
        } 
      });
    } else if (paymentMethod === "cod") {
      try {
        const response = await fetch(`${process.env.REACT_APP_SERVER_DOMIN}/create-order`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            items: productCartItem,
            userId: user._id,
            paymentMethod: "cod",
            totalAmount: grandTotal,
            deliveryFee,
            buyerDetails
          })
        });
        
        const data = await response.json();
        if (response.ok) {
          toast.success("Order placed successfully!");
          navigate("/order-success", { state: { orderId: data.orderId } });
        } else {
          throw new Error(data.message || "Failed to place order");
        }
      } catch (error) {
        toast.error(error.message);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center mb-8">
          <FaShoppingCart className="text-2xl text-green-600 mr-3" />
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
            Your Shopping Cart
          </h1>
          <span className="ml-auto bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
            {productCartItem.length} {productCartItem.length === 1 ? 'item' : 'items'}
          </span>
        </div>

        {productCartItem[0] ? (
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Cart Items */}
            <div className="lg:w-2/3">
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                {/* Table Header */}
                <div className="hidden md:grid grid-cols-12 bg-gray-100 p-4 border-b">
                  <div className="col-span-5 font-medium text-gray-600">Product</div>
                  <div className="col-span-2 font-medium text-gray-600 text-center">Price</div>
                  <div className="col-span-3 font-medium text-gray-600 text-center">Quantity</div>
                  <div className="col-span-2 font-medium text-gray-600 text-right">Total</div>
                </div>

                {/* Cart Products */}
                {productCartItem.map((el) => (
                  <CartProduct
                    key={el._id}
                    id={el._id}
                    name={el.name}
                    image={el.image}
                    category={el.category}
                    qty={el.qty}
                    total={el.total}
                    price={el.price}
                  />
                ))}
              </div>

              {/* Continue Shopping */}
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

            {/* Order Summary */}
            <div className="lg:w-1/3">
              <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
                <h2 className="text-xl font-bold text-gray-800 mb-6 pb-2 border-b">
                  Order Summary
                </h2>

                {/* Price Breakdown */}
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

                {/* Total */}
                <div className="flex justify-between text-lg font-bold py-4 border-t border-b mb-6">
                  <span>Total</span>
                  <span>Rs. {grandTotal.toLocaleString()}</span>
                </div>

                {/* Buyer Details Section */}
                <div className="mb-6">
                  <h3 className="text-md font-semibold mb-3">Contact & Delivery Information</h3>
                  
                  {/* Name */}
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      <FaUser className="inline mr-2" />
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={buyerDetails.name}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                      placeholder="Your full name"
                      required
                    />
                  </div>

                  {/* Email */}
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      <FaEnvelope className="inline mr-2" />
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={buyerDetails.email}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                      placeholder="your@email.com"
                      required
                    />
                  </div>
                  
                  {/* Phone Number */}
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      <FaPhone className="inline mr-2" />
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={buyerDetails.phone}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                      placeholder="Enter your phone number"
                      required
                    />
                  </div>
                  
                  {/* Address */}
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      <FaMapMarkerAlt className="inline mr-2" />
                      Delivery Address
                    </label>
                    <textarea
                      name="address"
                      value={buyerDetails.address}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                      rows="3"
                      placeholder="Enter your full delivery address"
                      required
                    />
                  </div>
                  
                  {/* Map Preview */}
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
                          <div className="text-red-500 text-sm p-2 text-center">
                            {mapStatus.error}
                          </div>
                        ) : null}
                      </div>
                      <p className="text-xs text-gray-500 mt-1">
                        Map showing approximate delivery location
                      </p>
                    </div>
                  )}
                </div>

                {/* Payment Method Selection */}
                <div className="mb-6">
                  <h3 className="text-md font-semibold mb-2">Select Payment Method</h3>
                  <div className="flex flex-col space-y-2">
                    {/* Online Payment Option */}
                    <label className="inline-flex items-center p-2 rounded hover:bg-gray-50">
                      <input
                        type="radio"
                        className="form-radio h-4 w-4 text-green-600"
                        name="paymentMethod"
                        value="online"
                        checked={paymentMethod === "online"}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                      />
                      <div className="ml-3 flex items-center">
                        <SiStripe className="text-blue-500 text-xl mr-2" />
                        <span>Online Payment</span>
                      </div>
                    </label>

                    {/* Cash on Delivery Option */}
                    <label className="inline-flex items-center p-2 rounded hover:bg-gray-50">
                      <input
                        type="radio"
                        className="form-radio h-4 w-4 text-green-600"
                        name="paymentMethod"
                        value="cod"
                        checked={paymentMethod === "cod"}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                      />
                      <div className="ml-3 flex items-center">
                        <FaMoneyBillWave className="text-green-500 text-xl mr-2" />
                        <span>Cash on Delivery</span>
                      </div>
                    </label>
                  </div>
                </div>

                {/* Security Info */}
                <div className="flex items-center text-sm text-gray-500 mb-6">
                  <FaLock className="mr-2" />
                  <span>Secure SSL encrypted payment</span>
                </div>

                {/* Checkout Button */}
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

                {/* Trust Badges */}
                <div className="mt-6 flex flex-wrap justify-center gap-4">
                  <div className="flex items-center text-xs text-gray-500">
                    <FaShieldAlt className="mr-1 text-green-500" />
                    Quality Guarantee
                  </div>
                  <div className="flex items-center text-xs text-gray-500">
                    <FaTruck className="mr-1 text-green-500" />
                    Islandwide Delivery
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Empty Cart */
          <div className="flex flex-col items-center justify-center py-12">
            <img 
              src={emptyCartImage} 
              className="w-full max-w-xs md:max-w-sm" 
              alt="Empty cart"
            />
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
        )}
      </div>
    </div>
  );
};

export default Cart;