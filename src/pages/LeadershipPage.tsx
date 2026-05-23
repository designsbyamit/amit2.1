import PageHeader from '../components/ui/PageHeader'
import Journey from '../components/sections/Journey'
import Leadership from '../components/sections/Leadership'

export default function LeadershipPage() {
  return (
    <>
      <PageHeader
        label="Leadership"
        title="Design is a leadership practice."
        subtitle="The career arc, the philosophy, and what I've learned about making design matter inside large organizations — where influence is earned, not assigned."
      />
      <Journey />
      <Leadership />
    </>
  )
}
