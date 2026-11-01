import Hero from '../components/sections/Hero'
import ImpactSnapshot from '../components/sections/ImpactSnapshot'
import FeaturedWork from '../components/sections/FeaturedWork'
import Brands from '../components/sections/Brands'
import HomeTestimonial from '../components/sections/HomeTestimonial'

export default function Home() {
  return (
    <>
      {/* 1. Hero */}
      <Hero />

      {/* 2. Latest Works: the projects, one frame each, then a practice, a workshop and a piece of writing under the same title */}
      <FeaturedWork />

      {/* 3. Scale: grid blocks */}
      <ImpactSnapshot />

      {/* 4. Brands worked with, then one voice */}
      <Brands />
      <HomeTestimonial />

    </>
  )
}
