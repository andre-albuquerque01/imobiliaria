'use client'
import Link from 'next/link'
import { useFormState, useFormStatus } from 'react-dom'
import { GoArrowLeft } from 'react-icons/go'
import { InputComponent } from '@/components/form/inputComponent'
import { InsertUser } from '@/actions/user/insertUser'

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

export const InsertUserComponent = () => {
  const [state, action] = useFormState(InsertUser, {
    ok: false,
    error: '',
    data: null,
  })

  return (
    <form className="space-y-5 flex flex-col text-black" action={action}>
      <Link href="/" className="flex items-center">
        <GoArrowLeft className="w-5 h-5" /> Voltar
      </Link>
      <InputComponent
        type="text"
        label="Nome completo"
        name="name"
        id="name"
        required={true}
      />
      <InputComponent
        type="email"
        label="E-mail"
        name="email"
        id="email"
        required={true}
      />
      <InputComponent
        type="text"
        label="Número de telefone"
        name="contact"
        id="contact"
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
      <div className="text-black flex items-center gap-2">
        <input type="checkbox" name="term_aceite" id="term_aceite" required />{' '}
        <label htmlFor="term_aceite">
          Ler{' '}
          <Link href="/user/term" className="text-blue-600">
            termos de aceites
          </Link>
          <span className="text-xs text-red-600"> *</span>
        </label>
      </div>
      {state.error && <p className="text-xs text-red-600">{state.error}</p>}
      <FormButton />
    </form>
  )
}
