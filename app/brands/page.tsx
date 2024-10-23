'use client'

import React, { useState } from 'react'
import { Input } from "@/components/ui/input"
import { ChevronRight } from 'lucide-react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

const brandData = [
  { name: 'Toyota', logo: '/images/brands/toyota.png', url: 'https://www.toyota.com/' },
  { name: 'Hyundai', logo: '/images/brands/hyundai.png', url: 'https://www.hyundai.com/worldwide/en' },
  { name: 'Kia', logo: '/images/brands/kia.png', url: 'https://www.kia.com/us/en' },
  { name: 'Honda', logo: '/images/brands/honda.png', url: 'https://global.honda/en/' },
  { name: 'Ford', logo: '/images/brands/ford.png', url: 'https://www.ford.com/' },
]

export default function BrandsPage() {
  const [searchTerm, setSearchTerm] = useState('')

  const filteredBrands = brandData.filter(brand =>
    brand.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-50 to-gray-100">
      <Header />

      <main className="flex-grow container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-4">Discover Our Brands</h2>
          <p className="text-center text-gray-600 mb-8">Explore our curated selection of top-quality automotive brands</p>

          <div className="mb-12">
            <Input
              type="text"
              placeholder="Search brands..."
              className="w-full max-w-md mx-auto"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {filteredBrands.map((brand, index) => (
              <div key={index} className="group">
                <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center justify-center transition-all duration-300 group-hover:shadow-lg group-hover:-translate-y-1">
                  <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4 overflow-hidden">
                    <img
                      src={brand.logo}
                      alt={`${brand.name} logo`}
                      className="w-20 h-20 object-contain transition-transform duration-300 group-hover:scale-110"
                    />
                  </div>
                  <h3 className="text-lg font-semibold text-center text-gray-800 group-hover:text-primary">{brand.name}</h3>
                  <div className="mt-2">
                    <a 
                      href={brand.url} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-gray-400 hover:text-primary transition-colors duration-300"
                      title="Visit Official Site"
                    >
                      <ChevronRight className="h-5 w-5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
