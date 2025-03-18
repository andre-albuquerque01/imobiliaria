import { ShowOneHouses } from '@/actions/house/getOne'
import User from '@/actions/user/show'
import Carousel from '@/components/house/carousel'
import { GotBack } from '@/components/others/gotBack'
import { HouseInterface, UserInterface } from '@/interfaces/all'
import Link from 'next/link'
import { Suspense } from 'react'
import { HiOutlinePencil } from 'react-icons/hi'

export default async function HouseOne({ params }: { params: { id: string } }) {
  const data = (await ShowOneHouses(params.id)) as HouseInterface
  const user = (await User()) as UserInterface

  return (
    <Suspense>
      <div className="px-6 py-4 max-w-5xl mx-auto bg-white">
        <GotBack />
        <div className="flex flex-col md:flex-row gap-8 mt-5">
          <div className="w-full md:w-2/3">
            <Carousel images={data.image.map((img) => img.image)} />
          </div>

          {/* Informações ao lado no Desktop */}
          <div className="w-full md:w-1/3 flex flex-col justify-center space-y-3">
            <h1 className="text-2xl font-bold text-gray-800">{data.title}</h1>
            <p className="text-gray-600 break-words">{data.description}</p>
            <p className="text-gray-700 font-medium">
              🛏 Quartos: {data.rooms}
            </p>
            <p className="text-gray-700 font-medium">💰 Valor: {data.value}</p>
            <p className="text-gray-700 font-medium">
              📍 Endereço: {data.address}
            </p>
            <p className="text-gray-700 font-medium">
              📞 Contato: {data.user?.contact}
            </p>

            {data.user && data.user.idUser === user?.idUser && (
              <Link
                href={`/house/update/${data.idHouse}`}
                className="mt-4 inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 transition"
              >
                <HiOutlinePencil className="w-5 h-5" />
                Alterar publicação
              </Link>
            )}
          </div>
        </div>
      </div>
    </Suspense>
  )
}
