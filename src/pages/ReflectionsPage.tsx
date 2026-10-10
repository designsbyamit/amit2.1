import PageHeader from '../components/ui/PageHeader'
import Reflections from '../components/sections/Reflections'

export default function ReflectionsPage() {
  return (
    <>
      <PageHeader
        label="Reflections"
        title="Thinking out loud about where design goes next."
        subtitle="Essays, observations, and provocations — the questions worth asking out loud about design, AI, and the systems we're building."
      />
      <Reflections />
    </>
  )
}
