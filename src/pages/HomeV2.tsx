import { useState } from 'react'
import Story from '../components/home2/Story'
import StoryStill from '../components/home2/StoryStill'
import { prefersReduced } from '../components/home2/scene'

/**
 * The home page as one continuous story in eight keyframes. A single point becomes three forces, the forces become paths,
 * the paths become the work, the work dissolves into the career's points, the points become teams and then a community,
 * the community branches into what gets shared, and everything returns to the point, which sets out on a new line.
 */
export default function HomeV2() {
  const [still] = useState(prefersReduced)
  return still ? <StoryStill /> : <Story />
}
