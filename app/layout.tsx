import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: {
    default: "YourBrand – Professional Services",
    template: "%s | YourBrand",
  },
  description:
    "Premium professional services tailored to your needs. Quality, reliability, and results you can trust.",
  keywords: ["professional services", "booking", "consulting", "business"],
  metadataBase: new URL("https://yourdomain.com"),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col bg-white text-gray-900">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer
         />
      </body>
    </html>
  );
}
