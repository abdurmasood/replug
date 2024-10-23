import React from 'react'
import { ChevronRight, Search } from 'lucide-react'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import Header from '@/components/Header'
import Footer from '@/components/Footer'

const carPartsData = [
  {
    category: "Engine Components",
    icon: "🔧",
    parts: [
      "Pistons", "Camshafts", "Crankshafts", "Cylinder heads", "Gaskets", "Timing belts",
      "Fuel injectors", "Fuel pumps", "Fuel tanks", "Carburetors", "Fuel filters",
      "Radiators", "Water pumps", "Hoses", "Thermostats", "Mufflers",
      "Catalytic converters", "Headers", "Exhaust pipes"
    ]
  },
  {
    category: "Transmission and Drivetrain",
    icon: "⚙️",
    parts: [
      "Gears", "Clutches", "Flywheels", "Torque converters", "Transmission fluids",
      "Driveshafts", "CV joints", "U-joints", "Axle shafts", "Pressure plates",
      "Clutch disks", "Release bearings"
    ]
  },
  {
    category: "Suspension and Steering",
    icon: "🚗",
    parts: [
      "Shocks", "Struts", "Coil springs", "Control arms", "Bushings", "Steering racks",
      "Tie rods", "Ball joints", "Power steering pumps", "Wheel bearings", "Hub assemblies"
    ]
  },
  {
    category: "Braking System",
    icon: "🛑",
    parts: [
      "Brake pads", "Brake rotors", "Brake calipers", "Brake lines",
      "Brake master cylinders", "ABS components"
    ]
  },
  {
    category: "Electrical and Electronic",
    icon: "⚡",
    parts: [
      "Alternators", "Starters", "Batteries", "Oxygen sensors", "Mass airflow sensors",
      "Throttle position sensors", "Headlights", "Tail lights", "Fog lights",
      "Turn signals", "LED upgrades", "Wiring harnesses", "Fuses"
    ]
  },
  {
    category: "Body and Exterior",
    icon: "🚘",
    parts: [
      "Fenders", "Bumpers", "Hoods", "Doors", "Mirrors", "Grilles", "Moldings",
      "Windows", "Windshields", "Window regulators", "Wipers", "Windshield washer systems"
    ]
  },
  {
    category: "Interior Components",
    icon: "💺",
    parts: [
      "Seats", "Seat covers", "Upholstery", "Instrument clusters", "Controls",
      "Switches", "Vents", "Steering wheels", "Shift knobs", "Floor mats",
      "Headliners", "Trim pieces"
    ]
  },
  {
    category: "Performance Parts",
    icon: "🏎️",
    parts: [
      "Turbochargers", "Superchargers", "Cold air intakes", "Performance exhaust systems",
      "Aftermarket suspension kits", "Performance brakes", "Big brake kits"
    ]
  },
  {
    category: "Wheels and Tires",
    icon: "🛞",
    parts: [
      "Alloy wheels", "Steel rims", "Custom wheels", "All-season tires",
      "Performance tires", "Off-road tires", "Snow tires", "Lug nuts",
      "Spacers", "Tire pressure sensors"
    ]
  },
  {
    category: "Accessories and Add-ons",
    icon: "🔧",
    parts: [
      "Roof racks", "Spoilers", "Body kits", "Running boards", "Car seat covers",
      "Phone mounts", "Sun shades", "Steering wheel covers", "Performance gauges",
      "Turbo timers", "Shift lights", "Car cleaning supplies", "Wax", "Detailing kits"
    ]
  },
  {
    category: "Audio and Entertainment",
    icon: "🔊",
    parts: [
      "Head units (stereos, touchscreens)", "Speakers", "Subwoofers", "Amplifiers",
      "Bluetooth systems", "GPS systems"
    ]
  },
  {
    category: "Safety Equipment",
    icon: "🛡️",
    parts: [
      "Airbags", "Seatbelt components", "Backup cameras", "Parking sensors",
      "Tire pressure monitoring systems (TPMS)"
    ]
  },
  {
    category: "OEM vs. Aftermarket",
    icon: "🏭",
    parts: [
      "OEM (Original Equipment Manufacturer) parts", "Aftermarket parts"
    ]
  },
  {
    category: "Classic or Rare Car Parts",
    icon: "🚙",
    parts: [
      "Vintage car parts", "Restoration parts for classic cars"
    ]
  }
]

export default function CarPartsPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />

      <main className="container mx-auto px-4 py-8 flex-grow mb-16">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">Car Parts Catalog</h2>

        <div className="mb-8">
          <form className="flex w-full max-w-sm mx-auto">
            <Input
              type="text"
              placeholder="Search parts..."
              className="rounded-r-none"
            />
            <Button type="submit" className="rounded-l-none bg-blue-600 hover:bg-blue-700">
              <Search className="h-4 w-4 mr-2" />
              Search
            </Button>
          </form>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {carPartsData.map((category, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow flex flex-col">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <span className="text-2xl mr-2">{category.icon}</span>
                  {category.category}
                </CardTitle>
              </CardHeader>
              <CardContent className="flex-grow">
                <CardDescription>
                  {category.parts.slice(0, 3).join(", ")}
                  {category.parts.length > 3 && "..."}
                </CardDescription>
              </CardContent>
              <CardFooter>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" className="w-full">
                      View All <ChevronRight className="h-4 w-4 ml-2" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-3xl">
                    <DialogHeader>
                      <DialogTitle>{category.category}</DialogTitle>
                      <DialogDescription>
                        Browse all parts in this category
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                      {category.parts.map((part, partIndex) => (
                        <Link 
                          key={partIndex} 
                          href="#" 
                          className="text-blue-600 hover:underline"
                        >
                          {part}
                        </Link>
                      ))}
                    </div>
                  </DialogContent>
                </Dialog>
              </CardFooter>
            </Card>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  )
}
