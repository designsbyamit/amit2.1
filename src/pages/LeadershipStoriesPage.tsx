import PageHeader from '../components/ui/PageHeader'
import LeadershipStories from '../components/sections/LeadershipStories'

export default function LeadershipStoriesPage() {
  return (
    <>
      <PageHeader label="Experience" title="Lessons from the work."
        subtitle="Moments that shaped how I lead: the conflicts, the first team, the community and the culture work. Each story ends with what I learned."
        breadcrumb={[{ label: 'Journey', to: '/leadership' }, { label: 'Experience' }]} />
      <LeadershipStories asPage />
    </>
  )
}
