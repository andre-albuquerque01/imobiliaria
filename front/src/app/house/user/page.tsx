import { ShowHousesUser } from '@/actions/house/getHouseUser'
import { CardHouseUser } from '@/components/house/cardHouseUser/card'

interface SearchParamsProps {
  searchParams: {
    page: number
  }
}

type requestType = {
  data: []
  countPage: number
}
export default async function HouseUser({ searchParams }: SearchParamsProps) {
  let { page } = searchParams || 1
  if (page === undefined) page = 1

  const dt = (await ShowHousesUser(page)) as requestType
  const data = dt.data
  const count = dt.countPage

  return (
    <div className="mt-10 flex flex-col gap-3">
      <h1 className="font-bold">Meus anúncios</h1>
      {data.length > 0 ? (
        <CardHouseUser countPage={count} query={page} data={data} />
      ) : (
        <p>Não há anúncios publicado!</p>
      )}
    </div>
  )
}
