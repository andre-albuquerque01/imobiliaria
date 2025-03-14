'use server'

import ApiAction from '@/functions/data/apiAction'
import apiError from '@/functions/error/apiErro'
import { UserRequestError } from '@/functions/error/user-request'

export async function SendEmailVerifyUser(
  state: { ok: boolean; error: string; data: null },
  request: FormData,
) {
  const email = request.get('email') as string | null

  try {
    if (!email) {
      throw new Error('Preenchas os dados!')
    }

    const response = await ApiAction('/user/reSendEmail', {
      method: 'POST',
      headers: {
        accept: 'application/json',
      },
      body: request,
    })

    const data = await response.json()

    if (!response.ok) {
      return UserRequestError(data.message)
    }
    return { data: null, error: '', ok: true }
  } catch (error) {
    return apiError(error)
  }
}
