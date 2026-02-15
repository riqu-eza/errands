import type { Metadata } from "next";
import { Users, Target, Shield, Award, Clock, Heart } from "lucide-react";
import Image from "next/image";

export const metadata: Metadata = {
  title: "About Us - ErrandPro Nairobi",
  description:
    "Learn more about our mission, values, and commitment to excellence in Nairobi's errand service industry.",
};

export default function AboutPage() {
  const values = [
    {
      icon: Shield,
      title: "Trust & Safety",
      description:
        "All our runners are vetted, insured, and background-checked for your peace of mind.",
    },
    {
      icon: Clock,
      title: "Reliability",
      description:
        "We deliver on time, every time. Your schedule is our priority.",
    },
    {
      icon: Target,
      title: "Efficiency",
      description: "Optimized routes and processes to save you maximum time.",
    },
    {
      icon: Heart,
      title: "Customer First",
      description: "Your satisfaction drives everything we do.",
    },
  ];

  const stats = [
    { value: "5,000+", label: "Errands Completed" },
    { value: "2,500+", label: "Happy Clients" },
    { value: "98%", label: "Satisfaction Rate" },
    { value: "15 min", label: "Avg Response Time" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}

      {/* Stats Section */}
      {/* <section className="max-w-6xl mx-auto px-4 -mt-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-xl p-6 text-center hover:shadow-2xl transition-shadow"
            >
              <div className="text-3xl font-bold text-blue-600 mb-2">{stat.value}</div>
              <div className="text-gray-600 text-sm">{stat.label}</div>
            </div>
          ))}
        </div>
      </section> */}

      {/* Story Section */}
      <section className="max-w-6xl mx-auto px-4 py-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Our Story</h2>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                JdErrands was born from a simple observation: Nairobi
                professionals were spending hours each week on tasks that could
                easily be handled by someone else. The traffic, the queues, the
                endless running around — it was eating into valuable time that
                could be spent with family, on business growth, or simply
                relaxing.
              </p>
              <p>
                In 2025, we started with a small team of 5 runners and a mission
                to give Nairobi back its time. Today, we&#39;ve grown to over 50
                trusted runners serving thousands of satisfied customers across
                the city.
              </p>
              <p>
                We understand Nairobi — the shortcuts, the best times to avoid
                traffic, the most efficient routes. This local knowledge,
                combined with our commitment to excellence, makes us the
                preferred choice for errand services in the city.
              </p>
            </div>
          </div>
          <div className="bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl p-1">
            <div className="bg-white rounded-2xl p-8 h-full">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Users className="w-6 h-6 text-blue-600" />{" "}
                <span className="text-gray-800" > Our Mission</span>
              </h3>
              <p className="text-gray-700 mb-6">
                To free up Nairobi&#39;s time by handling the daily grind, so
                individuals and businesses can focus on what truly matters to
                them.
              </p>
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Award className="w-6 h-6 text-blue-600" />
                 <span className="text-gray-800" >Our Vision</span>
              </h3>
              <p className="text-gray-700">
                To become the most trusted and reliable errand service in East
                Africa, setting the standard for professionalism and efficiency.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="bg-gray-50 py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-black text-center mb-12">
            Our Core Values
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <div
                  key={index}
                  className="bg-white rounded-2xl p-6 text-center hover:shadow-xl transition-shadow"
                >
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-emerald-700 mb-2">{value.title}</h3>
                  <p className="text-gray-600 text-sm">{value.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team Section */}
      {/* <section className="max-w-6xl mx-auto px-4 py-20">
        <h2 className="text-3xl font-bold text-center mb-4">Meet Our Leadership</h2>
        <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
          The dedicated team behind Nairobi's most reliable errand service
        </p>
        <div className="grid md:grid-cols-3 gap-8">
          {[1, 2, 3].map((i) => (
            <div key={i} className="text-center">
              <div className="w-32 h-32 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full mx-auto mb-4 flex items-center justify-center text-white text-4xl font-bold">
                {['J', 'S', 'M'][i-1]}
              </div>
              <h3 className="font-semibold text-lg">
                {['James Mwangi', 'Sarah Wanjiku', 'Michael Omondi'][i-1]}
              </h3>
              <p className="text-blue-600 text-sm mb-2">
                {['CEO & Founder', 'Operations Director', 'Customer Experience'][i-1]}
              </p>
              <p className="text-gray-500 text-sm">
                {['10+ years experience', '8+ years logistics', '7+ years service'][i-1]}
              </p>
            </div>
          ))}
        </div>
      </section> */}

      {/* CTA Section */}
      {/* <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Save Time?</h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of Nairobi residents who trust us with their daily errands
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/book"
              className="bg-white text-blue-600 px-8 py-3 rounded-xl font-semibold hover:bg-gray-100 transition-colors"
            >
              Book an Errand
            </a>
            <a
              href="/contact"
              className="border-2 border-white text-white px-8 py-3 rounded-xl font-semibold hover:bg-white hover:text-blue-600 transition-colors"
            >
              Contact Us
            </a>
          </div>
        </div>
      </section> */}
    </div>
  );
}
