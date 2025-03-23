'use client'

import Link from 'next/link'
import { useFormStatus } from 'react-dom'
import { GoArrowLeft } from 'react-icons/go'
import { InputComponent } from '@/components/form/input-component'
import { InsertHouse } from '@/actions/house/insertHouse'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

function FormButton() {
  const { pending } = useFormStatus()
  return (
    <button
      className="bg-blue-600 text-white px-4 py-2 w-96 max-md:w-80 max-md:mx-auto rounded-lg"
      disabled={pending}
    >
      {pending ? 'Cadastrando...' : 'Cadastrar'}
    </button>
  )
}

export const InsertHouseComponent = () => {
  const [error, setError] = useState<{
    ok: boolean
    error: string
    data: null
  }>()
  const router = useRouter()

  const [imageUrls, setImageUrls] = useState<string[]>([''])

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

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)
    const data = {
      title: formData.get('title') as string,
      description: formData.get('description') as string,
      value: formData.get('value') as string,
      address: formData.get('address') as string,
      rooms: formData.get('rooms') as string,
      image: imageUrls.filter((url) => url.trim() !== ''),
    }

    const req = await InsertHouse(data)
    if (req.ok) {
      alert('Publicação cadastrada com sucesso!')
      router.back()
    }
    setError(req)
  }

  return (
    <form
      className="space-y-5 flex flex-col text-black my-5"
      onSubmit={handleSubmit}
    >
      <Link href="/" className="flex items-center">
        <GoArrowLeft className="w-5 h-5" /> Voltar
      </Link>
      <InputComponent
        type="text"
        label="Título"
        name="title"
        id="title"
        required={true}
      />
      <InputComponent
        type="text"
        label="Descrição"
        name="description"
        id="description"
        required={true}
      />
      <InputComponent
        type="number"
        label="Valor"
        name="value"
        id="value"
        required={true}
      />
      <InputComponent
        type="text"
        label="Endereço"
        name="address"
        id="address"
        required={true}
      />
      <InputComponent
        type="text"
        label="Quantidade de quartos"
        name="rooms"
        id="rooms"
        required={true}
      />

      <div className="flex flex-col gap-3">
        {imageUrls.map((url, index) => (
          <div key={index} className="flex flex-col">
            <label htmlFor={`image-${index}`}>Link da imagem {index + 1}</label>
            <input
              type="text"
              name={`image-${index}`}
              id={`image-${index}`}
              value={url}
              onChange={(e) => handleImageUrlChange(index, e.target.value)}
              className="bg-transparent border border-zinc-400 p-1.5 outline-none text-black rounded-lg w-96 max-sm:w-80"
            />
          </div>
        ))}

        {imageUrls.length < 3 && (
          <button
            type="button"
            onClick={handleAddImageUrl}
            className="bg-green-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-green-600"
          >
            Adicionar outra imagem
          </button>
        )}
      </div>

      {error && <p className="text-xs text-red-600">{error.error}</p>}
      <FormButton />
    </form>
  )
}
