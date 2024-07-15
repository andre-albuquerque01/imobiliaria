import Image from 'next/image'
import Link from 'next/link'
import { IoLocationOutline } from 'react-icons/io5'
import LinkPagination from '../pagination/pagination'
import { HouseInterface } from '@/interfaces/all'
import LinkPaginationSearch from '../pagination/paginationSearch'

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
      {data &&
        data.length > 0 &&
        data.map((house) => (
          <div
            className="md:w-[800px] max-md:w-80 border md:h-40 mx-auto max-md:max-h-[120px] rounded-lg transform duration-200 hover:text-zinc-400"
            key={house.idHouse}
          >
            <Link
              href={`house/${house.idHouse}`}
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
                className="object-contain max-h-40 w-[30%] max-w-40 max-md:max-h-[90px] mx-4"
              />
              <div className="flex justify-between w-[70%] max-md:flex-col">
                <div className="flex flex-col justify-between">
                  <h1>{house.title}</h1>
                  <p className="text-sm opacity-80 flex items-center w-full text-wrap ">
                    <IoLocationOutline size={18} />
                    <span className="truncate w-[80%]">{house.address}</span>
                  </p>
                </div>
                <div className="">
                  <p>R$ {house.value}</p>
                </div>
              </div>
            </Link>
          </div>
        ))}
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
    </>
  )
}
