import PageHeader from '../components/ui/PageHeader'
import Resources from '../components/sections/Resources'

export default function ResourcesPage() {
  return (
    <>
      <PageHeader
        label="Resources"
        title="A mentor's toolkit. A knowledge vault."
        subtitle="Frameworks, templates, reading lists, and thinking tools built from years of experimentation, failures, workshops, mentoring conversations, and enterprise design challenges."
      />
      <Resources />
    </>
  )
}
