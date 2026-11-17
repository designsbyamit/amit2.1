import { useEffect } from 'react'
import Prologue from '../components/home2/Prologue'
import Proof from '../components/home2/Proof'
import Multiplier from '../components/home2/Multiplier'
import Numbers from '../components/home2/Numbers'
import AtlasWindow from '../components/home2/AtlasWindow'
import BrandsFlow from '../components/home2/BrandsFlow'
import Close from '../components/home2/Close'
import Thread from '../components/home2/Thread'
import { ScrollTrigger } from '../components/home2/scene'

/**
 * The home page as one continuous story, told in scroll:
 * Hello → the gap I work in → three forces meet → the work, through the dot → the dot multiplies into teams and a community → the scale → the career atlas → the brands → what's next.
 */
export default function HomeV2() {
  useEffect(() => {
    // Fonts and covers change the page height after first paint: measure again once they settle.
    const again = () => { ScrollTrigger.sort(); ScrollTrigger.refresh() }
    document.fonts?.ready.then(again)
    window.addEventListener('load', again)
    const t = window.setTimeout(again, 1200)
    return () => { window.removeEventListener('load', again); window.clearTimeout(t) }
  }, [])

  return (
    <div className="home2">
      <Thread />
      <Prologue />
      <Proof />
      <Multiplier />
      <Numbers />
      <AtlasWindow />
      <BrandsFlow />
      <Close />
    </div>
  )
}
