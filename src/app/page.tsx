import Link from 'next/link';
import MainLayout from '@/components/MainLayout';
import { Book, ArrowRight, ChevronRight, Star, Search } from 'lucide-react';

// Featured categories
const categories = [
  { name: 'Fiction', icon: '📚', link: '/categories/fiction' },
  { name: 'Business', icon: '💼', link: '/categories/business' },
  { name: 'Self-Help', icon: '🧠', link: '/categories/self-help' },
  { name: 'Science', icon: '🔬', link: '/categories/science' },
  { name: 'Biography', icon: '👤', link: '/categories/biography' },
  { name: 'Technology', icon: '💻', link: '/categories/technology' },
];

// Dummy data for featured books
const featuredBooks = [
  {
    id: '1',
    title: 'The Creative Mind',
    author: 'Jane Williams',
    coverImage: 'https://via.placeholder.com/300x450/3b82f6/ffffff?text=Book+Cover',
    price: 12.99,
  },
  {
    id: '2',
    title: 'Business Strategy',
    author: 'Michael Johnson',
    coverImage: 'https://via.placeholder.com/300x450/4f46e5/ffffff?text=Book+Cover',
    price: 15.99,
  },
  {
    id: '3',
    title: 'Future Tech',
    author: 'Sarah Chen',
    coverImage: 'https://via.placeholder.com/300x450/0891b2/ffffff?text=Book+Cover',
    price: 9.99,
  },
  {
    id: '4',
    title: 'The Human Mind',
    author: 'Robert Diaz',
    coverImage: 'https://via.placeholder.com/300x450/db2777/ffffff?text=Book+Cover',
    price: 11.99,
  },
];

// Dummy data for new releases
const newReleases = [
  {
    id: '5',
    title: 'Modern Architecture',
    author: 'Thomas Grant',
    coverImage: 'https://via.placeholder.com/300x450/65a30d/ffffff?text=Book+Cover',
    price: 14.99,
  },
  {
    id: '6',
    title: 'Digital Marketing',
    author: 'Amanda Lewis',
    coverImage: 'https://via.placeholder.com/300x450/d97706/ffffff?text=Book+Cover',
    price: 10.99,
  },
  {
    id: '7',
    title: 'Healthy Living',
    author: 'Lisa Johnson',
    coverImage: 'https://via.placeholder.com/300x450/059669/ffffff?text=Book+Cover',
    price: 8.99,
  },
  {
    id: '8',
    title: 'World History',
    author: 'David Miller',
    coverImage: 'https://via.placeholder.com/300x450/7c3aed/ffffff?text=Book+Cover',
    price: 13.99,
  },
];

export default function Home() {
  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-700 to-blue-900 text-white py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">
              Discover Your Next Favorite Book
            </h1>
            <p className="text-lg sm:text-xl text-blue-100 mb-8">
              Thousands of digital books from top authors, ready to download instantly.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-xl mx-auto">
              <div className="relative w-full">
                <input
                  type="text"
                  placeholder="Search for books, authors, or topics..."
                  className="w-full pl-10 pr-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
              </div>
              <Link
                href="/books"
                className="whitespace-nowrap bg-white text-blue-600 hover:bg-blue-50 px-4 py-3 rounded-lg font-medium flex items-center justify-center sm:justify-start w-full sm:w-auto"
              >
                Browse All Books <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Browse by Category</h2>
            <p className="mt-2 text-lg text-gray-600">Explore our wide selection of categories</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
            {categories.map((category, i) => (
              <Link
                key={i}
                href={category.link}
                className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow flex flex-col items-center justify-center text-center"
              >
                <span className="text-4xl mb-3">{category.icon}</span>
                <h3 className="text-lg font-medium text-gray-900">{category.name}</h3>
              </Link>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link
              href="/categories"
              className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
            >
              View all categories <ChevronRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Books Section */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900">Featured Books</h2>
            <Link
              href="/books/featured"
              className="text-blue-600 hover:text-blue-800 flex items-center font-medium"
            >
              View all <ChevronRight className="ml-1 h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {featuredBooks.map((book) => (
              <Link key={book.id} href={`/books/${book.id}`} className="group">
                <div className="aspect-[2/3] bg-gray-200 rounded-lg overflow-hidden shadow-sm group-hover:shadow-md transition-shadow">
                  <img
                    src={book.coverImage}
                    alt={book.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="mt-3">
                  <h3 className="text-lg font-medium text-gray-900 group-hover:text-blue-600 transition-colors">
                    {book.title}
                  </h3>
                  <p className="text-sm text-gray-500">{book.author}</p>
                  <div className="mt-1 flex items-center justify-between">
                    <span className="text-blue-600 font-bold">${book.price.toFixed(2)}</span>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                      <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                      <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                      <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                      <Star className="h-4 w-4 text-gray-300" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* New Releases Section */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900">New Releases</h2>
            <Link
              href="/books/new-releases"
              className="text-blue-600 hover:text-blue-800 flex items-center font-medium"
            >
              View all <ChevronRight className="ml-1 h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {newReleases.map((book) => (
              <Link key={book.id} href={`/books/${book.id}`} className="group">
                <div className="aspect-[2/3] bg-gray-200 rounded-lg overflow-hidden shadow-sm group-hover:shadow-md transition-shadow">
                  <img
                    src={book.coverImage}
                    alt={book.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="mt-3">
                  <h3 className="text-lg font-medium text-gray-900 group-hover:text-blue-600 transition-colors">
                    {book.title}
                  </h3>
                  <p className="text-sm text-gray-500">{book.author}</p>
                  <div className="mt-1 flex items-center justify-between">
                    <span className="text-blue-600 font-bold">${book.price.toFixed(2)}</span>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                      <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                      <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                      <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                      <Star className="h-4 w-4 text-gray-300" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="md:flex md:items-center md:justify-between">
            <div className="md:w-1/2">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Become a Vendor
              </h2>
              <p className="mt-3 max-w-md text-lg text-blue-100">
                Share your knowledge with the world. Publish your ebooks and reach readers around the globe.
              </p>
            </div>
            <div className="mt-8 md:mt-0 md:w-1/2 flex md:justify-end">
              <Link
                href="/auth/vendor/signup"
                className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-blue-600 bg-white hover:bg-blue-50"
              >
                Start Selling <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">
              Why Choose Our Platform
            </h2>
            <p className="mt-2 text-lg text-gray-600">
              We offer the best experience for digital book lovers
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="w-12 h-12 bg-blue-100 text-blue-600 flex items-center justify-center rounded-full mb-4">
                <Book className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold mb-2">Huge Selection</h3>
              <p className="text-gray-600">
                Access thousands of digital books across all genres and topics, from bestsellers to niche subjects.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="w-12 h-12 bg-green-100 text-green-600 flex items-center justify-center rounded-full mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Instant Access</h3>
              <p className="text-gray-600">
                Download your purchases immediately after checkout. No waiting, no shipping delays.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="w-12 h-12 bg-purple-100 text-purple-600 flex items-center justify-center rounded-full mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Secure Platform</h3>
              <p className="text-gray-600">
                Your purchases and personal information are always protected with our state-of-the-art security.
              </p>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
}