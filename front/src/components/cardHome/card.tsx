import Image from 'next/image'
import Link from 'next/link'
import { IoLocationOutline } from 'react-icons/io5'

interface CardInterface {
  title: string
  location: string
  price: number
  image: string
  id: string
}

export const Card = ({ ...props }: CardInterface) => {
  return (
    <div className="md:w-[800px] max-md:w-80 border border-zinc-500 md:h-40 mx-auto">
      <Link href="" className="flex h-full py-4 pr-2">
        <Image
          src={props.image}
          //   src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5OGbIcXNwv2QdjS5j3fnLL4nWkAg85Gfgjw&usqp=CAU"
          width={150}
          height={150}
          alt="Imagem do anúncio"
          className="object-contain max-h-[160px] max-w-[160px] mx-4"
        />
        <div className="flex justify-between w-full max-md:flex-col">
          <div className="flex flex-col justify-between">
            <h1>{props.title}</h1>
            <p className="text-sm opacity-80 flex items-center">
              <IoLocationOutline size={18} />
              {props.location}
            </p>
          </div>
          <div className="">
            <p>R$ {props.price}</p>
          </div>
        </div>
      </Link>
    </div>
  )
}
