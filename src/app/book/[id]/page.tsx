"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/authContext';
import MainLayout from '@/components/MainLayout';
import { 
  ArrowLeft, Star, ShoppingCart, Heart, Share2, ChevronDown, ChevronUp, AlertTriangle
} from 'lucide-react';

// Dummy data for book details - In a real app, this would come from API call
const bookData = {
  id: '1',
  title: 'The Creative Mind',
  author: 'Jane Williams',
  description: 'Unlock your creative potential with this comprehensive guide to creative thinking. Jane Williams explores the science behind creativity and provides practical exercises to enhance your creative abilities.',
  longDescription: `Unlock your creative potential with this comprehensive guide to creative thinking. Jane Williams explores the science behind creativity and provides practical exercises to enhance your creative abilities.

In this insightful book, you'll discover:
- The neurological basis of creativity
- How to overcome creative blocks
- Techniques used by renowned artists, writers, and innovators
- Practical exercises to strengthen your creative muscles
- How to apply creative thinking to solve real-world problems

Whether you're an artist, writer, entrepreneur, or simply looking to bring more creativity into your daily life, "The Creative Mind" offers valuable insights and actionable advice to help you tap into your innate creative abilities.`,
  coverImage: 'https://via.placeholder.com/600x900/3b82f6/ffffff?text=The+Creative+Mind',
  price: 12.99,
  discountPrice: 9.99,
  format: 'PDF, EPUB',
  language: 'English',
  pageCount: 256,
  isbn: '978-3-16-148410-0',
  publishedDate: '2023-06-15',
  categories: ['Self-Help', 'Psychology', 'Creativity'],
  averageRating: 4.5,
  reviewCount: 128,
  previewUrl: '/sample-preview.pdf'
};

// Dummy review data
const reviewsData = [
  {
    id: 1,
    author: 'Michael L.',
    date: '2023-08-15',
    rating: 5,
    comment: 'This book completely changed how I approach creative tasks. The exercises are practical and effective. Highly recommended!'
  },
  {
    id: 2,
    author: 'Sarah K.',
    date: '2023-07-22',
    rating: 4,
    comment: 'A solid guide to understanding creativity. Some concepts were familiar, but there were plenty of new insights that I found valuable.'
  },
  {
    id: 3,
    author: 'Robert J.',
    date: '2023-07-10',
    rating: 5,
    comment: 'Exactly what I needed to overcome my creative block. The scientific approach combined with practical exercises makes this book stand out.'
  }
];

