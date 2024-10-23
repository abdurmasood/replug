"use client"

import React, { useState, useEffect } from 'react'
import { useCart } from '@/components/CartContext'
import { Button } from "@/components/ui/button"
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function CheckoutPage() {
  const { cartItems, removeFromCart, updateQuantity } = useCart()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setIsLoading(false)
  }, [])

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const tax = subtotal * 0.1 // Assuming 10% tax
  const total = subtotal + tax

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Header />

      <main className="flex-grow py-12 px-4 sm:px-6 lg:px-8 mb-16">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-extrabold text-gray-900 mb-8">Your Cart</h1>
          {cartItems.length === 0 ? (
            <div className="bg-white shadow rounded-lg p-6 text-center">
              <p className="text-xl mb-4">Your cart is empty</p>
              <Link href="/" className="text-blue-600 hover:underline">Continue Shopping</Link>
            </div>
          ) : (
            <>
              <div className="bg-white shadow rounded-lg overflow-hidden">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex items-center p-6 border-b border-gray-200">
                    <div className="flex-1">
                      <h3 className="text-lg font-medium text-gray-900">{item.name}</h3>
                      <p className="mt-1 text-sm text-gray-500">${item.price.toFixed(2)}</p>
                    </div>
                    <div className="flex items-center">
                      <Button variant="outline" size="sm" onClick={() => updateQuantity(item.name, item.quantity - 1)}>-</Button>
                      <span className="mx-2">{item.quantity}</span>
                      <Button variant="outline" size="sm" onClick={() => updateQuantity(item.name, item.quantity + 1)}>+</Button>
                    </div>
                    <div className="ml-4">
                      <p className="text-lg font-medium text-gray-900">${(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                    <Button variant="ghost" className="ml-4" onClick={() => removeFromCart(item.name)}>Remove</Button>
                  </div>
                ))}
              </div>
              <div className="mt-8">
                <div className="flex justify-between text-base font-medium text-gray-900">
                  <p>Subtotal</p>
                  <p>${subtotal.toFixed(2)}</p>
                </div>
                <div className="flex justify-between text-base font-medium text-gray-900 mt-2">
                  <p>Tax</p>
                  <p>${tax.toFixed(2)}</p>
                </div>
                <div className="flex justify-between text-lg font-bold text-gray-900 mt-4">
                  <p>Total</p>
                  <p>${total.toFixed(2)}</p>
                </div>
                <div className="mt-6">
                  <Button className="w-full">Proceed to Payment</Button>
                </div>
                <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                  <p>
                    or{' '}
                    <Link href="/" className="font-medium text-blue-600 hover:text-blue-500">
                      Continue Shopping
                      <span aria-hidden="true"> &rarr;</span>
                    </Link>
                  </p>
                </div>
              </div>
            </>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}
