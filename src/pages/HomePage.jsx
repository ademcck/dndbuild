import React from 'react'
import HeaderComponent from '../components/header/HeaderComponent'
import HeroSectionWithVideo from '../components/Hero/HeroComponent'
import ServicesSection from '../components/Hero/ServicesComponent'
import Footer from '../components/Footer/FooterComponent'
import FAQSection from '../components/Hero/QuestionsComponent'

export default function HomePage() {
  return (
    <>
    <HeaderComponent />
    <HeroSectionWithVideo />
    <ServicesSection />
    <FAQSection />
    <Footer />
    </>
  )
}
