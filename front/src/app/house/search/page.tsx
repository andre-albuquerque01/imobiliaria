import { ShowHousesSearch } from '@/actions/house/search'
import { Card } from '@/components/cards/card-home'
import SearchForm from '@/components/navigation/search-query'
interface SearchParamsProps {
  searchParams: {
    q: string
    page: number
  }
}

type requestType = {
  data: []
  countPage: number
}
export default async function Search({ searchParams }: SearchParamsProps) {
  let { page } = searchParams || 1
  if (page === undefined) page = 1

  const { q: queryQ } = searchParams

  const dt = (await ShowHousesSearch(queryQ, page)) as requestType
  const data = dt.data
  const count = dt.countPage

  return (
    <div className="flex flex-col gap-3 my-3">
      <div className="md:w-[800px] max-md:w-80 mx-auto">
        <SearchForm />
        <h1 className="font-semibold text-sm mt-2">Pesquisado por: {queryQ}</h1>
      </div>
      {data && data.length > 0 ? (
        <Card
          countPage={count}
          query={page}
          data={data}
          letter="q"
          title={queryQ}
        />
      ) : (
        <p>Não encontramos anúncios desejados!</p>
      )}
    </div>
  )
}
