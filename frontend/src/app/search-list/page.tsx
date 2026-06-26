import SearchListContainer from '@/components/search-list/search-list-container'

interface PageProps {
  searchParams: Promise<{ q?: string }>
}

export default async function SearchListPage({ searchParams }: PageProps) {
  const resolvedParams = await searchParams
  const query = resolvedParams.q || ''

  return <SearchListContainer initialQuery={query} />
}
