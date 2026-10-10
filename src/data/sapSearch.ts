// AI-Powered Global Search — content taken from the Figma file "S-Projects › AI-Powered Search"
// (presentation frames: Cover, Intro, Challenges, Ideas to Explore, Search/AI Functionalities,
// Solution Ideas, Common Patterns; screen frames 1.1–5.4).
// Screens are the original SVG exports from Figma (text outlined), stored unmodified in
// public/images/case-studies/sap-search/<id>.svg.

export interface Screen { id: string; name: string; img?: string }
export interface Flow { id: string; label: string; title: string; summary: string; hash: string; screens: Screen[] }

const B = import.meta.env.BASE_URL

export const sapSearch = {
  title: 'AI-Powered Global Search Experience',
  kicker: 'Cross-application experience',
  pillars: ['Consistent', 'User friendly', 'Contextual'],
  intro: 'Experience seamless efficiency with new search across all applications.',
  prototype: `${B}prototypes/sap-search/index.html`,

  challenges: [
    { area: 'Search queries', items: ['Inadequate autocomplete suggestions', 'Search history limitations', 'Lack of NLP integration', "Lack of 'search – alternate modes'"] },
    { area: 'Search results', items: ['Poor indexing', 'No personalisation', 'Lack of contextual search', 'Ineffective feedback mechanisms'] },
    { area: 'UI, filters, performance & interactions', items: ['Poor user interface design', 'Limited search filters', 'Suggestive search and interactions', 'Poor integration with other tools'] },
  ],

  ideas: {
    inputs: ['Search functionalities', 'AI offerings', "Users' problems"],
    aiOfferings: ['Informational AI', 'Transactional AI', 'Analytical AI', 'Generative AI'],
  },

  searchFunctionalities: [
    ['Semantic search', 'Focuses on understanding the meaning behind queries rather than just matching keywords, enhancing the ability to retrieve relevant information based on context and relationships between concepts.'],
    ['Faceted search', 'Provides users with multiple filters (facets) based on categories or attributes, allowing them to refine their searches dynamically.'],
    ['Contextual search', 'Takes into account user context and previous interactions to deliver personalized search results tailored to individual needs.'],
    ['Unified search', 'Consolidates results from multiple sources into a single organized list, often using AI-based ranking for improved relevance.'],
    ['Federated search', 'Allows simultaneous searching across multiple siloed data sources but presents results as separate lists from each source.'],
    ['Siloed search', 'Searches within a single source or repository of data, such as a specific database or file system.'],
    ['Full text search', 'Searches all fields in a database and retrieves records matching the query across multiple attributes, useful for textual data.'],
    ['Limiting search', 'Involves breaking down a query into sub-strings and searching them across different fields (e.g., title, author) to refine results.'],
    ['Truncation search', 'A technique that searches for different forms of a word sharing a common root by using truncation marks.'],
  ] as [string, string][],
  mechanics: ['Autocompletion', 'Highlighting', 'Ranking', 'Boosting', 'Special annotations'],
  aiFunctionalities: ['Recommendation', 'Prediction', 'Categorisation', 'Clustering', 'Content generation'],

  recommendations: [
    'Natural Language Understanding (NLU)',
    'Cross-application semantic search',
    'Context-aware & role-based personalisation',
    'Predictive & proactive suggestions (autosuggestions)',
    'Actionable results (search-to-action)',
    'Federated search with a unified ontology: structured + unstructured data',
    'Conversational search agent / chat interface',
    'Secure, explainable results for transparency',
    'Learning & feedback loops',
    'Multilingual & localised search',
  ],

  patternGroups: [
    { title: 'Query input & understanding', note: 'How users initiate and express queries.', items: ['Type-ahead suggestions', 'Natural language query parsing', 'Voice-enabled search input', 'Conversational follow-up', 'Multi-entity query support'] },
    { title: 'Result exploration & actionability', items: ['Inline smart actions', 'Result grouping & summarisation', 'Multi-result preview & comparison', 'Search within results', 'Search result annotations'] },
    { title: 'Personalisation & context awareness', items: ['Contextual search entry points', 'Smart history & re-query', 'Explainable AI recommendations', 'Recent & frequent entities shortcut', 'Save search as smart bookmark', 'Delegated search view'] },
    { title: 'Proactive intelligence & workflow', items: ['Task-oriented suggestions', 'Cross-timeframe search', 'Search result notifications'] },
  ],
  patternDefinitions: [
    ['Type-ahead suggestions', 'Auto-complete with smart predictions based on query history and intent.'],
    ['Natural language query parsing', 'Understands user input in everyday language with entity recognition.'],
    ['Dynamic filters & faceted search', 'Interactive filters to refine search results quickly.'],
    ['Inline smart actions', 'Perform actions (e.g., approve, assign, download) directly from results.'],
    ['Conversational follow-up', 'AI-guided dialogue for clarifying or refining queries.'],
    ['Result grouping & summarisation', 'Organises results by category with summarised insights.'],
    ['Contextual search entry points', 'Search from within modules with pre-scoped context.'],
    ['Multi-result preview & comparison', 'Side-by-side viewing of records for better decision-making.'],
    ['Smart history & re-query', 'Access recent searches and auto-refresh important queries.'],
    ['Explainable AI recommendations', 'Shows reasoning behind suggested results to build trust.'],
  ] as [string, string][],

  flows: [
    { id: 'component', label: '01', title: 'The search component', hash: 'home', summary: 'One search field in the SAP shell bar, from idle to AI: hover, expanded suggestions, type-ahead, and AI capsules that turn a broad query into precise intents.',
      screens: [{ id: '1-1', name: 'Default (idle)' }, { id: '1-2', name: 'Hover state' }, { id: '1-3', name: 'Expanded' }, { id: '1-4', name: 'Suggestions dropdown' }, { id: '1-5', name: 'Type-ahead' }, { id: '1-6', name: 'AI capsules' }] },
    { id: 'results', label: '02', title: 'Search results', hash: 'po', summary: '"Pending POs": 14 results and $1.8M impacted, grouped by type, switchable between list and product cards, with a detail side panel that keeps the result list in view.',
      screens: [{ id: '2-1', name: 'Search results default' }, { id: '2-2', name: 'Documents tab' }, { id: '2-3', name: 'Product cards' }, { id: '2-4', name: 'Detail side panel' }] },
    { id: 'travel', label: '03', title: 'Use case: Business travel → SAP Concur', hash: 'travel', summary: 'From "flight to Bangalore" to a policy-compliant booking. AI recommends the preferred route and hotel, then hands off to Concur with the trip already filled in.',
      screens: [{ id: '3-1', name: 'Search home' }, { id: '3-2', name: 'Travel type-ahead' }, { id: '3-3', name: 'Travel results' }, { id: '3-4', name: 'Opening Concur' }, { id: '3-5', name: 'Concur booking screen' }] },
    { id: 'procurement', label: '04', title: 'Use case: Procurement → SAP Ariba', hash: 'buy', summary: 'An AI comparison of two catalog items, then straight into Ariba with the preferred contract, supplier and quantity ready for a requisition.',
      screens: [{ id: '4-1', name: 'Search home' }, { id: '4-2', name: 'Procurement type-ahead' }, { id: '4-3', name: 'Comparison + products' }, { id: '4-4', name: 'Opening Ariba' }, { id: '4-5', name: 'Ariba procurement screen' }] },
    { id: 'goals', label: '05', title: 'Use case: SuccessFactors goals', hash: 'goals', summary: "A manager searches for a team member's goals, sees progress and risk at a glance, and edits a goal without leaving the flow.",
      screens: [{ id: '5-1', name: 'Search home' }, { id: '5-2', name: 'SF type-ahead' }, { id: '5-3', name: 'Team member goals' }, { id: '5-4', name: 'Goal draft' }] },
  ].map(f => ({ ...f, screens: f.screens.map(sc => ({ ...sc, img: `${B}images/case-studies/sap-search/${sc.id}.svg` })) })) as Flow[],
}
