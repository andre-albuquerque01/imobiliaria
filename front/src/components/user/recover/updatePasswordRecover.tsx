/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import { UpdatePasswordRecoverUser } from '@/actions/user/recover/updatePasswordRecover'
import { InputComponent } from '@/components/form/inputComponent'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { useFormState, useFormStatus } from 'react-dom'
import { GoArrowLeft } from 'react-icons/go'

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

export const UpdatePasswordRecoverComponent = ({
  token,
}: {
  token: string
}) => {
  const [state, action] = useFormState(UpdatePasswordRecoverUser, {
    ok: false,
    error: '',
    data: null,
  })
  const router = useRouter()

  useEffect(() => {
    if (state && state.ok) {
      alert('Senha alterada com sucesso!')
      router.push('/')
    }
  }, [state])

  return (
    <form className="space-y-5 flex flex-col text-black" action={action}>
      <Link href="/" className="flex items-center ">
        <GoArrowLeft className="w-5 h-5" /> Voltar
      </Link>
      <input type="hidden" name="token" defaultValue={token} />
      <InputComponent
        type="email"
        label="E-mail"
        name="email"
        id="email"
        required={true}
      />
      <InputComponent
        type="password"
        label="Senha"
        name="password"
        id="Senha"
        required={true}
      />
      <InputComponent
        type="password"
        label="Confirmação de senha"
        name="password_confirmation"
        id="Confirmação de senha"
        required={true}
      />
      <p className="text-xs text-red-600">{state && state.error}</p>
      <FormButton />
    </form>
  )
}
