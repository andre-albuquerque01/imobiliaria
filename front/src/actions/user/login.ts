'use server'

import ApiAction from '@/functions/data/apiAction'
import apiError from '@/functions/error/apiErro'
import { UserRequestError } from '@/functions/error/user-request'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export async function Login(
  state: { ok: boolean; error: string; data: null },
  request: FormData,
) {
  const email = request.get('email') as string | null
  const password = request.get('password') as string | null

  const cookiesStore = cookies()

  try {
    if (!email || !password) throw new Error('Preenchas os dados!')

    const response = await ApiAction('/user/sessions', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
      },
      body: request,
    })

    const data = await response.json()

    if (!response.ok && !data.token) {
      return UserRequestError(data.message)
    }

    cookiesStore.set('token', data.token, {
      expires: Date.now() + 2 * 60 * 60 * 1000,
      secure: true,
      httpOnly: true,
      sameSite: 'strict',
    })
  } catch (error) {
    return apiError(error)
  }
  redirect('/house/user')
}
