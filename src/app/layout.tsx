import './globals.css';
import { Inter } from 'next/font/google';
import { AuthProvider } from '@/context/authContext';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Digital Book Marketplace',
  description: 'Buy, sell, and discover digital books',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}