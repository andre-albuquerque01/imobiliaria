/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import { FormEvent, useEffect, useState } from 'react'
import Image from 'next/image'
import { useFormStatus } from 'react-dom'
import Link from 'next/link'
import { GoArrowLeft } from 'react-icons/go'
import { InputUpdateComponent } from '@/components/form/InputUpdateComponent'
import { ShowOneHouses } from '@/actions/house/getOne'
import { HouseInterface } from '@/interfaces/all'
import { useRouter } from 'next/navigation'
import { UpdateHouse } from '@/actions/house/update'

function FormButton() {
  const { pending } = useFormStatus()

  return (
    <>
      {pending ? (
        <button
          className="bg-blue-600 text-white px-4 py-2 w-96 max-md:w-80 max-md:mx-auto rounded-lg"
          disabled={pending}
        >
          Alterando...
        </button>
      ) : (
        <button
          className="bg-blue-600 text-white px-4 py-2 w-96 max-md:w-80 max-md:mx-auto rounded-lg"
          disabled={pending}
        >
          Alterar
        </button>
      )}
    </>
  )
}

export const UpdateHouseComponent = ({ id }: { id: string }) => {
  const [data, setData] = useState<HouseInterface>()
  const [error, setError] = useState('')
  const [img, setImg] = useState({
    imageOne: '',
    imageTwo: '',
    imageThree: '',
    imageFour: '',
  })
  const router = useRouter()
  useEffect(() => {
    const handleData = async () => {
      const dt = (await ShowOneHouses(id)) as HouseInterface
      setData(dt)
    }
    handleData()
  }, [])

  function handleImgChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target
    setImg((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()

    const formData = new FormData(e.currentTarget)
    const dt = Object.fromEntries(formData)
    console.log(dt)

    const req = await UpdateHouse(dt, id)
    if (req === 'true') {
      alert('Publicação alterada com sucesso!')
      router.back()
    }

    if (req !== 'true') setError(req)
  }

  return (
    <form
      className="space-y-5 flex flex-col text-black my-5"
      onSubmit={handleSubmit}
    >
      <Link href="/" className="flex items-center">
        <GoArrowLeft className="w-5 h-5" /> Voltar
      </Link>
      <InputUpdateComponent
        type="text"
        label="Título"
        name="title"
        id="title"
        required={true}
        value={data?.title ?? ''}
      />
      <InputUpdateComponent
        type="text"
        label="Descrição"
        name="description"
        id="description"
        required={true}
        value={data?.description ?? ''}
      />
      <InputUpdateComponent
        type="number"
        label="Valor"
        name="value"
        id="value"
        required={true}
        value={data?.value ?? ''}
      />
      <InputUpdateComponent
        type="text"
        label="Endereço"
        name="address"
        id="address"
        required={true}
        value={data?.address ?? ''}
      />
      <InputUpdateComponent
        type="text"
        label="Quantidade de quartos"
        name="rooms"
        id="rooms"
        required={true}
        value={data?.rooms ?? ''}
      />
      <div className="flex flex-col text-black">
        <label htmlFor="imageOne">
          Link da imagem 1<span className="text-xs text-red-600"> *</span>
        </label>
        <input
          type="text"
          name="imageOne"
          id="imageOne"
          onChange={handleImgChange}
          defaultValue={data?.image[0].imageOne ?? ''}
          className="bg-transparent border border-zinc-400 p-1.5 outline-none text-black rounded-lg w-96 max-sm:w-80"
        />
      </div>
      {img && img.imageOne && (
        <>
          <Image
            src={img.imageOne}
            alt="Imagem da publicação"
            width={100}
            height={100}
          />
        </>
      )}
      <div className="flex flex-col text-black">
        <label htmlFor="imageTwo">Link da imagem 2</label>
        <input
          type="text"
          name="imageTwo"
          id="imageTwo"
          defaultValue={data?.image[0].imageTwo ?? ''}
          onChange={handleImgChange}
          className="bg-transparent border border-zinc-400 p-1.5 outline-none text-black rounded-lg w-96 max-sm:w-80"
        />
      </div>
      {img && img.imageTwo && (
        <>
          <Image
            src={img.imageTwo}
            alt="Imagem da publicação"
            width={100}
            height={100}
          />
        </>
      )}
      <div className="flex flex-col text-black">
        <label htmlFor="imageThree">Link da imagem 3</label>
        <input
          type="text"
          name="imageThree"
          id="imageThree"
          defaultValue={data?.image[0].imageThree ?? ''}
          onChange={handleImgChange}
          className="bg-transparent border border-zinc-400 p-1.5 outline-none text-black rounded-lg w-96 max-sm:w-80"
        />
      </div>
      {img && img.imageThree && (
        <>
          <Image
            src={img.imageThree}
            alt="Imagem da publicação"
            width={100}
            height={100}
          />
        </>
      )}
      <div className="flex flex-col text-black">
        <label htmlFor="imageFour">Link da imagem 4</label>
        <input
          type="text"
          name="imageFour"
          id="imageFour"
          defaultValue={data?.image[0].imageFour ?? ''}
          onChange={handleImgChange}
          className="bg-transparent border border-zinc-400 p-1.5 outline-none text-black rounded-lg w-96 max-sm:w-80"
        />
      </div>
      {img && img.imageFour && (
        <>
          <Image
            src={img.imageFour}
            alt="Imagem da publicação"
            width={100}
            height={100}
          />
        </>
      )}
      {error && <p className="text-xs text-red-600">{error}</p>}
      <FormButton />
    </form>
  )
}
