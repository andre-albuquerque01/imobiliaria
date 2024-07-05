'use client'
import Link from 'next/link'
import { useFormState, useFormStatus } from 'react-dom'
import { GoArrowLeft } from 'react-icons/go'
import { InputComponent } from '@/components/form/inputComponent'
import { InsertHouse } from '@/actions/house/insertHouse'
import { useEffect, useState } from 'react'
import Image from 'next/image'

function FormButton() {
  const { pending } = useFormStatus()

  return (
    <>
      {pending ? (
        <button
          className="bg-blue-600 text-white px-4 py-2 w-96 max-md:w-80 max-md:mx-auto rounded-lg"
          disabled={pending}
        >
          Cadastrando...
        </button>
      ) : (
        <button
          className="bg-blue-600 text-white px-4 py-2 w-96 max-md:w-80 max-md:mx-auto rounded-lg"
          disabled={pending}
        >
          Cadastrar
        </button>
      )}
    </>
  )
}

export const InsertHouseComponent = () => {
  const [state, action] = useFormState(InsertHouse, {
    ok: false,
    error: '',
    data: null,
  })

  const [img, setImg] = useState({
    imageOne: '',
    imageTwo: '',
    imageThree: '',
    imageFour: '',
  })

  function handleImgChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target
    setImg((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  useEffect(() => {
    if (state.ok) {
      setImg({
        imageOne: '',
        imageTwo: '',
        imageThree: '',
        imageFour: '',
      })
    }
  }, [state])

  return (
    <form className="space-y-5 flex flex-col text-black my-5" action={action}>
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
      <div className="flex flex-col text-black">
        <label htmlFor="imageOne">
          Link da imagem 1<span className="text-xs text-red-600"> *</span>
        </label>
        <input
          type="text"
          name="imageOne"
          id="imageOne"
          onChange={handleImgChange}
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
      {state.error && <p className="text-xs text-red-600">{state.error}</p>}
      <FormButton />
    </form>
  )
}
