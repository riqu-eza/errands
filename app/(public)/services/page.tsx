/* eslint-disable @typescript-eslint/no-explicit-any */
import { connectDB } from "@/app/lib/mongodb";
import { Service } from "@/app/models/Service";
import { ServiceCard } from "@/components/marketing/ServiceCard";
import { 
  ShoppingBag, 
  FileText, 
  Package, 
  Pill, 
  Users, 
  Clock,
  Zap,
  Shield,
  Truck,
  ArrowRight
} from "lucide-react";
import Link from "next/link";

async function getServices() {
  await connectDB();
  return Service.find().sort({ createdAt: -1 });
}

const iconMap: Record<string, any> = {
  grocery: ShoppingBag,
  document: FileText,
  package: Package,
  pharmacy: Pill,
  queue: Users,
  custom: Zap,
  default: Package
};

export default async function ServicesPage() {
  const services = await getServices();

  // Featured services (you can make these dynamic later)
 

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <section className=" text-gray-700 py-12 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Our Services
          </h1>
          <p className="text-xl text-blue-600 max-w-2xl mx-auto">
            Comprehensive errand solutions tailored to your needs
          </p>
        </div>
      </section>

      {/* Features Bar */}
     

      {/* Main Services Grid */}
      

      {/* Database Services Section */}
      {services.length > 0 && (
        <div className="bg-gray-50 py-8 px-4">
          <div className="max-w-6xl mx-auto">
           
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
             {services.map((service: any) => (
  <ServiceCard key={service._id} service={service} />
))}
            </div>
          </div>
        </div>
      )}

      {/* How It Works */}
      {/* <section className="max-w-6xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
        <div className="grid md:grid-cols-4 gap-6">
          {[
            { step: "1", title: "Book", desc: "Tell us what you need done" },
            { step: "2", title: "Match", desc: "We assign a trusted runner" },
            { step: "3", title: "Track", desc: "Follow progress in real-time" },
            { step: "4", title: "Done", desc: "Get notified when complete" }
          ].map((item) => (
            <div key={item.step} className="text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                {item.step}
              </div>
              <h3 className="font-semibold mb-2">{item.title}</h3>
              <p className="text-gray-600 text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
      </section> */}

      {/* FAQ Teaser */}
      {/* <section className="bg-gray-50 py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Questions?</h2>
          <p className="text-gray-600 mb-8">
            Check out our FAQ or contact us directly
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/faq"
              className="px-8 py-3 bg-white border border-gray-300 rounded-xl hover:border-blue-300 transition-colors"
            >
              View FAQ
            </Link>
            <Link
              href="/contact"
              className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section> */}
    </div>
  );
}