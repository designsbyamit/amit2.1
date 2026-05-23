import PageHeader from '../components/ui/PageHeader'
import Reflections from '../components/sections/Reflections'
import Community from '../components/sections/Community'
import Resources from '../components/sections/Resources'

export default function ReflectionsPage() {
  return (
    <>
      <PageHeader
        label="Reflections"
        title="Ideas at the edge of design thinking."
        subtitle="Writing, talks, workshops, and community initiatives. The spaces where design thinking gets tested against reality — and the questions worth asking out loud."
      />
      <Reflections />
      <Community />
      <Resources />
    </>
  )
}
