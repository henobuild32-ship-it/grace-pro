import { Hero } from '@/components/grace/hero'
import { About } from '@/components/grace/about'
import { Services } from '@/components/grace/services'
import { Projects } from '@/components/grace/projects'
import { WhyGrace, Engagements } from '@/components/grace/why-engagements'
import { PartnersCTA } from '@/components/grace/partners'

export default function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <Services />
      <Projects />
      <WhyGrace />
      <Engagements />
      <PartnersCTA />
    </>
  )
}
