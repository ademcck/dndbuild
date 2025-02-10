import React from 'react';
import background from '../../assets/background.mp4';

export default function HeroSectionWithVideo() {
  return (
    <section className="relative w-full h-screen overflow-hidden bg-gray-900 font-sans">
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src={background} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-gray-900 opacity-80"></div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-6 text-white text-center lg:px-8">
        <div className="max-w-4xl space-y-6">
          <h1 className="text-4xl opacity-80 hover:opacity-100 md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight">
            Design Smarter, Not Harder
          </h1>
          <p className="text-lg md:text-xl tracking-widest text-gray-300 leading-relaxed">
            Create visually stunning designs with effortless drag-and-drop functionality. 
            Simplify your workflow and bring your ideas to life in minutes.
          </p>
          <div className="mt-6 flex justify-center gap-6">
            <a
              href="/dndapp"
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-8 rounded-md shadow-lg transition-all hover:shadow-xl hover:-translate-y-1"
            >
              Get Started
            </a>
            <a
              href="#learn-more"
              className="bg-transparent border border-gray-300 text-gray-300 font-medium py-3 px-8 rounded-md shadow-lg transition-all hover:bg-gray-100 hover:text-gray-900 hover:shadow-xl hover:-translate-y-1"
            >
              Learn More
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
