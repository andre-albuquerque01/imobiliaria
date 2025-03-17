import { ShowHouses } from '@/actions/house/getAll'
import { Card } from '@/components/cardHome/card'
import SearchForm from '@/components/house/search/searchQuery'
interface SearchParamsProps {
  searchParams: {
    page: number
  }
}

type requestType = {
  data: []
  countPage: number
}
export default async function Home({ searchParams }: SearchParamsProps) {
  let { page } = searchParams || 1
  if (page === undefined) page = 1

  const dt = (await ShowHouses(page)) as requestType
  const data = dt.data
  const count = dt.countPage

  return (
    <div className="flex flex-col gap-3 my-3">
      <div className="md:w-[98%] max-md:w-80 max-md:mx-auto">
        <SearchForm />
      </div>
      {data && data.length > 0 ? (
        <Card countPage={count} query={page} data={data} letter="p" />
      ) : (
        <p>Não há anúncios disponível!</p>
      )}
    </div>
  )
}
