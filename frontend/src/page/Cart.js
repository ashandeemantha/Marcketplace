import React from "react";
import { useSelector } from "react-redux";
import CartProduct from "../component/CartProduct";
import emptyCartImage from "../assest/empty.gif";
import { toast } from "react-hot-toast";
import { loadStripe } from '@stripe/stripe-js';
import { useNavigate } from "react-router-dom";
import { FaShoppingCart, FaArrowRight, FaLock, FaShieldAlt, FaTruck } from "react-icons/fa";

const Cart = () => {
  const productCartItem = useSelector((state) => state.product.cartItem);
  const user = useSelector(state => state.user);
  const navigate = useNavigate();

  const totalPrice = productCartItem.reduce(
    (acc, curr) => acc + parseInt(curr.total),
    0
  );
  const totalQty = productCartItem.reduce(
    (acc, curr) => acc + parseInt(curr.qty),
    0
  );

  const deliveryFee = totalPrice > 5000 ? 0 : 500; // Free delivery for orders over Rs. 5000
  const grandTotal = totalPrice + deliveryFee;

  const handlePayment = async () => {
    if (user.email) {
      const stripePromise = await loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);
      const res = await fetch(`${process.env.REACT_APP_SERVER_DOMIN}/create-checkout-session`, {
        method: "POST",
        headers: {
          "content-type": "application/json"
        },
        body: JSON.stringify({
          items: productCartItem,
          userId: user._id,
          deliveryFee
        })
      });
      
      if (res.statusCode === 500) return;

      const data = await res.json();
      console.log(data);

      toast("Redirecting to payment gateway...!");
      stripePromise.redirectToCheckout({ sessionId: data });
    } else {
      toast("Please login to proceed with payment!");
      setTimeout(() => {
        navigate("/login");
      }, 1000);
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
                  {totalPrice > 3000 && (
                    <div className="flex justify-between text-green-600">
                      <span>Delivery Discount</span>
                      <span>- Rs. 500</span>
                    </div>
                  )}
                </div>

                {/* Total */}
                <div className="flex justify-between text-lg font-bold py-4 border-t border-b mb-6">
                  <span>Total</span>
                  <span>Rs. {grandTotal.toLocaleString()}</span>
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
                  Proceed to Checkout
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