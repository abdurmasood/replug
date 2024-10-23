import React from 'react';
import Link from 'next/link';
import { Home } from 'lucide-react';
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center px-4">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-blue-600 mb-4">404</h1>
        <h2 className="text-3xl font-semibold text-gray-800 mb-4">Page Not Found</h2>
        <p className="text-xl text-gray-600 mb-8">Oops! The page you're looking for doesn't exist.</p>
        <Link href="/" passHref>
          <Button className="inline-flex items-center">
            <Home className="mr-2 h-4 w-4" />
            Back to Homepage
          </Button>
        </Link>
      </div>
    </div>
  );
}
