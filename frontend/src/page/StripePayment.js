/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import {
  useStripe,
  useElements,
  Elements,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement
} from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import {
  FaCreditCard,
  FaUser,
  FaLock,
  FaCheck,
  FaExclamationCircle,
  FaSpinner,
  FaRegCreditCard,
  FaShieldAlt,
  FaStore,
  FaTruck,
  FaArrowLeft
} from 'react-icons/fa';
import { SiStripe, SiPaypal } from 'react-icons/si';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);

const PaymentIcons = () => null;

const StripePaymentForm = ({ orderDetails }) => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const [processing, setProcessing] = useState(false);
  const [paymentError, setPaymentError] = useState(null);
  const [cardDetails, setCardDetails] = useState({
    name: '',
    email: '',
    phone: ''
  });
  const [fieldStatus, setFieldStatus] = useState({
    cardNumber: { complete: false, error: null },
    cardExpiry: { complete: false, error: null },
    cardCvc: { complete: false, error: null }
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCardDetails(prev => ({ ...prev, [name]: value }));
  };

  const handleCardElementChange = (elementType) => (event) => {
    setFieldStatus(prev => ({
      ...prev,
      [elementType]: {
        complete: event.complete,
        error: event.error ? event.error.message : null
      }
    }));
  };

  const allFieldsValid = () => {
    return (
      fieldStatus.cardNumber.complete &&
      fieldStatus.cardExpiry.complete &&
      fieldStatus.cardCvc.complete &&
      cardDetails.name &&
      cardDetails.email
    );
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      toast.error('Payment system is not ready');
      return;
    }

    setProcessing(true);
    setPaymentError(null);

    try {
      // Create payment method with all card details
      const { error: paymentMethodError, paymentMethod } = await stripe.createPaymentMethod({
        type: 'card',
        card: elements.getElement(CardNumberElement),
        billing_details: {
          name: cardDetails.name,
          email: cardDetails.email,
          phone: cardDetails.phone,
        },
      });

      if (paymentMethodError) throw paymentMethodError;

      // Create payment intent on backend
      const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/create-payment-intent`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          amount: orderDetails.totalAmount * 100,
          currency: 'usd',
          paymentMethodId: paymentMethod.id,
          orderId: orderDetails.orderId,
          customerDetails: cardDetails
        }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Payment failed');

      // Confirm card payment
      const { error: confirmError, paymentIntent } = await stripe.confirmCardPayment(
        data.clientSecret,
        {
          payment_method: paymentMethod.id,
          receipt_email: cardDetails.email,
        }
      );

      if (confirmError) throw confirmError;

      // Handle successful payment
      if (paymentIntent.status === 'succeeded') {
        toast.success('Payment successful!');
        navigate('/order-confirmation', {
          state: {
            orderId: orderDetails.orderId,
            amount: paymentIntent.amount / 100,
            paymentMethod: 'card',
            customerName: cardDetails.name,
            customerEmail: cardDetails.email
          }
        });
      }
    } catch (error) {
      console.error('Payment error:', error);
      setPaymentError(error.message);
      toast.error(error.message || 'Payment failed');
    } finally {
      setProcessing(false);
    }
  };

  const cardElementOptions = {
    style: {
      base: {
        fontSize: '16px',
        color: '#374151',
        fontFamily: '"Inter", sans-serif',
        '::placeholder': {
          color: '#9CA3AF',
        },
        iconColor: '#6366F1',
      },
      invalid: {
        color: '#EF4444',
        iconColor: '#EF4444',
      },
    },
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex justify-center space-x-3 mb-4">
        <img src="https://upload.wikimedia.org/wikipedia/commons/4/41/Visa_Logo.png" className="h-8" alt="Visa" />
        <img src="https://upload.wikimedia.org/wikipedia/commons/0/04/Mastercard-logo.png" className="h-8" alt="Mastercard" />
      </div>
      
      <div className="bg-gradient-to-r from-gray-50 to-white rounded-xl p-6 shadow-md border border-gray-100">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-semibold text-gray-800 flex items-center">
            <FaRegCreditCard className="mr-2 text-blue-500" />
            Card Details
          </h3>
          <div className="flex items-center bg-purple-50 px-2 py-1 rounded">
            <SiStripe className="text-purple-500 mr-1 text-lg" />
            <span className="text-xs text-purple-600 font-medium">Secure Payment</span>
          </div>
        </div>

        {/* Card Number Field */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Card Number
          </label>
          <div className={`relative border rounded-lg p-3 ${fieldStatus.cardNumber.error ? 'border-red-300 bg-red-50' : 'border-gray-200'}`}>
            <CardNumberElement
              options={cardElementOptions}
              onChange={handleCardElementChange('cardNumber')}
              className="w-full"
            />
            <div className="absolute right-3 top-3 text-gray-400">
              {fieldStatus.cardNumber.complete && (
                <FaCheck className="text-blue-500" />
              )}
            </div>
          </div>
          {fieldStatus.cardNumber.error && (
            <p className="mt-1 text-sm text-red-600">{fieldStatus.cardNumber.error}</p>
          )}
        </div>

        {/* Expiration and CVC Fields */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Expiration Date
            </label>
            <div className={`border rounded-lg p-3 ${fieldStatus.cardExpiry.error ? 'border-red-300 bg-red-50' : 'border-gray-200'}`}>
              <CardExpiryElement
                options={cardElementOptions}
                onChange={handleCardElementChange('cardExpiry')}
                className="w-full"
              />
              {fieldStatus.cardExpiry.complete && (
                <FaCheck className="text-blue-500 float-right" />
              )}
            </div>
            {fieldStatus.cardExpiry.error && (
              <p className="mt-1 text-sm text-red-600">{fieldStatus.cardExpiry.error}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              CVC
            </label>
            <div className={`border rounded-lg p-3 ${fieldStatus.cardCvc.error ? 'border-red-300 bg-red-50' : 'border-gray-200'}`}>
              <CardCvcElement
                options={cardElementOptions}
                onChange={handleCardElementChange('cardCvc')}
                className="w-full"
              />
              {fieldStatus.cardCvc.complete && (
                <FaCheck className="text-blue-500 float-right" />
              )}
            </div>
            {fieldStatus.cardCvc.error && (
              <p className="mt-1 text-sm text-red-600">{fieldStatus.cardCvc.error}</p>
            )}
          </div>
        </div>

        {/* Name and Email Fields */}
        <div className="grid grid-cols-1 gap-4">
          <div>
            <label htmlFor="card-name" className="block text-sm font-medium text-gray-700 mb-1">
              Name on Card
            </label>
            <input
              type="text"
              id="card-name"
              name="name"
              value={cardDetails.name}
              onChange={handleInputChange}
              className="block w-full border border-gray-200 rounded-lg py-2.5 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="John Smith"
              required
            />
          </div>
          <div>
            <label htmlFor="card-email" className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              id="card-email"
              name="email"
              value={cardDetails.email}
              onChange={handleInputChange}
              className="block w-full border border-gray-200 rounded-lg py-2.5 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="john@example.com"
              required
            />
          </div>
        </div>
      </div>

      {paymentError && (
        <div className="flex items-start text-red-600 text-sm p-3 bg-red-50 rounded-lg border border-red-100">
          <FaExclamationCircle className="mt-0.5 mr-2 flex-shrink-0 text-red-500" />
          <span>{paymentError}</span>
        </div>
      )}

      <div className="flex items-center mb-4 p-3 bg-blue-50 rounded-lg">
        <input
          id="save-card"
          type="checkbox"
          className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
        />
        <label htmlFor="save-card" className="ml-3 block text-sm text-gray-700">
          Save card for faster checkout next time
        </label>
      </div>

      <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 mb-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-gray-600">Subtotal</span>
          <span className="font-medium">RS.{orderDetails.subtotal?.toFixed(2) || '0.00'}</span>
        </div>
        <div className="flex justify-between items-center mb-2">
          <span className="text-gray-600">Shipping</span>
          <span className="font-medium">RS.{orderDetails.shipping?.toFixed(2) || '0.00'}</span>
        </div>
        <div className="flex justify-between items-center pt-3 border-t border-gray-200">
          <span className="text-lg font-bold">Total</span>
          <span className="text-lg font-bold text-blue-600">RS.{orderDetails.totalAmount.toFixed(2)}</span>
        </div>
      </div>
        
      <button
        type="submit"
        disabled={!stripe || processing || !allFieldsValid()}
        className={`w-full flex justify-center items-center py-3.5 px-4 border border-transparent rounded-xl shadow-sm text-base font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors ${
          !stripe || processing || !allFieldsValid()
            ? 'bg-gray-400 cursor-not-allowed'
            : 'bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 focus:ring-blue-500'
        }`}
      >
        {processing ? (
          <>
            <FaSpinner className="animate-spin mr-2" />
            Processing Payment...
          </>
        ) : (
          <>
            <FaCreditCard className="mr-2" />
            Pay with Card RS.{orderDetails.totalAmount.toFixed(2)}
          </>
        )}
      </button>

      <div className="flex items-center justify-center text-xs text-gray-500 mt-4">
        <FaShieldAlt className="mr-2 text-blue-500" />
        <span>Your payment is secured with 256-bit SSL encryption</span>
      </div>
    </form>
  );
};

const PayPalPaymentForm = ({ orderDetails }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [billingAddress, setBillingAddress] = useState('');
  const [processing, setProcessing] = useState(false);
  const [paymentError, setPaymentError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setProcessing(true);
    setPaymentError(null);

    try {
      // Simulate PayPal payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // In a real app, you would integrate with PayPal API here
      toast.success('PayPal payment successful!');
      navigate('/order-confirmation', {
        state: {
          orderId: orderDetails.orderId,
          amount: orderDetails.totalAmount,
          paymentMethod: 'paypal',
          customerEmail: email,
          paypalPassword: password,
          billingAddress: billingAddress,
        }
      });
    } catch (error) {
      console.error('PayPal payment error:', error);
      setPaymentError(error.message || 'PayPal payment failed');
      toast.error(error.message || 'PayPal payment failed');
    } finally {
      setProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex justify-center space-x-3 mb-4">
        <img src="https://www.paypalobjects.com/webstatic/icon/pp258.png" className="h-8" alt="PayPal" />
      </div>
      
      <div className="bg-gradient-to-r from-gray-50 to-white rounded-xl p-6 shadow-md border border-gray-100">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-semibold text-gray-800 flex items-center">
            <SiPaypal className="mr-2 text-blue-500 text-xl" />
            PayPal Details
          </h3>
          <div className="flex items-center bg-blue-50 px-2 py-1 rounded">
            <FaShieldAlt className="text-blue-500 mr-1" />
            <span className="text-xs text-blue-600 font-medium">Secure Payment</span>
          </div>
        </div>

        <div className="mb-6">
          <div className="flex items-center justify-center mb-4">
            <SiPaypal className="text-4xl text-blue-600 mr-2" />
            <span className="text-xl font-bold text-blue-600">PayPal</span>
          </div>
          <p className="text-sm text-gray-600 text-center mb-6">
            Pay securely with your PayPal account. You'll be redirected to PayPal to complete your payment.
          </p>
        </div>

        <div className="space-y-4">
          <div>
            <label htmlFor="paypal-email" className="block text-sm font-medium text-gray-700 mb-1">
              PayPal Email
            </label>
            <input
              type="email"
              id="paypal-email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="block w-full border border-gray-200 rounded-lg py-2.5 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="your@paypal.email"
              required
            />
          </div>
          <div>
            <label htmlFor="paypal-password" className="block text-sm font-medium text-gray-700 mb-1">
              PayPal Password
            </label>
            <input
              type="password"
              id="paypal-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="block w-full border border-gray-200 rounded-lg py-2.5 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Enter your PayPal password"
              required
            />
          </div>
          <div>
            <label htmlFor="billing-address" className="block text-sm font-medium text-gray-700 mb-1">
              Billing Address
            </label>
            <textarea
              id="billing-address"
              value={billingAddress}
              onChange={(e) => setBillingAddress(e.target.value)}
              className="block w-full border border-gray-200 rounded-lg py-2.5 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Enter your billing address"
              rows={3}
              required
            />
          </div>
        </div>
      </div>

      {paymentError && (
        <div className="flex items-start text-red-600 text-sm p-3 bg-red-50 rounded-lg border border-red-100">
          <FaExclamationCircle className="mt-0.5 mr-2 flex-shrink-0 text-red-500" />
          <span>{paymentError}</span>
        </div>
      )}

      <button
        type="submit"
        disabled={!email || !password || !billingAddress || processing}
        className={`w-full flex justify-center items-center py-3.5 px-4 border border-transparent rounded-xl shadow-sm text-base font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors ${
          !email || !password || !billingAddress || processing
            ? 'bg-gray-400 cursor-not-allowed'
            : 'bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 focus:ring-blue-500'
        }`}
      >
        {processing ? (
          <>
            <FaSpinner className="animate-spin mr-2" />
            Redirecting to PayPal...
          </>
        ) : (
          <>
            <SiPaypal className="mr-2 text-xl" />
            Pay with PayPal RS.{orderDetails.totalAmount.toFixed(2)}
          </>
        )}
      </button>

      <div className="flex items-center justify-center text-xs text-gray-500 mt-4">
        <FaShieldAlt className="mr-2 text-blue-500" />
        <span>Your payment is secured with PayPal's protection</span>
      </div>
    </form>
  );
};

const PaymentMethodSelector = ({ selectedMethod, onSelect }) => {
  return (
    <div className="mb-6 flex justify-center space-x-6">
      <button
        type="button"
        className={`flex items-center space-x-2 px-4 py-2 rounded-lg border transition-colors ${
          selectedMethod === 'card' 
            ? 'border-blue-600 bg-blue-50 text-blue-700 shadow-sm' 
            : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
        } focus:outline-none focus:ring-2 focus:ring-blue-500`}
        onClick={() => onSelect('card')}
      >
        <FaRegCreditCard className="text-blue-600 text-lg" />
        <span className="font-medium">Credit Card</span>
        {selectedMethod === 'card' && <FaCheck className="text-blue-500 ml-1" />}
      </button>
      <button
        type="button"
        className={`flex items-center space-x-2 px-4 py-2 rounded-lg border transition-colors ${
          selectedMethod === 'paypal' 
            ? 'border-blue-600 bg-blue-50 text-blue-700 shadow-sm' 
            : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
        } focus:outline-none focus:ring-2 focus:ring-blue-500`}
        onClick={() => onSelect('paypal')}
      >
        <SiPaypal className="text-blue-600 text-lg" />
        <span className="font-medium">PayPal</span>
        {selectedMethod === 'paypal' && <FaCheck className="text-blue-500 ml-1" />}
      </button>
    </div>
  );
};

const StripePaymentWrapper = () => {
  const [selectedMethod, setSelectedMethod] = React.useState('card');
  const location = useLocation();
  const orderDetails = location.state || { subtotal: 0, shipping: 0, totalAmount: 0, orderId: null };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-xl shadow-md">
      <PaymentMethodSelector selectedMethod={selectedMethod} onSelect={setSelectedMethod} />
      {selectedMethod === 'card' ? (
        <Elements stripe={stripePromise}>
          <StripePaymentForm orderDetails={orderDetails} />
        </Elements>
      ) : (
        <PayPalPaymentForm orderDetails={orderDetails} />
      )}
    </div>
  );
};

export default StripePaymentWrapper;