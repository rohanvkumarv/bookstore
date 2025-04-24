// "use client";

// import { useState } from 'react';
// import Link from 'next/link';
// import { useAuth } from '@/context/authContext';
// import { 
//   Search, Menu, X, ShoppingCart, Heart, User, LogOut, Book, 
//   Settings, DollarSign, Home
// } from 'lucide-react';

// export default function Navbar() {
//   const { isAuthenticated, isAdmin, isVendor, isCustomer, logout } = useAuth();
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [searchQuery, setSearchQuery] = useState('');

//   const handleSearch = (e) => {
//     e.preventDefault();
//     // Redirect to search page with query
//     window.location.href = `/search?q=${encodeURIComponent(searchQuery)}`;
//   };

//   return (
//     <nav className="bg-white shadow-sm">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex justify-between h-16">
//           <div className="flex items-center">
//             <Link href="/" className="flex-shrink-0 flex items-center">
//               <Book className="h-8 w-8 text-blue-600" />
//               <span className="ml-2 text-xl font-bold text-gray-900">BookStore</span>
//             </Link>
//           </div>

//           {/* Desktop search */}
//           <div className="hidden md:flex items-center flex-1 max-w-md mx-4">
//             <form onSubmit={handleSearch} className="w-full">
//               <div className="relative">
//                 <input
//                   type="text"
//                   placeholder="Search for books..."
//                   className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   value={searchQuery}
//                   onChange={(e) => setSearchQuery(e.target.value)}
//                 />
//                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                   <Search className="h-5 w-5 text-gray-400" />
//                 </div>
//               </div>
//             </form>
//           </div>

//           {/* Desktop menu */}
//           <div className="hidden md:flex items-center">
//             <Link href="/books" className="px-3 py-2 text-gray-700 hover:text-blue-600">Books</Link>
//             <Link href="/categories" className="px-3 py-2 text-gray-700 hover:text-blue-600">Categories</Link>
            
//             {isAuthenticated ? (
//               <>
//                 {isCustomer && (
//                   <>
//                     <Link href="/wishlist" className="px-3 py-2 text-gray-700 hover:text-blue-600">
//                       <Heart className="h-5 w-5" />
//                     </Link>
//                     <Link href="/cart" className="px-3 py-2 text-gray-700 hover:text-blue-600">
//                       <ShoppingCart className="h-5 w-5" />
//                     </Link>
//                   </>
//                 )}
                
//                 <div className="relative ml-3">
//                   <button
//                     className="flex items-center text-gray-700 hover:text-blue-600"
//                     onClick={() => setIsMenuOpen(!isMenuOpen)}
//                   >
//                     <User className="h-5 w-5" />
//                     <span className="ml-1">Account</span>
//                   </button>
                  
//                   {isMenuOpen && (
//                     <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
//                       <div className="py-1">
//                         {isAdmin && (
//                           <Link href="/admin/dashboard" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
//                             Admin Dashboard
//                           </Link>
//                         )}
                        
//                         {isVendor && (
//                           <Link href="/vendor/dashboard" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
//                             Vendor Dashboard
//                           </Link>
//                         )}
                        
//                         {isCustomer && (
//                           <Link href="/my-account/library" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
//                             My Library
//                           </Link>
//                         )}
                        
//                         <Link href="/settings" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
//                           Settings
//                         </Link>
                        
//                         <button
//                           onClick={logout}
//                           className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
//                         >
//                           Sign out
//                         </button>
//                       </div>
//                     </div>
//                   )}
//                 </div>
//               </>
//             ) : (
//               <>
//                 <Link href="/auth/login" className="px-3 py-2 text-gray-700 hover:text-blue-600">
//                   Login
//                 </Link>
//                 <Link href="/auth/signup" className="ml-2 px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700">
//                   Sign Up
//                 </Link>
//               </>
//             )}
//           </div>

