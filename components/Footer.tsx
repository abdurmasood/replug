import React from 'react'
import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">About Us</h3>
            <p className="text-gray-400">Replug is your one-stop shop for all automotive parts and accessories.</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link href="/" className="text-gray-400 hover:text-white transition-colors">Home</Link></li>
              <li><Link href="/car-parts" className="text-gray-400 hover:text-white  transition-colors">Car Parts</Link></li>
              <li><Link href="/brands" className="text-gray-400 hover:text-white transition-colors">Brands</Link></li>
              <li><Link href="/offers" className="text-gray-400 hover:text-white transition-colors">Offers</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Customer Service</h3>
            <ul className="space-y-2">
              <li><Link href="/contact" className="text-gray-400 hover:text-white transition-colors">Contact Us</Link></li>
              <li><Link href="/faq" className="text-gray-400 hover:text-white transition-colors">FAQ</Link></li>
              <li><Link href="/shipping" className="text-gray-400 hover:text-white transition-colors">Shipping Information</Link></li>
              <li><Link href="/returns" className="text-gray-400 hover:text-white transition-colors">Returns Policy</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Newsletter</h3>
            <p className="text-gray-400 mb-4">Subscribe to our newsletter for the latest updates and offers.</p>
            <form className="flex">
              <input type="email" placeholder="Your email" className="rounded-l-md px-4 py-2 w-full" />
              <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-r-md hover:bg-blue-700 transition-colors">Subscribe</button>
            </form>
          </div>
        </div>
        <div className="border-t border-gray-700 pt-8 text-center">
          <p className="text-gray-400">&copy; 2024 Replug. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
