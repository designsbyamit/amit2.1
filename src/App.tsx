import Nav from './components/layout/Nav'
import Footer from './components/layout/Footer'
import Hero from './components/sections/Hero'
import ImpactSnapshot from './components/sections/ImpactSnapshot'
import Journey from './components/sections/Journey'
import StrategicWork from './components/sections/StrategicWork'
import AINativeDesign from './components/sections/AINativeDesign'
import DesignSystems from './components/sections/DesignSystems'
import Leadership from './components/sections/Leadership'
import Community from './components/sections/Community'
import Reflections from './components/sections/Reflections'
import Vision from './components/sections/Vision'
import Resources from './components/sections/Resources'
import Contact from './components/sections/Contact'

export default function App() {
  return (
    <div className="bg-black text-white min-h-screen">
      <Nav />
      <main>
        <Hero />
        <ImpactSnapshot />
        <Journey />
        <StrategicWork />
        <AINativeDesign />
        <DesignSystems />
        <Leadership />
        <Community />
        <Reflections />
        <Vision />
        <Resources />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}
