/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import { FormEvent, useEffect, useState } from 'react'
import { useFormStatus } from 'react-dom'
import Link from 'next/link'
import { GoArrowLeft } from 'react-icons/go'
import { InputUpdateComponent } from '@/components/form/Input-update-component'
import { ShowOneHouses } from '@/actions/house/getOne'
import { HouseInterface } from '@/interfaces/all-interfaces.e'
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
  const [imageUrls, setImageUrls] = useState<string[]>([])
  const [error, setError] = useState('')
  const router = useRouter()

  useEffect(() => {
    const handleData = async () => {
      const dt = (await ShowOneHouses(id)) as HouseInterface
      setData(dt)
      setImageUrls(dt?.image.map((img) => img.image) || [])
    }
    handleData()
  }, [id])

  const handleAddImageUrl = () => {
    if (imageUrls.length < 3) {
      setImageUrls([...imageUrls, ''])
    }
  }

  const handleImageUrlChange = (index: number, value: string) => {
    const newImageUrls = [...imageUrls]
    newImageUrls[index] = value
    setImageUrls(newImageUrls)
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()

    const formData = new FormData(e.currentTarget)

    const response = {
      title: formData.get('title') as string,
      description: formData.get('description') as string,
      value: formData.get('value') as string,
      address: formData.get('address') as string,
      rooms: formData.get('rooms') as string,
      image: imageUrls,
    }

    const req = await UpdateHouse(response, id)
    if (req === 'true') {
      alert('Publicação alterada com sucesso!')
      router.back()
    }

    if (req !== 'true') setError(req)
  }

  return (
    <form
      className="max-w-lg mx-auto bg-white p-6 space-y-5"
      onSubmit={handleSubmit}
    >
      <Link
        href="/house/user"
        className="flex items-center text-gray-600 hover:text-gray-900"
      >
        <GoArrowLeft className="w-5 h-5" /> Voltar
      </Link>
      <h2 className="text-2xl font-semibold text-center text-gray-800">
        Alterar Publicação
      </h2>
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
      <div className="flex flex-col gap-3 text-black">
        {imageUrls.map((url, index) => (
          <div key={index} className="flex flex-col space-y-2">
            <label htmlFor={`image-${index}`}>Link da imagem {index + 1}</label>
            <input
              type="text"
              name={`image-${index}`}
              id={`image-${index}`}
              value={url}
              onChange={(e) => handleImageUrlChange(index, e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-2 outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
        ))}
        {imageUrls.length < 3 && (
          <button
            type="button"
            onClick={handleAddImageUrl}
            className="mt-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition-all duration-300"
          >
            Adicionar outra imagem
          </button>
        )}
      </div>

      {error && <p className="text-xs text-red-600">{error}</p>}
      <FormButton />
    </form>
  )
}
