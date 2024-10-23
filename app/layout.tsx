import React from 'react';
import type { Metadata } from "next";
import { Inter } from 'next/font/google';
import "./globals.css";
import { CartProvider } from '@/components/CartContext'

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: "Replug",
  description: "Your one-stop shop for car parts",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <CartProvider>
          {children}
        </CartProvider>
      </body>
    </html>
  );
}

export function ErrorBoundary({ error }: { error: Error }) {
  return (
    <html>
      <body>
        <h1>Something went wrong</h1>
        <p>{error.message}</p>
        {/* You can customize this error page or redirect to the NotFound page */}
      </body>
    </html>
  );
}
