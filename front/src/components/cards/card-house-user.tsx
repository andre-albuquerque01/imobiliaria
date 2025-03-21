import Image from 'next/image'
import Link from 'next/link'
import { HouseInterface } from '@/interfaces/all-interfaces.e'
import LinkPagination from '@/components/navigation/pagination'
import { DeleteHouseComponente } from '../house/delete-house'
import { HiOutlinePencil } from 'react-icons/hi'
import { handleValue } from '@/functions/function/handleTypeValue'

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
    <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 gap-4 w-full mx-auto justify-center">
      {data &&
        data.length > 0 &&
        data.map((house) => (
          <div
            className="bg-white w-[320px]  shadow-lg rounded-lg overflow-hidden hover:scale-[1.02] transition-transform duration-200"
            key={house.idHouse}
          >
            <Link href={`/house/${house.idHouse}`} className="block">
              <div className="relative w-full h-40">
                <Image
                  src={
                    house.image[0]?.image ||
                    'https://images.pexels.com/photos/101808/pexels-photo-101808.jpeg?auto=compress&cs=tinysrgb&w=600'
                  }
                  layout="fill"
                  objectFit="cover"
                  alt="Imagem do anúncio"
                />
              </div>
              <div className="p-2 flex flex-col justify-between h-32">
                <h2 className="text-lg font-semibold truncate">
                  {house.title}
                </h2>

                <div className="flex justify-between items-center">
                  <p className="text-lg font-bold text-green-600">
                    {handleValue(Number(house.value))}
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <DeleteHouseComponente id={house.idHouse} />
                  <Link href={`/house/update/${house.idHouse}`}>
                    <HiOutlinePencil className="w-5 h-5 hover:text-blue-600" />
                  </Link>
                </div>
              </div>
            </Link>
          </div>
        ))}
      <LinkPagination query={query} countPage={countPage} />
    </div>
  )
}
