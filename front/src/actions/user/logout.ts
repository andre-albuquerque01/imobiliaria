'use server'

import ApiAction from '@/functions/data/apiAction'
import apiError from '@/functions/error/apiErro'
import { UserRequestWithReturnError } from '@/functions/error/user-request'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export async function Logout() {
  try {
    const response = await ApiAction('/user/logout', {
      method: 'POST',
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer ' + cookies().get('token')?.value,
      },
    })

    const data = await response.json()

    if (!response.ok) return UserRequestWithReturnError(data.message)

    if (data.message && data.message === 'Unauthenticated.')
      return 'Não autorizado'

    cookies().delete('token')
  } catch (error) {
    return apiError(error)
  }
  redirect('/')
}
