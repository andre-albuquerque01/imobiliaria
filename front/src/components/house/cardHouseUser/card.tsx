import Image from 'next/image'
import Link from 'next/link'
import { HouseInterface } from '@/interfaces/all'
import LinkPagination from '@/components/pagination/pagination'
import { DeleteHouseComponente } from '../delete/delete'

export const CardHouseUser = ({
  data,
  query,
  countPage,
}: {
  data: HouseInterface[]
  query: number
  countPage: number
}) => {
  return (
    <>
      {data &&
        data.length > 0 &&
        data.map((house) => (
          <div
            className="md:w-[800px] max-md:w-80 border border-zinc-500 md:h-40 mx-auto transform duration-200 hover:text-zinc-400"
            key={house.idHouse}
          >
            <Link
              href={`/house/${house.idHouse}`}
              className="flex h-full py-4 pr-2"
            >
              <Image
                src={
                  house.image[0]?.imageOne ||
                  'https://images.pexels.com/photos/101808/pexels-photo-101808.jpeg?auto=compress&cs=tinysrgb&w=600'
                }
                width={150}
                height={150}
                alt="Imagem do anúncio"
                className="object-contain max-h-[160px] max-w-[160px] mx-4"
              />
              <div className="flex justify-between w-full max-md:flex-col max-md:max-w-32">
                <div className="flex flex-col justify-between">
                  <h1 className="truncate w-full">{house.title}</h1>
                  <p>R$ {house.value}</p>
                </div>
                <div className="hover:text-red-600">
                  <DeleteHouseComponente id={house.idHouse} />
                </div>
              </div>
            </Link>
          </div>
        ))}
      <LinkPagination query={query} countPage={countPage} />
    </>
  )
}
