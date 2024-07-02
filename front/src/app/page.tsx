import { ShowHouses } from '@/actions/house/getAll'
import { Card } from '@/components/cardHome/card'
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
    <div className="mt-10 flex flex-col gap-3">
      {data.length > 0 ? (
        <Card countPage={count} query={page} data={data} />
      ) : (
        <p>Não há anúncios disponível!</p>
      )}
    </div>
  )
}
