import { Button } from "../ui/Button"
import Link from "next/link"
import { Clock, ShieldCheck, Truck } from "lucide-react"

export const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 to-indigo-100 py-24 px-6 rounded-3xl mb-16">
      {/* Background decorative elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
      
      <div className="relative max-w-5xl mx-auto text-center">
        {/* Badge */}
        <div className="inline-flex items-center bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 mb-8 shadow-sm border border-blue-100">
          <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse mr-2"></span>
          <span className="text-sm font-medium text-blue-800">🚀 Same-day delivery • Nairobi</span>
        </div>

        {/* Main heading */}
        <h1 className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight">
          <span className="bg-purple-600 bg-clip-text text-transparent">
            Your Time, 
          </span>
          <br />
          <span className="text-gray-900">
            Our Errands
          </span>
        </h1>

        {/* Description */}
        <p className="text-xl text-gray-700 mb-10 max-w-2xl mx-auto leading-relaxed">
          From grocery runs to document delivery — we handle Nairobi&#39;s daily grind so you can crush your goals.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
          <Link href="/book">
            <Button className="bg-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-6 text-lg shadow-lg hover:shadow-xl transition-all duration-300">
              Book an Errand Now
              <span className="ml-2">→</span>
            </Button>
          </Link>
          {/* <Link href="/how-it-works">
            <Button size="lg" variant="outline" className="border-2 border-gray-300 bg-white/80 backdrop-blur-sm hover:bg-white px-8 py-6 text-lg">
              Watch Demo
            </Button>
          </Link> */}
        </div>

        {/* Trust indicators */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
          <div className="flex items-center justify-center gap-2 text-gray-700">
            <ShieldCheck className="w-5 h-5 text-green-500" />
            <span className="text-sm font-medium">Insured & Bonded</span>
          </div>
          <div className="flex items-center justify-center gap-2 text-gray-700">
            <Clock className="w-5 h-5 text-blue-500" />
            <span className="text-sm font-medium">Timely Delivery</span>
          </div>
          {/* <div className="flex items-center justify-center gap-2 text-gray-700">
            <Truck className="w-5 h-5 text-purple-500" />
            <span className="text-sm font-medium">Real-time Tracking</span>
          </div> */}
        </div>
      </div>
    </section>
  )
}