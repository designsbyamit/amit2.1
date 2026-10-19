import PageHeader from '../components/ui/PageHeader'
import Community from '../components/sections/Community'

export default function CommunityPage() {
  return (
    <>
      <PageHeader
        label="Community"
        title="Building the design culture we want to work in."
        subtitle="Design doesn't happen in isolation. The community initiatives, events, and collaborations that extend the practice beyond organizational walls."
      />
      <Community />
    </>
  )
}
