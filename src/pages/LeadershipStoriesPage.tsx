import PageHeader from '../components/ui/PageHeader'
import LeadershipStories from '../components/sections/LeadershipStories'

export default function LeadershipStoriesPage() {
  return (
    <>
      <PageHeader label="Leadership stories" title="Real lessons, honestly told."
        subtitle="Moments that shaped how I lead: the conflicts, the first team, the community and the culture work. Each story ends with what I learned."
        breadcrumb={[{ label: 'Leadership', to: '/leadership' }, { label: 'Stories' }]} />
      <LeadershipStories asPage />
    </>
  )
}
