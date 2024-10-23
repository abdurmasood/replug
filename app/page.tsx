"use client";

import React, { useState, useEffect } from 'react'
import { Search, Star, Truck, Phone, ChevronRight, X } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useCart } from '@/components/CartContext'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import Image from 'next/image'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function Homepage() {
  useEffect(() => {
    if (!window.location.hash) {
      window.scrollTo(0, 0);
    }
  }, []);

  const router = useRouter()
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedVehicle, setSelectedVehicle] = useState({ make: '', model: '', year: '' })
  const { cartItems, addToCart, removeFromCart } = useCart()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 500], [0, 50])

  const [heroAnimationComplete, setHeroAnimationComplete] = useState(false)
  const [shopNowButtonDisplayed, setShopNowButtonDisplayed] = useState(false)

  const [currentBackgroundIndex, setCurrentBackgroundIndex] = useState(0)
  const [nextBackgroundIndex, setNextBackgroundIndex] = useState(1)
  const backgroundImages = [
    "/images/home/hero-background.jpeg",
    "/images/home/hero-background2.jpeg",
    "/images/home/hero-background3.jpeg",
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBackgroundIndex((prevIndex) => 
        (prevIndex + 1) % backgroundImages.length
      )
      setNextBackgroundIndex((prevIndex) => 
        (prevIndex + 1) % backgroundImages.length
      )
    }, 10000) // Change image every 7 seconds

    return () => clearInterval(interval)
  }, [])

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log('Searching for:', searchQuery)
    // Here you would typically fetch search results from an API
  }

  const handleVehicleSelect = (name: string, value: string) => {
    setSelectedVehicle((prev) => ({ ...prev, [name]: value }));
  }

  const handleLogin = () => {
    router.push('/login')
  }

  const handleCheckout = () => {
    setIsCartOpen(false)
    router.push('/checkout')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex flex-col">
      <Header />

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 flex-grow mb-16">
        {/* Hero Section */}
        <motion.section 
          className="mb-16 relative overflow-hidden rounded-2xl shadow-2xl h-[400px]"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.645, 0.045, 0.355, 1.000] }}
        >
          {/* Current background image */}
          <motion.div
            key={`current-${currentBackgroundIndex}`}
            initial={{ opacity: 1 }}
            animate={{ opacity: 0 }}
            transition={{ duration: 2, ease: "easeInOut" }}
            style={{ y }}
            className="absolute inset-0 h-[120%] -top-[10%]"
          >
            <Image
              src={backgroundImages[currentBackgroundIndex]}
              alt="Car parts"
              layout="fill"
              objectFit="cover"
              className="object-cover w-full h-full"
            />
          </motion.div>

          {/* Next background image */}
          <motion.div
            key={`next-${nextBackgroundIndex}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2, ease: "easeInOut" }}
            style={{ y }}
            className="absolute inset-0 h-[120%] -top-[10%]"
          >
            <Image
              src={backgroundImages[nextBackgroundIndex]}
              alt="Car parts"
              layout="fill"
              objectFit="cover"
              className="object-cover w-full h-full"
            />
          </motion.div>

          {/* Overlay and content */}
          <motion.div 
            className="absolute inset-0 bg-gradient-to-r from-blue-900/80 to-transparent flex items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            <div className="text-white p-8 md:p-16 max-w-2xl">
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.5 }}
                className="text-4xl md:text-5xl font-bold mb-4"
              >
                Your One-Stop Shop for Quality Car Parts
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 0.5 }}
                className="text-xl mb-8"
              >
                Find the perfect parts for your vehicle with ease and confidence.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2, duration: 0.5 }}
                onAnimationComplete={() => setShopNowButtonDisplayed(true)}
              >
                <Button className="bg-blue-500 hover:bg-blue-600 text-lg py-3 px-8">
                  Shop Now
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </motion.section>

        {/* Search Section */}
        <motion.section 
          className="mb-16 bg-white p-8 rounded-2xl shadow-lg"
          initial={{ opacity: 0, y: 50 }}
          animate={shopNowButtonDisplayed ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">Find the Right Part for Your Vehicle</h2>
          <form onSubmit={handleSearch} className="max-w-3xl mx-auto">
            <div className="flex mb-4">
              <Input
                type="text"
                placeholder="Enter part name or number"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-grow rounded-r-none"
              />
              <Button type="submit" className="rounded-l-none bg-blue-600 hover:bg-blue-700">
                <Search className="h-4 w-4 mr-2" />
                Search
              </Button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Select name="make" value={selectedVehicle.make} onValueChange={(value) => handleVehicleSelect('make', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Make" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="toyota">Toyota</SelectItem>
                  <SelectItem value="honda">Honda</SelectItem>
                  <SelectItem value="ford">Ford</SelectItem>
                </SelectContent>
              </Select>
              <Select name="model" value={selectedVehicle.model} onValueChange={(value) => handleVehicleSelect('model', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Model" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="camry">Camry</SelectItem>
                  <SelectItem value="civic">Civic</SelectItem>
                  <SelectItem value="f150">F-150</SelectItem>
                </SelectContent>
              </Select>
              <Select name="year" value={selectedVehicle.year} onValueChange={(value) => handleVehicleSelect('year', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Year" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2022">2022</SelectItem>
                  <SelectItem value="2021">2021</SelectItem>
                  <SelectItem value="2020">2020</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </form>
        </motion.section>

        {/* Featured Categories */}
        <section className="">
          <h2 className="text-4xl font-bold mb-12 text-center text-gray-800">
            <span className="relative">
              Popular Categories
              <span className="absolute bottom-0 left-0 w-full h-1 bg-blue-500 transform scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></span>
            </span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { name: 'Brakes', image: '/images/parts/brakes.png', description: 'High-performance brake pads, rotors, and calipers' },
              { name: 'Engine Parts', image: '/images/parts/engine.png', description: 'Quality components for optimal engine performance' },
              { name: 'Filters', image: '/images/parts/filter.png', description: 'Air, oil, and fuel filters for efficient operation' },
              { name: 'Suspensions', image: '/images/parts/suspension.png', description: 'Shocks, struts, and springs for a smooth ride' }
            ].map((category, index) => (
              <motion.div
                key={category.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05, boxShadow: '0 10px 20px rgba(0,0,0,0.1)' }}
                className="bg-white rounded-2xl shadow-md overflow-hidden transition-all duration-300 transform hover:-translate-y-2 group flex flex-col"
              >
                <div className="relative h-48 bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden">
                  <Image 
                    src={category.image} 
                    alt={category.name} 
                    layout="fill"
                    objectFit="contain"
                    className="p-6 transition-transform duration-300 group-hover:scale-110"
                  />
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="font-semibold text-xl mb-2 text-gray-800 group-hover:text-blue-600 transition-colors duration-300">{category.name}</h3>
                  <p className="text-gray-600 text-sm mb-4 flex-grow">{category.description}</p>
                  <Button className="w-full bg-gray-800 hover:bg-gray-900 transition-colors duration-300 group-hover:bg-blue-600 mt-auto">
                    Explore {category.name}
                    <ChevronRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Special Offers */}
        <section className="relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-50 to-purple-50 transform -skew-y-6 z-0"></div>
          <div className="relative z-1 py-20">
            <div className="container mx-auto px-4">
              <h2 className="text-4xl font-bold mb-12 text-center text-gray-800">
                Special Offers
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[
                  { id: 1, name: 'Oil Change Kit', discount: '20%', originalPrice: 49.99, discountedPrice: 39.99, image: '/images/offers/oil-change-kit.png' },
                  { id: 2, name: 'Brake Pads', discount: '15%', originalPrice: 79.99, discountedPrice: 67.99, image: '/images/offers/brake-pads.png' },
                  { id: 3, name: 'Air Filters', discount: '25%', originalPrice: 29.99, discountedPrice: 22.49, image: '/images/offers/air-filters.png' }
                ].map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.2 }}
                    className="bg-white rounded-lg shadow-xl overflow-hidden transform transition-all duration-300 hover:scale-105"
                  >
                    <div className="relative">
                      <Image 
                        src={item.image} 
                        alt={item.name} 
                        width={400}
                        height={300}
                        objectFit="cover"
                        className="w-full h-48 object-cover"
                      />
                      <div className="absolute top-0 right-0 bg-red-500 text-white px-4 py-2 rounded-bl-lg font-bold">
                        {item.discount} OFF
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="font-semibold text-xl mb-2 text-gray-800">{item.name}</h3>
                      <div className="flex justify-between items-center mb-4">
                        <div className="flex items-baseline">
                          <span className="text-gray-500 line-through text-sm mr-2">${item.originalPrice.toFixed(2)}</span>
                          <span className="text-blue-600 font-bold text-2xl">${item.discountedPrice.toFixed(2)}</span>
                        </div>
                        <div className="text-yellow-400">
                          {'★'.repeat(5)}
                        </div>
                      </div>
                      <Button 
                        onClick={() => addToCart({ id: item.id, name: item.name, price: item.discountedPrice, quantity: 1 })} 
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white transition-colors duration-300"
                      >
                        Add to Cart
                      </Button>
                    </div>
                  </motion.div>
                ))}
              </div>
              <div className="text-center mt-12">
                <Link href="/offers" passHref>
                  <Button className="bg-transparent text-blue-600 hover:bg-blue-50 border-2 border-blue-600 px-8 py-3 rounded-full transition-all duration-300 transform hover:scale-105">
                    View All Offers
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Trust Indicators */}
        <section className="mb-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <motion.div whileHover={{ scale: 1.05 }} className="flex flex-col items-center text-center">
                <div className="bg-yellow-100 rounded-full p-6 mb-4">
                  <Star className="h-12 w-12 text-yellow-500" />
                </div>
                <h3 className="font-semibold text-xl mb-2 text-blue-800">4.8/5 Customer Rating</h3>
                <p className="text-gray-600">Based on 10,000+ reviews</p>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} className="flex flex-col items-center text-center">
                <div className="bg-blue-100 rounded-full p-6 mb-4">
                  <Truck className="h-12 w-12 text-blue-500" />
                </div>
                <h3 className="font-semibold text-xl mb-2 text-blue-800">Free Shipping</h3>
                <p className="text-gray-600">On orders over $50</p>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} className="flex flex-col items-center text-center">
                <div className="bg-green-100 rounded-full p-6 mb-4">
                  <Phone className="h-12 w-12 text-green-500" />
                </div>
                <h3 className="font-semibold text-xl mb-2 text-blue-800">Expert Support</h3>
                <p className="text-gray-600">Available 7 days a week</p>
              </motion.div>
            </div>
          </div>
        </section>
      </main>

      <Footer />

      {/* Cart Sidebar */}
      <AnimatePresence>
        {isCartOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-50"
          >
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween' }}
              className="absolute right-0 top-0 h-full w-80 bg-white p-6 shadow-lg"
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-blue-800">Your Cart</h2>
                <button onClick={() => setIsCartOpen(false)} className="text-gray-500 hover:text-gray-700">
                  <X className="h-6 w-6" />
                </button>
              </div>
              {cartItems.length === 0 ? (
                <p className="text-gray-500 text-center">Your cart is empty</p>
              ) : (
                <ul className="space-y-4 mb-6">
                  {cartItems.map((item) => (
                    <li key={item.name} className="flex justify-between items-center pb-2 border-b">
                      <div>
                        <h3 className="font-semibold">{item.name}</h3>
                        <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                      </div>
                      <button onClick={() => removeFromCart(item.name)} className="text-red-500 hover:text-red-700">
                        Remove
                      </button>
                    </li>
                  ))}
                </ul>
              )}
              <Button 
                className="w-full py-3 text-lg font-semibold" 
                disabled={cartItems.length === 0}
                onClick={handleCheckout}
              >
                Proceed to Checkout
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
