"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/authContext';
import MainLayout from '@/components/MainLayout';
import { Trash2, ShoppingCart, ArrowRight, AlertTriangle } from 'lucide-react';

// Dummy cart data - In a real app, this would come from API
const dummyCartItems = [
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
];

export default function Cart() {
  const router = useRouter();
  const { isAuthenticated, isCustomer } = useAuth();
  const [cartItems, setCartItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [couponError, setCouponError] = useState(null);

  // Fetch cart on component mount
  useEffect(() => {
    if (!isAuthenticated) {
      setIsLoading(false);
      return;
    }

    // In a real app, fetch cart items from API
    // For now, use dummy data
    setCartItems(dummyCartItems);
    setIsLoading(false);
  }, [isAuthenticated]);

  // Redirect if not authenticated or not a customer
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/auth/login?redirect=/cart');
    } else if (!isLoading && !isCustomer) {
      router.push('/');
    }
  }, [isLoading, isAuthenticated, isCustomer, router]);

  // Calculate cart totals
  const subtotal = cartItems.reduce((total, item) => {
    const price = item.book.discountPrice || item.book.price;
    return total + price;
  }, 0);

  const discount = appliedCoupon ? (appliedCoupon.type === 'PERCENTAGE' 
    ? subtotal * (appliedCoupon.value / 100) 
    : appliedCoupon.value) : 0;

  const total = subtotal - discount;

  // Remove item from cart
  const removeItem = async (itemId) => {
    // In a real app, call API to remove item
    setCartItems(cartItems.filter(item => item.id !== itemId));
  };

  // Apply coupon
  const applyCoupon = () => {
    if (!couponCode.trim()) {
      setCouponError('Please enter a coupon code');
      return;
    }

    // Simulate coupon validation
    // In a real app, this would be an API call
    if (couponCode.toUpperCase() === 'DISCOUNT20') {
      setAppliedCoupon({
        code: 'DISCOUNT20',
        type: 'PERCENTAGE',
        value: 20,
        description: '20% off your order'
      });
      setCouponError(null);
    } else if (couponCode.toUpperCase() === 'SAVE10') {
      setAppliedCoupon({
        code: 'SAVE10',
        type: 'FIXED',
        value: 10,
        description: '$10 off your order'
      });
      setCouponError(null);
    } else {
      setCouponError('Invalid coupon code');
      setAppliedCoupon(null);
    }
  };

  // Remove applied coupon
  const removeCoupon = () => {
    setAppliedCoupon(null);
    setCouponCode('');
    setCouponError(null);
  };

  // Proceed to checkout
  const proceedToCheckout = () => {
    router.push('/checkout');
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

  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Your Cart</h1>

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

        {cartItems.length === 0 ? (
          <div className="text-center py-12">
            <ShoppingCart className="mx-auto h-16 w-16 text-gray-400" />
            <h2 className="mt-4 text-lg font-medium text-gray-900">Your cart is empty</h2>
            <p className="mt-2 text-gray-500">
              Looks like you haven't added any books to your cart yet.
            </p>
            <div className="mt-6">
              <Link
                href="/books"
                className="inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        ) : (
          <div className="lg:grid lg:grid-cols-12 lg:gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-8">
              <div className="border rounded-lg overflow-hidden shadow-sm">
                <ul className="divide-y divide-gray-200">
                  {cartItems.map((item) => (
                    <li key={item.id} className="p-4 sm:p-6">
                      <div className="flex flex-col sm:flex-row">
                        <div className="flex-shrink-0">
                          <img
                            src={item.book.coverImage}
                            alt={item.book.title}
                            className="w-full sm:w-20 h-32 sm:h-28 object-cover rounded-md"
                          />
                        </div>
                        <div className="mt-4 sm:mt-0 sm:ml-6 flex-1">
                          <div className="flex justify-between">
                            <div>
                              <h3 className="text-lg font-medium text-gray-900">
                                <Link href={`/books/${item.bookId}`} className="hover:text-blue-600">
                                  {item.book.title}
                                </Link>
                              </h3>
                              <p className="mt-1 text-sm text-gray-500">by {item.book.author}</p>
                            </div>
                            <div className="text-right">
                              {item.book.discountPrice ? (
                                <div>
                                  <p className="text-lg font-medium text-blue-600">
                                    ${item.book.discountPrice.toFixed(2)}
                                  </p>
                                  <p className="text-sm text-gray-500 line-through">
                                    ${item.book.price.toFixed(2)}
                                  </p>
                                </div>
                              ) : (
                                <p className="text-lg font-medium text-gray-900">
                                  ${item.book.price.toFixed(2)}
                                </p>
                              )}
                            </div>
                          </div>
                          <div className="mt-4 flex justify-between items-center">
                            <div className="text-sm text-gray-600">
                              Digital Book • Instant Download
                            </div>
                            <button
                              onClick={() => removeItem(item.id)}
                              className="text-sm text-red-600 hover:text-red-800 flex items-center"
                            >
                              <Trash2 className="h-4 w-4 mr-1" />
                              Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-6">
                <Link
                  href="/books"
                  className="text-blue-600 hover:text-blue-800 flex items-center"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 19l-7-7m0 0l7-7m-7 7h18"
                    />
                  </svg>
                  Continue Shopping
                </Link>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-4 mt-8 lg:mt-0">
              <div className="border rounded-lg overflow-hidden shadow-sm p-6 bg-gray-50">
                <h2 className="text-lg font-medium text-gray-900 mb-6">Order Summary</h2>

                <div className="space-y-4">
                  <div className="flex justify-between">
                    <p className="text-gray-600">Subtotal</p>
                    <p className="font-medium">${subtotal.toFixed(2)}</p>
                  </div>

                  {appliedCoupon && (
                    <div className="flex justify-between text-green-600">
                      <div>
                        <p>Discount</p>
                        <p className="text-xs mt-1">{appliedCoupon.description}</p>
                      </div>
                      <p className="font-medium">-${discount.toFixed(2)}</p>
                    </div>
                  )}

                  <div className="border-t border-gray-200 pt-4 flex justify-between">
                    <p className="text-lg font-medium text-gray-900">Total</p>
                    <p className="text-lg font-bold text-blue-600">${total.toFixed(2)}</p>
                  </div>
                </div>

                {/* Coupon Code */}
                <div className="mt-6">
                  <label htmlFor="coupon" className="block text-sm font-medium text-gray-700 mb-1">
                    Apply Coupon
                  </label>
                  <div className="flex">
                    <input
                      type="text"
                      id="coupon"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      disabled={!!appliedCoupon}
                      className="flex-1 block w-full border-gray-300 rounded-l-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      placeholder="Enter coupon code"
                    />
                    {appliedCoupon ? (
                      <button
                        onClick={removeCoupon}
                        className="inline-flex items-center px-4 py-2 border border-gray-300 bg-gray-50 text-sm font-medium rounded-r-md text-gray-700 hover:bg-gray-100"
                      >
                        Remove
                      </button>
                    ) : (
                      <button
                        onClick={applyCoupon}
                        className="inline-flex items-center px-4 py-2 border border-transparent bg-blue-600 text-sm font-medium rounded-r-md text-white hover:bg-blue-700"
                      >
                        Apply
                      </button>
                    )}
                  </div>
                  {couponError && (
                    <p className="mt-1 text-sm text-red-600">{couponError}</p>
                  )}
                  {appliedCoupon && (
                    <p className="mt-1 text-sm text-green-600">
                      Coupon applied: {appliedCoupon.code}
                    </p>
                  )}
                </div>

                {/* Checkout Button */}
                <div className="mt-6">
                  <button
                    onClick={proceedToCheckout}
                    className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-blue-600 hover:bg-blue-700"
                  >
                    Proceed to Checkout
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </MainLayout>
  );
}