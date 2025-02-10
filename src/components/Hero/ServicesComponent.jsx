import React, { useEffect, useRef, useState } from 'react';

export default function ServicesSection() {
  const [inView, setInView] = useState(false);
  const serviceRef = useRef(null);

  // Observer işlemi için efektler
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            // Öğeyi görünür olduğunda animasyon başlat
            setInView(true);
          } 
        });
      },
      { threshold: 0.5 } // %50'si görünür olduğunda tetiklesin
    );
    
    if (serviceRef.current) {
      observer.observe(serviceRef.current);
    }
    
    return () => {
      if (serviceRef.current) {
        observer.unobserve(serviceRef.current);
      }
    };
  }, []);

  return (
    <section className="py-16 bg-gray-900 text-white font-sans">
      <div className="container mx-auto px-6 text-center">
        {/* Başlık */}
        <h2 className="text-4xl font-bold text-gray-100 mb-12">
          Our Premium Services
        </h2>

        {/* Hizmetler */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Hizmet 1 */}
          <div
            ref={serviceRef}
            className={`flex flex-col items-center p-6 bg-gray-800 rounded-lg shadow-xl hover:shadow-2xl transition-all transform ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'} duration-500`}
          >
            <img
              src="https://indepth.com.au/wp-content/uploads/XCY-website-1024x567.jpg"
              alt="Service 1"
              className="w-32 h-32 object-cover mb-6 rounded-full shadow-lg"
            />
            <h3 className="text-2xl font-semibold text-gray-100 mb-2">
              Custom Web Design
            </h3>
            <p className="text-gray-400">
              Tailored web design services that will help bring your unique vision to life with engaging and interactive layouts.
            </p>
          </div>

          {/* Hizmet 2 */}
          <div
            className={`flex flex-col items-center p-6 bg-gray-800 rounded-lg shadow-xl hover:shadow-2xl transition-all transform ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'} duration-500`}
          >
            <img
              src="https://digitalcatalyst.in/blog/wp-content/uploads/2022/03/major-components-of-digital-marketing.png"
              alt="Service 2"
              className="w-32 h-32 object-cover mb-6 rounded-full shadow-lg"
            />
            <h3 className="text-2xl font-semibold text-gray-100 mb-2">
              Digital Marketing
            </h3>
            <p className="text-gray-400">
              Boost your brand with our digital marketing solutions, including SEO, PPC, and social media strategies that work.
            </p>
          </div>

          {/* Hizmet 3 */}
          <div
            className={`flex flex-col items-center p-6 bg-gray-800 rounded-lg shadow-xl hover:shadow-2xl transition-all transform ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'} duration-500`}
          >
            <img
              src="https://media.licdn.com/dms/image/v2/D4D12AQF7eJtl8Z_htA/article-cover_image-shrink_720_1280/article-cover_image-shrink_720_1280/0/1700482467233?e=2147483647&v=beta&t=my9mXidM-NozEeWFbFqqkn4pmEtwLJ3uiL5-JDA7bCA"
              alt="Service 3"
              className="w-32 h-32 object-cover mb-6 rounded-full shadow-lg"
            />
            <h3 className="text-2xl font-semibold text-gray-100 mb-2">
              E-commerce Solutions
            </h3>
            <p className="text-gray-400">
              Develop an online store with easy-to-use features and an intuitive interface to increase conversions and sales.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
