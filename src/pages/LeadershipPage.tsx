import heroImg from '../assets/images/amit-stage.jpg'
import PageHeader from '../components/ui/PageHeader'
import Journey from '../components/sections/Journey'
import LeadershipStories from '../components/sections/LeadershipStories'
import LeadershipInitiatives from '../components/sections/LeadershipInitiatives'
import LeadershipArticles from '../components/sections/LeadershipArticles'

export default function LeadershipPage() {
  return (
    <>
      <PageHeader
        label="Leadership"
        title="Design is a leadership practice."
        subtitle="The career arc, the philosophy, and what I've learned about making design matter inside large organizations — where influence is earned, not assigned."
        image={heroImg}
        imageAlt="Amit Kumar Tiwari on stage"
      />
      <Journey />
      <LeadershipStories />
      <LeadershipInitiatives />
      <LeadershipArticles />
    </>
  )
}
