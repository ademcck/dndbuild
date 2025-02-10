import React, { useState, useEffect } from 'react';
import { FaFacebook, FaInstagram } from "react-icons/fa";
import { RiTwitterXFill } from "react-icons/ri";

export default function Footer() {
  const [inView, setInView] = useState(false);

  // Görünürlük kontrolü için scroll animasyonu
  useEffect(() => {
    const handleScroll = () => {
      const footer = document.getElementById("footer");
      if (footer.getBoundingClientRect().top < window.innerHeight) {
        setInView(true);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <footer
      id="footer"
      className={`bg-_black text-white pt-16 pb-8 ${inView ? 'animate-fadeIn' : 'opacity-0'}`}
    >
      <div className="container mx-auto px-6">
        {/* Footer Üst Bölüm */}
        <div className="flex flex-wrap justify-between gap-8 md:gap-16 text-center md:text-left">
          {/* İletişim Bölümü */}
          <div className="w-full sm:w-1/2 lg:w-1/4 mb-8">
            <h3 className="text-3xl font-bold text-gray-100 mb-4">Contact Us</h3>
            <p className="text-gray-400 mb-2">support@example.com</p>
            <p className="text-gray-400">+1 (800) 123-4567</p>
          </div>

          {/* Sosyal Medya Bağlantıları */}
          <div className="w-full sm:w-1/2 lg:w-1/4 mb-8">
            <h3 className="text-3xl font-bold text-gray-100 mb-4">Follow Us</h3>
            <div className="flex gap-6 justify-center md:justify-start">
              <a
                href="#"
                className="text-gray-400 hover:text-indigo-600 transition-all transform hover:scale-125"
              >
                <FaFacebook />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-indigo-600 transition-all transform hover:scale-125"
              >
                <RiTwitterXFill />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-indigo-600 transition-all transform hover:scale-125"
              >
                <FaInstagram />
              </a>
            </div>
          </div>

          {/* Hizmetler Bölümü */}
          <div className="w-full sm:w-1/2 lg:w-1/4 mb-8">
            <h3 className="text-3xl font-bold text-gray-100 mb-4">Services</h3>
            <ul className="space-y-2">
              <li className="text-gray-400 hover:text-indigo-600 transition-all transform hover:translate-x-2">
                <a href="#">Web Design</a>
              </li>
              <li className="text-gray-400 hover:text-indigo-600 transition-all transform hover:translate-x-2">
                <a href="#">SEO Services</a>
              </li>
              <li className="text-gray-400 hover:text-indigo-600 transition-all transform hover:translate-x-2">
                <a href="#">Marketing</a>
              </li>
            </ul>
          </div>

          {/* Genel Bilgiler */}
          <div className="w-full sm:w-1/2 lg:w-1/4 mb-8">
            <h3 className="text-3xl font-bold text-gray-100 mb-4">About Us</h3>
            <p className="text-gray-400">
              We are a company focused on delivering high-quality digital solutions. Our expertise lies in web design, SEO, and digital marketing.
            </p>
          </div>
        </div>

        {/* Footer Alt Bölümü */}
        <div className="border-t border-gray-700 mt-12 pt-6">
          <div className="flex justify-between items-center">
            <p className="text-gray-400 text-sm">
              &copy; 2024 YourCompany. All rights reserved.
            </p>
            <div className="flex gap-8">
              <a href="#" className="text-gray-400 hover:text-indigo-600">Privacy Policy</a>
              <a href="#" className="text-gray-400 hover:text-indigo-600">Terms of Service</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
