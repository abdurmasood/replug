"use client";

import React from 'react'
import { Search, Star } from 'lucide-react'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { useRouter } from 'next/navigation'
import { useCart } from '@/components/CartContext'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

const specialOffers = [
  {
    name: "Oil Change Kit",
    image: "/images/offers/oil-change-kit.png",
    originalPrice: 49.99,
    discountedPrice: 39.99,
    discount: 20,
    rating: 5,
  },
  {
    name: "Brake Pads",
    image: "/images/offers/brake-pads.png",
    originalPrice: 79.99,
    discountedPrice: 67.99,
    discount: 15,
    rating: 5,
  },
  {
    name: "Air Filters",
    image: "/images/offers/air-filters.png",
    originalPrice: 29.99,
    discountedPrice: 22.49,
    discount: 25,
    rating: 5,
  },
  {
    name: "Spark Plugs",
    image: "/images/offers/spark-plugs.png",
    originalPrice: 24.99,
    discountedPrice: 19.99,
    discount: 20,
    rating: 4,
  },
  {
    name: "Wiper Blades",
    image: "/images/offers/wiper-blades.png",
    originalPrice: 34.99,
    discountedPrice: 27.99,
    discount: 20,
    rating: 4,
  },
  {
    name: "Car Battery",
    image: "/images/offers/car-battery.png",
    originalPrice: 129.99,
    discountedPrice: 103.99,
    discount: 20,
    rating: 5,
  },
]

export default function SpecialOffersPage() {
  const router = useRouter()
  const { cartItems, addToCart, removeFromCart } = useCart()

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />

      <main className="container mx-auto px-4 py-8 flex-grow mb-16">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">Special Offers</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {specialOffers.map((offer, index) => (
            <Card key={index} className="overflow-hidden">
              <div className="relative">
                <img src={offer.image} alt={offer.name} className="w-full h-48 object-cover" />
                <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded">
                  {offer.discount}% OFF
                </div>
              </div>
              <CardHeader>
                <CardTitle>{offer.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center">
                  <div>
                    <span className="text-gray-500 line-through">${offer.originalPrice.toFixed(2)}</span>
                    <span className="text-2xl font-bold text-blue-600 ml-2">${offer.discountedPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex">
                    {[...Array(offer.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-current text-yellow-400" />
                    ))}
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full" onClick={() => addToCart({ id: index, name: offer.name, price: offer.discountedPrice, quantity: 1 })}>
                  Add to Cart
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  )
}
