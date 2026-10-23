import Hero from '../components/sections/Hero'
import ImpactSnapshot from '../components/sections/ImpactSnapshot'
import Latest from '../components/sections/Latest'
import FeaturedWork from '../components/sections/FeaturedWork'
import Brands from '../components/sections/Brands'
import HomeTestimonial from '../components/sections/HomeTestimonial'

export default function Home() {
  return (
    <>
      {/* 1. Hero */}
      <Hero />

      {/* 2. Latest Works: three projects, one frame each */}
      <FeaturedWork />

      {/* 3. Latest: a leadership practice, a workshop and a piece of writing */}
      <Latest />

      {/* 3. Scale: grid blocks */}
      <ImpactSnapshot />

      {/* 4. Brands worked with, then one voice */}
      <Brands />
      <HomeTestimonial />

    </>
  )
}
