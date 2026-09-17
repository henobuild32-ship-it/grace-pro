'use client'

import { Navbar } from '@/components/grace/navbar'
import { Hero } from '@/components/grace/hero'
import { About } from '@/components/grace/about'
import { Services } from '@/components/grace/services'
import { Projects } from '@/components/grace/projects'
import { WhyGrace, Engagements } from '@/components/grace/why-engagements'
import { PartnersCTA, PartnershipForm } from '@/components/grace/partners'
import { Contact } from '@/components/grace/contact'
import { Footer } from '@/components/grace/footer'

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-night grain-overlay">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <About />
        <Services />
        <Projects />
        <WhyGrace />
        <Engagements />
        <PartnersCTA />
        <PartnershipForm />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}
