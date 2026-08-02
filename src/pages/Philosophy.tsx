import PageHeader from '../components/ui/PageHeader'
import AINativeDesign from '../components/sections/AINativeDesign'
import Vision from '../components/sections/Vision'

export default function Philosophy() {
  return (
    <>
      <PageHeader
        label="Design Philosophy"
        title="First principles for an AI-native world."
        subtitle="What changes when software can reason? What stays the same? The principles that guide my work when the design problem isn't just the interface — it's the intelligence behind it."
      />
      <AINativeDesign />
      <Vision />
    </>
  )
}
