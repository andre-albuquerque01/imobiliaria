import Image from 'next/image'
import Link from 'next/link'
import { IoLocationOutline } from 'react-icons/io5'
import LinkPagination from '../navigation/pagination'
import { HouseInterface } from '@/interfaces/all-interfaces.e'
import LinkPaginationSearch from '../navigation/pagination-with-search'
import { handleValue } from '@/functions/function/handleTypeValue'

export const Card = ({
  data,
  query,
  countPage,
  letter,
  title,
}: {
  data: HouseInterface[]
  query: number
  countPage: number
  letter: string
  title?: string
}) => {
  return (
    <>
      <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 gap-4 w-full mx-auto justify-center">
        {data?.length > 0 &&
          data.map((house) => (
            <div
              key={house.idHouse}
              className="bg-white w-[320px]  shadow-lg rounded-lg overflow-hidden hover:scale-[1.02] transition-transform duration-200"
            >
              <Link href={`house/${house.idHouse}`} className="block">
                <div className="relative w-full h-48">
                  <Image
                    src={
                      house.image[0]?.image ||
                      'https://images.pexels.com/photos/101808/pexels-photo-101808.jpeg?auto=compress&cs=tinysrgb&w=600'
                    }
                    width={320}
                    height={192}
                    alt="Imagem do anúncio"
                    className="object-cover "
                  />
                </div>

                <div className="p-4 flex flex-col justify-between h-40">
                  <h2 className="text-lg font-semibold truncate">
                    {house.title}
                  </h2>

                  <p className="text-sm text-gray-600 flex items-center">
                    <IoLocationOutline size={18} className="text-gray-500" />
                    <span className="truncate ml-1">{house.address}</span>
                  </p>

                  <div className="flex justify-between items-center">
                    <p className="text-lg font-bold text-green-600">
                      {handleValue(Number(house.value))}
                    </p>
                    <button className="bg-blue-600 text-white px-3 py-1 rounded-md text-sm hover:bg-blue-700">
                      Ver detalhes
                    </button>
                  </div>
                </div>
              </Link>
            </div>
          ))}
      </div>

      <div className="mt-8">
        {letter === 'p' ? (
          <LinkPagination query={query} countPage={countPage} />
        ) : (
          <LinkPaginationSearch
            query={query}
            countPage={countPage}
            path={title}
            letter="q"
          />
        )}
      </div>
    </>
  )
}
