import PageHeader from '../components/ui/PageHeader'
import StrategicWork from '../components/sections/StrategicWork'
import DesignSystems from '../components/sections/DesignSystems'

export default function Craft() {
  return (
    <>
      <PageHeader
        label="Craft"
        title="Work that matters at scale."
        subtitle="Case studies across AI automation, conversational design, enterprise search, and large-scale service design. Each project shaped by one question: what does excellent actually look like here?"
      />
      <StrategicWork />
      <DesignSystems />
    </>
  )
}