//           {/* Mobile menu button */}
//           <div className="flex items-center md:hidden">
//             <button
//               className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-100 focus:outline-none"
//               onClick={() => setIsMenuOpen(!isMenuOpen)}
//             >
//               {isMenuOpen ? (
//                 <X className="h-6 w-6" />
//               ) : (
//                 <Menu className="h-6 w-6" />
//               )}
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Mobile menu */}
//       {isMenuOpen && (
//         <div className="md:hidden">
//           <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
//             {/* Mobile search */}
//             <form onSubmit={handleSearch} className="mb-3">
//               <div className="relative">
//                 <input
//                   type="text"
//                   placeholder="Search for books..."
//                   className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   value={searchQuery}
//                   onChange={(e) => setSearchQuery(e.target.value)}
//                 />
//                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                   <Search className="h-5 w-5 text-gray-400" />
//                 </div>
//               </div>
//             </form>

//             <Link href="/" className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-100 rounded-md">
//               <Home className="inline-block h-5 w-5 mr-1" />
//               Home
//             </Link>
            
//             <Link href="/books" className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-100 rounded-md">
//               <Book className="inline-block h-5 w-5 mr-1" />
//               Books
//             </Link>
            
//             <Link href="/categories" className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-100 rounded-md">
//               Categories
//             </Link>

//             {isAuthenticated ? (
//               <>
//                 {isCustomer && (
//                   <>
//                     <Link href="/wishlist" className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-100 rounded-md">
//                       <Heart className="inline-block h-5 w-5 mr-1" />
//                       Wishlist
//                     </Link>
                    
//                     <Link href="/cart" className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-100 rounded-md">
//                       <ShoppingCart className="inline-block h-5 w-5 mr-1" />
//                       Cart
//                     </Link>
                    
//                     <Link href="/my-account/library" className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-100 rounded-md">
//                       <User className="inline-block h-5 w-5 mr-1" />
//                       My Library
//                     </Link>
//                   </>
//                 )}
                
//                 {isAdmin && (
//                   <Link href="/admin/dashboard" className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-100 rounded-md">
//                     <Settings className="inline-block h-5 w-5 mr-1" />
//                     Admin Dashboard
//                   </Link>
//                 )}
                
//                 {isVendor && (
//                   <Link href="/vendor/dashboard" className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-100 rounded-md">
//                     <DollarSign className="inline-block h-5 w-5 mr-1" />
//                     Vendor Dashboard
//                   </Link>
//                 )}
                
//                 <Link href="/settings" className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-100 rounded-md">
//                   <Settings className="inline-block h-5 w-5 mr-1" />
//                   Settings
//                 </Link>
                
//                 <button
//                   onClick={logout}
//                   className="block w-full text-left px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-100 rounded-md"
//                 >
//                   <LogOut className="inline-block h-5 w-5 mr-1" />
//                   Sign out
//                 </button>
//               </>
//             ) : (
//               <div className="mt-4 pt-4 border-t border-gray-200">
//                 <Link href="/auth/login" className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-100 rounded-md">
//                   Login
//                 </Link>
                
//                 <Link href="/auth/signup" className="block mt-2 px-3 py-2 text-base font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md text-center">
//                   Sign Up
//                 </Link>
//               </div>
//             )}
//           </div>
//         </div>
//       )}
//     </nav>
//   );
// }
"use client";

import { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/authContext';
import { 
  Search, Menu, X, ShoppingCart, Heart, User, LogOut, Book, 
  Settings, DollarSign, Home, Mail
} from 'lucide-react';

export default function Navbar() {
  const { isAuthenticated, isAdmin, isVendor, isCustomer, logout, userEmail, userType } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    // Redirect to search page with query
    window.location.href = `/search?q=${encodeURIComponent(searchQuery)}`;
  };

  // Get label and color for user type badge
  const getUserTypeDisplay = () => {
    switch(userType) {
      case 'ADMIN':
        return { label: 'Admin', color: 'bg-red-100 text-red-800' };
      case 'VENDOR':
        return { label: 'Vendor', color: 'bg-purple-100 text-purple-800' };
      case 'CUSTOMER':
        return { label: 'Customer', color: 'bg-blue-100 text-blue-800' };
      default:
        return { label: userType, color: 'bg-gray-100 text-gray-800' };
    }
  };

  const typeInfo = isAuthenticated ? getUserTypeDisplay() : null;

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0 flex items-center">
              <Book className="h-8 w-8 text-blue-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">BookStore</span>
            </Link>
          </div>

          {/* Desktop search */}
          <div className="hidden md:flex items-center flex-1 max-w-md mx-4">
            <form onSubmit={handleSearch} className="w-full">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search for books..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
              </div>
            </form>
          </div>

          {/* Desktop menu */}
          <div className="hidden md:flex items-center">
            <Link href="/books" className="px-3 py-2 text-gray-700 hover:text-blue-600">Books</Link>
            <Link href="/categories" className="px-3 py-2 text-gray-700 hover:text-blue-600">Categories</Link>
            
            {isAuthenticated ? (
              <>
                {isCustomer && (
                  <>
                    <Link href="/wishlist" className="px-3 py-2 text-gray-700 hover:text-blue-600">
                      <Heart className="h-5 w-5" />
                    </Link>
                    <Link href="/cart" className="px-3 py-2 text-gray-700 hover:text-blue-600">
                      <ShoppingCart className="h-5 w-5" />
                    </Link>
                  </>
                )}
                
                {/* User info display */}
                <div className="relative ml-3">
                  <button
                    className="flex items-center text-gray-700 hover:text-blue-600"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                  >
                    <User className="h-5 w-5" />
                    <div className="ml-2 text-sm flex flex-col items-start">
                      <span className="font-medium truncate max-w-[120px]">{userEmail}</span>
                      <span className={`text-xs px-1.5 py-0.5 rounded-full ${typeInfo.color}`}>
                        {typeInfo.label}
                      </span>
                    </div>
                  </button>
                  
                  {isMenuOpen && (
                    <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                      <div className="py-1">
                        {isAdmin && (
                          <Link href="/admin/dashboard" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                            Admin Dashboard
                          </Link>
                        )}
                        
                        {isVendor && (
                          <Link href="/vendor/dashboard" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                            Vendor Dashboard
                          </Link>
                        )}
                        
                        {isCustomer && (
                          <Link href="/my-account/library" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                            My Library
                          </Link>
                        )}
                        
                        <Link href="/settings" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                          Settings
                        </Link>
                        
                        <button
                          onClick={logout}
                          className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          Sign out
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <>
                <Link href="/auth/login" className="px-3 py-2 text-gray-700 hover:text-blue-600">
                  Login
                </Link>
                <Link href="/auth/signup" className="ml-2 px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700">
                  Sign Up
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-100 focus:outline-none"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {/* User info for mobile */}
            {isAuthenticated && (
              <div className="border-b border-gray-200 pb-3 mb-3">
                <div className="flex items-center px-3 py-2">
                  <User className="h-10 w-10 bg-gray-200 p-2 rounded-full text-gray-600" />
                  <div className="ml-3">
                    <p className="text-base font-medium text-gray-800">{userEmail}</p>
                    <p className={`text-xs mt-1 inline-block px-2 py-0.5 rounded-full ${typeInfo.color}`}>
                      {typeInfo.label}
                    </p>
                  </div>
                </div>
              </div>
            )}
            
            {/* Mobile search */}
            <form onSubmit={handleSearch} className="mb-3">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search for books..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
              </div>
            </form>

            {/* Rest of the mobile menu items remain the same */}
            <Link href="/" className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-100 rounded-md">
              <Home className="inline-block h-5 w-5 mr-1" />
              Home
            </Link>
            
            {/* Additional menu items... */}
            {/* Keep the rest of your existing mobile menu code */}
          </div>
        </div>
      )}
    </nav>
  );
}