export default function BookDetail({ params }) {
  const router = useRouter();
  const { isAuthenticated, isCustomer } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [book, setBook] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState(null);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [inWishlist, setInWishlist] = useState(false);
  const [inCart, setInCart] = useState(false);
  const [cartMessage, setCartMessage] = useState('');
  const [showMessage, setShowMessage] = useState(false);

  // In a real app, fetch the book from the API
  useEffect(() => {
    // Simulate API call
    setIsLoading(true);
    setTimeout(() => {
      setBook(bookData);
      setReviews(reviewsData);
      setIsLoading(false);
    }, 500);
  }, [params.id]);

  const addToCart = async () => {
    if (!isAuthenticated) {
      router.push('/auth/login');
      return;
    }

    if (!isCustomer) {
      setCartMessage('Only customers can purchase books');
      setShowMessage(true);
      setTimeout(() => setShowMessage(false), 3000);
      return;
    }

    setCartMessage('Added to cart!');
    setShowMessage(true);
    setInCart(true);
    setTimeout(() => setShowMessage(false), 3000);

    // In a real app, you would call your API to add the book to the cart
    // const response = await fetch('/api/cart/add', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({ bookId: book.id }),
    // });
    // 
    // if (response.ok) {
    //   setInCart(true);
    //   setCartMessage('Added to cart!');
    // } else {
    //   const data = await response.json();
    //   setCartMessage(data.error || 'Failed to add to cart');
    // }
    // setShowMessage(true);
    // setTimeout(() => setShowMessage(false), 3000);
  };

  const toggleWishlist = async () => {
    if (!isAuthenticated) {
      router.push('/auth/login');
      return;
    }

    if (!isCustomer) {
      setCartMessage('Only customers can add books to wishlist');
      setShowMessage(true);
      setTimeout(() => setShowMessage(false), 3000);
      return;
    }

    // Toggle wishlist state immediately for better UX
    setInWishlist(!inWishlist);
    setCartMessage(inWishlist ? 'Removed from wishlist' : 'Added to wishlist');
    setShowMessage(true);
    setTimeout(() => setShowMessage(false), 3000);

    // In a real app, you would call your API to toggle wishlist status
    // const response = await fetch(`/api/wishlist/${inWishlist ? 'remove' : 'add'}`, {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({ bookId: book.id }),
    // });
    // 
    // if (!response.ok) {
    //   // Revert state if API call fails
    //   setInWishlist(!inWishlist);
    //   const data = await response.json();
    //   setCartMessage(data.error || 'Failed to update wishlist');
    //   setShowMessage(true);
    //   setTimeout(() => setShowMessage(false), 3000);
    // }
  };

  if (isLoading) {
    return (
      <MainLayout>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="animate-pulse">
            <div className="md:flex md:items-start">
              <div className="md:w-1/3">
                <div className="aspect-[2/3] bg-gray-300 rounded-lg"></div>
              </div>
              <div className="mt-6 md:mt-0 md:ml-8 md:w-2/3">
                <div className="h-8 bg-gray-300 rounded w-3/4 mb-4"></div>
                <div className="h-4 bg-gray-300 rounded w-1/2 mb-6"></div>
                <div className="h-4 bg-gray-300 rounded w-full mb-2"></div>
                <div className="h-4 bg-gray-300 rounded w-full mb-2"></div>
                <div className="h-4 bg-gray-300 rounded w-3/4 mb-6"></div>
                <div className="h-10 bg-gray-300 rounded w-1/3 mb-4"></div>
                <div className="h-12 bg-gray-300 rounded w-full mb-4"></div>
              </div>
            </div>
          </div>
        </div>
      </MainLayout>
    );
  }

  if (error || !book) {
    return (
      <MainLayout>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="bg-red-50 p-4 rounded-md">
            <div className="flex">
              <div className="flex-shrink-0">
                <AlertTriangle className="h-5 w-5 text-red-400" />
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">
                  {error || "Book not found"}
                </h3>
              </div>
            </div>
          </div>
          <div className="mt-6">
            <Link
              href="/books"
              className="text-blue-600 hover:text-blue-800 flex items-center"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to books
            </Link>
          </div>
        </div>
      </MainLayout>
    );
  }

  // Render stars based on rating
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        stars.push(<Star key={i} className="h-4 w-4 text-yellow-500 fill-yellow-500" />);
      } else if (i - 0.5 <= rating) {
        stars.push(
          <Star
            key={i}
            className="h-4 w-4 text-yellow-500"
            style={{ fill: 'url(#half-filled)' }}
          />
        );
      } else {
        stars.push(<Star key={i} className="h-4 w-4 text-gray-300" />);
      }
    }
    return stars;
  };

  return (
    <MainLayout>
      {/* Book notification message */}
      {showMessage && (
        <div className="fixed top-20 right-4 z-50 bg-blue-600 text-white py-2 px-4 rounded-md shadow-lg">
          {cartMessage}
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Breadcrumbs */}
        <div className="mb-6">
          <nav className="flex" aria-label="Breadcrumb">
            <ol className="flex items-center space-x-2 text-sm text-gray-500">
              <li>
                <Link href="/" className="hover:text-blue-600">
                  Home
                </Link>
              </li>
              <span>/</span>
              <li>
                <Link href="/books" className="hover:text-blue-600">
                  Books
                </Link>
              </li>
              <span>/</span>
              <li className="text-gray-900 font-medium truncate max-w-xs">
                {book.title}
              </li>
            </ol>
          </nav>
        </div>

        {/* Book details */}
        <div className="md:flex md:items-start">
          {/* Book cover */}
          <div className="md:w-1/3">
            <div className="aspect-[2/3] bg-gray-100 rounded-lg overflow-hidden shadow-md">
              <img
                src={book.coverImage}
                alt={book.title}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Book information */}
          <div className="mt-6 md:mt-0 md:ml-8 md:w-2/3">
            <h1 className="text-3xl font-bold text-gray-900">{book.title}</h1>
            <p className="text-xl text-gray-600 mb-4">by {book.author}</p>

            {/* Ratings */}
            <div className="flex items-center mb-6">
              <div className="flex mr-2">
                {renderStars(book.averageRating)}
              </div>
              <span className="text-sm text-gray-500">
                {book.averageRating} ({book.reviewCount} reviews)
              </span>
            </div>

            {/* Pricing */}
            <div className="mb-6">
              {book.discountPrice ? (
                <div className="flex items-center">
                  <span className="text-3xl font-bold text-blue-600">
                    ${book.discountPrice.toFixed(2)}
                  </span>
                  <span className="ml-2 text-lg text-gray-500 line-through">
                    ${book.price.toFixed(2)}
                  </span>
                  <span className="ml-2 px-2 py-1 bg-green-100 text-green-800 text-xs font-semibold rounded">
                    SALE
                  </span>
                </div>
              ) : (
                <span className="text-3xl font-bold text-blue-600">
                  ${book.price.toFixed(2)}
                </span>
              )}
            </div>

            {/* Book metadata */}
            <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
              <div>
                <span className="font-medium text-gray-700">Format:</span>{' '}
                <span className="text-gray-600">{book.format}</span>
              </div>
              <div>
                <span className="font-medium text-gray-700">Pages:</span>{' '}
                <span className="text-gray-600">{book.pageCount}</span>
              </div>
              <div>
                <span className="font-medium text-gray-700">Language:</span>{' '}
                <span className="text-gray-600">{book.language}</span>
              </div>
              <div>
                <span className="font-medium text-gray-700">ISBN:</span>{' '}
                <span className="text-gray-600">{book.isbn}</span>
              </div>
              <div>
                <span className="font-medium text-gray-700">Published:</span>{' '}
                <span className="text-gray-600">
                  {new Date(book.publishedDate).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </span>
              </div>
            </div>

            {/* Action buttons */}
            <div className="mb-6 flex flex-col sm:flex-row sm:items-center gap-4">
              <button
                onClick={addToCart}
                className={`flex-1 flex items-center justify-center py-3 px-6 ${
                  inCart
                    ? 'bg-green-600 hover:bg-green-700'
                    : 'bg-blue-600 hover:bg-blue-700'
                } text-white font-semibold rounded-md`}
              >
                <ShoppingCart className="mr-2 h-5 w-5" />
                {inCart ? 'In Cart' : 'Add to Cart'}
              </button>
              <button
                onClick={toggleWishlist}
                className={`flex-1 flex items-center justify-center py-3 px-6 border ${
                  inWishlist
                    ? 'bg-gray-100 border-gray-400 text-gray-700'
                    : 'border-gray-300 text-gray-600'
                } hover:bg-gray-100 font-semibold rounded-md`}
              >
                <Heart
                  className={`mr-2 h-5 w-5 ${inWishlist ? 'fill-red-500 text-red-500' : ''}`}
                />
                {inWishlist ? 'In Wishlist' : 'Add to Wishlist'}
              </button>
            </div>

            {/* Preview button */}
            <div className="mb-8">
              <Link
                href={book.previewUrl}
                target="_blank"
                className="text-blue-600 hover:text-blue-800 font-medium flex items-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
                Preview Sample
              </Link>
            </div>

            {/* Categories */}
            <div className="mb-8">
              <h3 className="text-sm font-medium text-gray-700 mb-2">Categories:</h3>
              <div className="flex flex-wrap gap-2">
                {book.categories.map((category, index) => (
                  <Link
                    key={index}
                    href={`/categories/${category.toLowerCase().replace(' ', '-')}`}
                    className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm hover:bg-gray-200"
                  >
                    {category}
                  </Link>
                ))}
              </div>
            </div>

            {/* Share buttons */}
            <div className="flex items-center space-x-4 text-gray-500">
              <button className="flex items-center hover:text-blue-600">
                <Share2 className="mr-1 h-4 w-4" />
                Share
              </button>
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Description</h2>
          <div className="prose max-w-none text-gray-700">
            <p>
              {showFullDescription
                ? book.longDescription
                : `${book.description} ${
                    book.longDescription && book.longDescription.length > book.description.length
                      ? '...'
                      : ''
                  }`}
            </p>
            {book.longDescription && book.longDescription.length > book.description.length && (
              <button
                onClick={() => setShowFullDescription(!showFullDescription)}
                className="mt-2 text-blue-600 hover:text-blue-800 font-medium flex items-center"
              >
                {showFullDescription ? (
                  <>
                    Show less <ChevronUp className="ml-1 h-4 w-4" />
                  </>
                ) : (
                  <>
                    Read more <ChevronDown className="ml-1 h-4 w-4" />
                  </>
                )}
              </button>
            )}
          </div>
        </div>

        {/* Reviews */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Customer Reviews ({reviews.length})
          </h2>

          {/* Average rating */}
          <div className="flex items-center mb-8">
            <div className="flex mr-2">
              {renderStars(book.averageRating)}
            </div>
            <span className="text-lg font-medium">
              {book.averageRating} out of 5
            </span>
          </div>

          {/* Reviews list */}
          <div className="space-y-8">
            {reviews.map((review) => (
              <div key={review.id} className="border-b border-gray-200 pb-8 last:border-0">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-medium text-gray-900">
                    {review.author}
                  </h3>
                  <span className="text-sm text-gray-500">
                    {new Date(review.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </span>
                </div>
                <div className="flex mb-2">
                  {renderStars(review.rating)}
                </div>
                <p className="text-gray-700">{review.comment}</p>
              </div>
            ))}
          </div>

          {/* Write review CTA */}
          {isAuthenticated && isCustomer && (
            <div className="mt-8">
              <Link
                href={`/books/${book.id}/review`}
                className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
              >
                Write a Review
              </Link>
            </div>
          )}
        </div>

        {/* Related books - Would be implemented in a real app */}
      </div>
    </MainLayout>
  );
}