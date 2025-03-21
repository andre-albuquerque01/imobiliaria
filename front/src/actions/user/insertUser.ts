'use server'

import ApiAction from '@/functions/data/apiAction'
import { RevalidateTag } from '@/functions/data/revalidateTag'
import apiError from '@/functions/error/apiErro'
import { UserRequestError } from '@/functions/error/user-request'
import VerificationPassword from '@/functions/function/verifyPassword'
import { redirect } from 'next/navigation'

export async function InsertUser(
  state: { ok: boolean; error: string; data: null },
  request: FormData,
) {
  const name = request.get('name') as string | null
  const email = request.get('email') as string | null
  const contact = request.get('contact') as string | null
  const password = request.get('password') as string | null
  const passwordConfirmation = request.get('password_confirmation') as
    | string
    | null
  const termAceite = request.get('term_aceite') === 'on' ? 1 : 0
  request.set('term_aceite', String(termAceite))

  try {
    if (
      !name ||
      !email ||
      !password ||
      !contact ||
      !passwordConfirmation ||
      !termAceite
    ) {
      throw new Error('Preenchas os dados!')
    }
    if (password !== passwordConfirmation) {
      throw new Error('Senha incompativel!')
    }

    VerificationPassword(password)

    const response = await ApiAction('/user/register', {
      method: 'POST',
      headers: {
        accept: 'application/json',
      },
      body: request,
    })

    const data = await response.json()

    if (response.status !== 201) {
      return UserRequestError(data.message)
    }
  } catch (error) {
    return apiError(error)
  }
  RevalidateTag('user')
  redirect('/user/login')
}
