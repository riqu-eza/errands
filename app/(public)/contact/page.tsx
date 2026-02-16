"use client";

import { useState } from "react";

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    const mailtoUrl = `mailto:hello@errandpro.co.ke?subject=Contact from ${formData.name}&body=${encodeURIComponent(formData.message)}`;
    window.open(mailtoUrl, "_blank");
    
    setLoading(false);
    setSuccess(true);
    setFormData({ name: "", email: "", message: "" });
    setTimeout(() => setSuccess(false), 3000);
  };

  return (
    <div className="max-w-xl mx-auto py-20 px-4">
      <h1 className="text-2xl font-light mb-8 text-gray-900">Contact</h1>
      
      <div className="space-y-6 mb-12 text-sm text-gray-600">
        <p>hello@errandpro.co.ke</p>
        <p>+254 700 000 000</p>
        <p>Nairobi, Kenya</p>
      </div>

      {success && (
        <div className="mb-6 text-sm text-green-600">
          Message sent. We&#39;ll reply soon.
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <input
          type="text"
          placeholder="Name"
          required
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full px-0 py-2 text-sm bg-transparent border-0 border-b border-gray-200 focus:border-gray-400 focus:ring-0 outline-none"
        />
        
        <input
          type="email"
          placeholder="Email"
          required
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="w-full px-0 py-2 text-sm bg-transparent border-0 border-b border-gray-200 focus:border-gray-400 focus:ring-0 outline-none"
        />
        
        <textarea
          placeholder="Message"
          required
          rows={4}
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          className="w-full px-0 py-2 text-sm bg-transparent border-0 border-b border-gray-200 focus:border-gray-400 focus:ring-0 outline-none resize-none"
        />
        
        <button
          type="submit"
          disabled={loading}
          className="text-sm text-gray-600 hover:text-gray-900 transition-colors disabled:opacity-50"
        >
          {loading ? 'Sending...' : 'Send message →'}
        </button>
      </form>
    </div>
  );
}