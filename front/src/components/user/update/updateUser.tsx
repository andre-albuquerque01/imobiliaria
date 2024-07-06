'use client'
import Link from 'next/link'
import { useFormStatus } from 'react-dom'
import { GoArrowLeft } from 'react-icons/go'
import { FormEvent, Suspense, useEffect, useState } from 'react'
import User from '@/actions/user/show'
import { UpdateUser } from '@/actions/user/update'
import { InputUpdateComponent } from '@/components/form/InputUpdateComponent'
import { InputComponent } from '@/components/form/inputComponent'
import { UserInterface } from '@/interfaces/all'
import { useRouter } from 'next/navigation'

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

export const UpdateUserComponent = () => {
  const [error, setError] = useState()
  const [data, setData] = useState<UserInterface>()
  const router = useRouter()
  useEffect(() => {
    const handleData = async () => {
      const dt = await User()
      setData(dt)
    }
    handleData()
  }, [])

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()

    const formData = new FormData(e.currentTarget)
    const data = Object.fromEntries(formData)
    const req = await UpdateUser(data)
    if (req) {
      alert('Alterado com sucesso!')
      router.back()
    }
    setError(req.message)
  }

  return (
    <Suspense>
      <form
        className="space-y-5 flex flex-col text-black"
        onSubmit={handleSubmit}
      >
        <Link href="/" className="flex items-center">
          <GoArrowLeft className="w-5 h-5" /> Voltar
        </Link>
        <InputUpdateComponent
          type="text"
          label="Nome completo"
          name="name"
          id="name"
          required={true}
          value={data?.name ?? ''}
        />
        <InputUpdateComponent
          type="text"
          label="Número de telefone"
          name="contact"
          id="contact"
          required={true}
          value={data?.contact ?? ''}
        />
        <InputUpdateComponent
          type="email"
          label="E-mail"
          name="email"
          id="email"
          required={true}
          value={data?.email ?? ''}
        />
        <InputComponent
          type="password"
          label="Senha"
          name="password"
          id="Senha"
          required={true}
        />
        <p className="text-xs text-red-600">{error}</p>
        <FormButton />
      </form>
    </Suspense>
  )
}
