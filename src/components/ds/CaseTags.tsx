/** The tag line on a case study: the industry stands out, the domain and discipline follow, one step quieter. */
export default function CaseTags({ category, max = 3 }: { category: string; max?: number }) {
  const [industry, ...rest] = category.split(' · ').slice(0, max)
  return <><span className="text-ink">{industry}</span>{rest.length > 0 && <span className="text-ink-2"> · {rest.join(' · ')}</span>}</>
}
