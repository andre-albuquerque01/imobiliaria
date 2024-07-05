import { ShowOneHouses } from '@/actions/house/getOne'
import User from '@/actions/user/show'
import { GotBack } from '@/components/others/gotBack'
import { HouseInterface, UserInterface } from '@/interfaces/all'
import Image from 'next/image'
import Link from 'next/link'
import { Suspense } from 'react'
import { HiOutlinePencil } from 'react-icons/hi'

export default async function HouseOne({ params }: { params: { id: string } }) {
  const data = (await ShowOneHouses(params.id)) as HouseInterface
  const user = (await User()) as UserInterface

  return (
    <Suspense>
      <div className="px-4">
        <GotBack />
        <div className="flex flex-col ">
          <div>
            <div className="mt-5 space-y-1 max-w-full">
              {data.image.map((images, key) => (
                <div key={key} className="flex flex-wrap gap-5 items-center">
                  {images.imageOne && (
                    <Image
                      src={images.imageOne}
                      width={320}
                      height={320}
                      alt="Imagem"
                      className="max-w-80 min-w-20 max-h-80 min-h-10 object-contain"
                    />
                  )}
                  {images.imageTwo && (
                    <Image
                      src={images.imageTwo}
                      width={320}
                      height={320}
                      alt="Imagem"
                      className="max-w-80 min-w-20 max-h-80 min-h-10 object-contain"
                    />
                  )}
                  {images.imageThree && (
                    <Image
                      src={images.imageThree}
                      width={320}
                      height={320}
                      alt="Imagem"
                      className="max-w-80 min-w-20 max-h-80 min-h-10 object-contain"
                    />
                  )}
                  {images.imageFour && (
                    <Image
                      src={images.imageFour}
                      width={320}
                      height={320}
                      alt="Imagem"
                      className="max-w-80 min-w-20 max-h-80 min-h-10 object-contain"
                    />
                  )}
                </div>
              ))}
            </div>
            <div className="my-5">
              <p className="font-medium text-lg">{data.title}</p>
              <p className="font-normal text-md">
                Descrição: {data.description}
              </p>
              <p className="font-normal text-md">Quartos: {data.rooms}</p>
              <p className="font-normal text-md">Valor: {data.value}</p>
              <p className="font-normal text-md">Endereço: {data.address}</p>
              <p className="font-normal text-md">
                Contato: {data.user.contact}
              </p>
            </div>
          </div>
          {data.user && data.user.idUser === user?.idUser && (
            <Link
              href={`/house/update/${data.idHouse}`}
              className="text-blue-500 mt-5 flex items-center gap-1"
            >
              <HiOutlinePencil className="w-5 h-5" />
              Alterar publicação
            </Link>
          )}
        </div>
      </div>
    </Suspense>
  )
}
