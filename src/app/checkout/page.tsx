"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/context/authContext';
import MainLayout from '@/components/MainLayout';
import { AlertTriangle, CheckCircle, CreditCard, ArrowLeft } from 'lucide-react';

// Dummy order data
const dummyOrderData = {
  items: [
    {
      id: '1',
      bookId: '1',
      book: {
        title: 'The Creative Mind',
        author: 'Jane Williams',
        coverImage: 'https://via.placeholder.com/300x450/3b82f6/ffffff?text=Book+Cover',
        price: 12.99,
        discountPrice: 9.99,
      }
    },
    {
      id: '2',
      bookId: '2',
      book: {
        title: 'Business Strategy',
        author: 'Michael Johnson',
        coverImage: 'https://via.placeholder.com/300x450/4f46e5/ffffff?text=Book+Cover',
        price: 15.99,
      }
    }
  ],
  subtotal: 25.98,
  discount: 3.00,
  total: 22.98,
  coupon: { code: 'DISCOUNT20', description: '20% off your order' }
};

export default function Checkout() {
  const router = useRouter();
  const { isAuthenticated, isCustomer, userEmail } = useAuth();
  const [orderData, setOrderData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [paymentStatus, setPaymentStatus] = useState(null); // 'processing', 'success', 'failed'
  const [orderId, setOrderId] = useState(null);

  // Form state
  const [formData, setFormData] = useState({
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: ''
  });
  const [formErrors, setFormErrors] = useState({});

  // Get cart details on load
  useEffect(() => {
    if (!isAuthenticated) {
      setIsLoading(false);
      return;
    }

    // In a real app, fetch latest cart data from API
    // Using dummy data for now
    setOrderData(dummyOrderData);
    setIsLoading(false);
  }, [isAuthenticated]);

  // Redirect if not authenticated or not a customer
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/auth/login?redirect=/checkout');
    } else if (!isLoading && !isCustomer) {
      router.push('/');
    }
  }, [isLoading, isAuthenticated, isCustomer, router]);

  // Handle form input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    
    let formattedValue = value;
    
    // Format card number with spaces
    if (name === 'cardNumber') {
      formattedValue = value.replace(/\s/g, '').replace(/(.{4})/g, '$1 ').trim().substring(0, 19);
    }
    
    // Format expiry date with slash
    if (name === 'expiryDate') {
      formattedValue = value
        .replace(/\//g, '')
        .replace(/(.{2})/, '$1/')
        .substring(0, 5);
    }
    
    setFormData({ ...formData, [name]: formattedValue });
    
    // Clear error when field is edited
    if (formErrors[name]) {
      setFormErrors({ ...formErrors, [name]: null });
    }
  };

  // Validate form
  const validateForm = () => {
    const errors = {};
    
    // Card number validation (16 digits, spaces allowed for formatting)
    if (!formData.cardNumber.replace(/\s/g, '').match(/^\d{16}$/)) {
      errors.cardNumber = 'Please enter a valid 16-digit card number';
    }
    
    // Card name validation
    if (!formData.cardName.trim()) {
      errors.cardName = 'Please enter the name on card';
    }
    
    // Expiry date validation (MM/YY format)
    if (!formData.expiryDate.match(/^(0[1-9]|1[0-2])\/\d{2}$/)) {
      errors.expiryDate = 'Please enter a valid expiry date (MM/YY)';
    } else {
      // Check if card is expired
      const [month, year] = formData.expiryDate.split('/');
      const expiryDate = new Date(2000 + parseInt(year), parseInt(month) - 1);
      if (expiryDate < new Date()) {
        errors.expiryDate = 'Card has expired';
      }
    }
    
    // CVV validation (3 or 4 digits)
    if (!formData.cvv.match(/^\d{3,4}$/)) {
      errors.cvv = 'Please enter a valid CVV (3 or 4 digits)';
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setPaymentStatus('processing');
    
    try {
      // In a real app, integrate with Razorpay or payment gateway here
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Simulate successful payment
      setPaymentStatus('success');
      setOrderId('ORD-' + Math.floor(1000000 + Math.random() * 9000000));
      
      // Redirect to success page after 2 seconds
      setTimeout(() => {
        router.push(`/order-success?orderId=${orderId}`);
      }, 2000);
      
    } catch (err) {
      console.error('Payment error:', err);
      setPaymentStatus('failed');
      setError('Payment failed. Please try again.');
    }
  };

  if (isLoading) {
    return (
      <MainLayout>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        </div>
      </MainLayout>
    );
  }

  if (!isAuthenticated || !isCustomer) {
    // Will redirect in useEffect, just showing loading for now
    return (
      <MainLayout>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        </div>
      </MainLayout>
    );
  }

  if (!orderData || orderData.items.length === 0) {
    return (
      <MainLayout>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Your cart is empty</h1>
            <p className="text-gray-600 mb-8">You need to add items to your cart before checkout.</p>
            <Link
              href="/books"
              className="inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
            >
              Browse Books
            </Link>
          </div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <Link href="/cart" className="text-blue-600 hover:text-blue-800 flex items-center">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Cart
          </Link>
        </div>

        <h1 className="text-3xl font-bold text-gray-900 mb-8">Checkout</h1>

        {error && (
          <div className="mb-6 bg-red-50 p-4 rounded-md">
            <div className="flex">
              <div className="flex-shrink-0">
                <AlertTriangle className="h-5 w-5 text-red-400" />
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-red-800">{error}</p>
              </div>
            </div>
          </div>
        )}

        <div className="lg:grid lg:grid-cols-12 lg:gap-8">
          {/* Order Summary */}
          <div className="lg:col-span-5 xl:col-span-4">
            <div className="bg-gray-50 rounded-lg shadow-sm p-6 mb-6">
              <h2 className="text-lg font-medium text-gray-900 mb-6">Order Summary</h2>
              
              <div className="space-y-4 mb-6">
                {orderData.items.map((item) => (
                  <div key={item.id} className="flex">
                    <div className="flex-shrink-0">
                      <img
                        src={item.book.coverImage}
                        alt={item.book.title}
                        className="w-16 h-20 object-cover rounded-md"
                      />
                    </div>
                    <div className="ml-4 flex-1">
                      <h3 className="text-sm font-medium text-gray-900">{item.book.title}</h3>
                      <p className="text-xs text-gray-500">by {item.book.author}</p>
                      <div className="mt-1">
                        {item.book.discountPrice ? (
                          <div className="flex items-center">
                            <span className="text-sm font-medium text-blue-600">
                              ${item.book.discountPrice.toFixed(2)}
                            </span>
                            <span className="ml-2 text-xs text-gray-500 line-through">
                              ${item.book.price.toFixed(2)}
                            </span>
                          </div>
                        ) : (
                          <span className="text-sm font-medium text-gray-700">
                            ${item.book.price.toFixed(2)}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="border-t border-gray-200 pt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <p className="text-gray-600">Subtotal</p>
                  <p className="font-medium">${orderData.subtotal.toFixed(2)}</p>
                </div>
                
                {orderData.discount > 0 && (
                  <div className="flex justify-between text-sm text-green-600">
                    <div>
                      <p>Discount</p>
                      {orderData.coupon && (
                        <p className="text-xs mt-0.5">{orderData.coupon.description}</p>
                      )}
                    </div>
                    <p className="font-medium">-${orderData.discount.toFixed(2)}</p>
                  </div>
                )}
                
                <div className="pt-2 flex justify-between">
                  <p className="font-medium text-gray-900">Total</p>
                  <p className="text-lg font-bold text-blue-600">${orderData.total.toFixed(2)}</p>
                </div>
              </div>
            </div>

            {/* Order Details */}
            <div className="bg-gray-50 rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-2">Order Details</h2>
              
              <div className="space-y-3 text-sm">
                <div>
                  <p className="text-gray-600">Email</p>
                  <p className="font-medium">{userEmail}</p>
                </div>
                
                <div>
                  <p className="text-gray-600">Payment Method</p>
                  <p className="font-medium">Credit Card</p>
                </div>
                
                <div>
                  <p className="text-gray-600">Delivery</p>
                  <p className="font-medium">Digital Download (Instant)</p>
                </div>
              </div>
            </div>
          </div>

          {/* Payment Form */}
          <div className="lg:col-span-7 xl:col-span-8 mt-8 lg:mt-0">
            {paymentStatus === 'success' ? (
              <div className="bg-white rounded-lg shadow-sm p-8 text-center">
                <div className="mx-auto flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-6">
                  <CheckCircle className="h-10 w-10 text-green-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Payment Successful!</h2>
                <p className="text-gray-600 mb-6">
                  Your order has been confirmed and your books are ready for download.
                </p>
                <p className="text-gray-800 font-medium mb-8">
                  Order ID: <span className="text-blue-600">{orderId}</span>
                </p>
                <Link
                  href="/my-account/library"
                  className="inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-blue-600 hover:bg-blue-700"
                >
                  Go to Your Library
                </Link>
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="px-6 py-5 border-b border-gray-200 bg-gray-50">
                  <h2 className="text-lg font-medium text-gray-900 flex items-center">
                    <CreditCard className="mr-2 h-5 w-5 text-gray-500" />
                    Payment Information
                  </h2>
                </div>
                <div className="p-6">
                  <form onSubmit={handleSubmit}>
                    <div className="space-y-6">
                      {/* Card Number */}
                      <div>
                        <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700 mb-1">
                          Card Number
                        </label>
                        <input
                          type="text"
                          id="cardNumber"
                          name="cardNumber"
                          placeholder="0000 0000 0000 0000"
                          value={formData.cardNumber}
                          onChange={handleChange}
                          maxLength="19"
                          className={`block w-full border ${
                            formErrors.cardNumber ? 'border-red-300' : 'border-gray-300'
                          } rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
                        />
                        {formErrors.cardNumber && (
                          <p className="mt-1 text-sm text-red-600">{formErrors.cardNumber}</p>
                        )}
                        <p className="mt-1 text-xs text-gray-500">
                          For testing, use: 4111 1111 1111 1111
                        </p>
                      </div>

                      {/* Card Name */}
                      <div>
                        <label htmlFor="cardName" className="block text-sm font-medium text-gray-700 mb-1">
                          Name on Card
                        </label>
                        <input
                          type="text"
                          id="cardName"
                          name="cardName"
                          placeholder="John Smith"
                          value={formData.cardName}
                          onChange={handleChange}
                          className={`block w-full border ${
                            formErrors.cardName ? 'border-red-300' : 'border-gray-300'
                          } rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
                        />
                        {formErrors.cardName && (
                          <p className="mt-1 text-sm text-red-600">{formErrors.cardName}</p>
                        )}
                      </div>

                      {/* Expiry and CVV */}
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700 mb-1">
                            Expiry Date
                          </label>
                          <input
                            type="text"
                            id="expiryDate"
                            name="expiryDate"
                            placeholder="MM/YY"
                            value={formData.expiryDate}
                            onChange={handleChange}
                            maxLength="5"
                            className={`block w-full border ${
                              formErrors.expiryDate ? 'border-red-300' : 'border-gray-300'
                            } rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
                          />
                          {formErrors.expiryDate && (
                            <p className="mt-1 text-sm text-red-600">{formErrors.expiryDate}</p>
                          )}
                          <p className="mt-1 text-xs text-gray-500">
                            Use a future date
                          </p>
                        </div>
                        <div>
                          <label htmlFor="cvv" className="block text-sm font-medium text-gray-700 mb-1">
                            CVV
                          </label>
                          <input
                            type="password"
                            id="cvv"
                            name="cvv"
                            placeholder="123"
                            value={formData.cvv}
                            onChange={handleChange}
                            maxLength="4"
                            className={`block w-full border ${
                              formErrors.cvv ? 'border-red-300' : 'border-gray-300'
                            } rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
                          />
                          {formErrors.cvv && (
                            <p className="mt-1 text-sm text-red-600">{formErrors.cvv}</p>
                          )}
                          <p className="mt-1 text-xs text-gray-500">
                            For testing, use: 123
                          </p>
                        </div>
                      </div>

                      {/* Submit Button */}
                      <div className="mt-8">
                        <button
                          type="submit"
                          disabled={paymentStatus === 'processing'}
                          className={`w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-md shadow-sm text-base font-medium text-white ${
                            paymentStatus === 'processing'
                              ? 'bg-blue-400 cursor-not-allowed'
                              : 'bg-blue-600 hover:bg-blue-700'
                          }`}
                        >
                          {paymentStatus === 'processing' ? (
                            <>
                              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                              </svg>
                              Processing Payment...
                            </>
                          ) : (
                            `Pay $${orderData.total.toFixed(2)}`
                          )}
                        </button>
                      </div>

                      <p className="text-xs text-gray-500 text-center">
                        Your payment information is secure and encrypted. By completing your purchase, you agree to our <Link href="/terms" className="text-blue-600 hover:text-blue-800">Terms of Service</Link>.
                      </p>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
}