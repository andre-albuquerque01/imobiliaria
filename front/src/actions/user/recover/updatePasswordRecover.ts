'use server'

import ApiAction from '@/functions/data/apiAction'
import { UserRequestWithReturnError } from '@/functions/error/user-request'

export interface UpdatePasswordRequestInterface {
  token: string
  email: string
  password: string
  password_confirmation: string
}

export async function UpdatePasswordRecoverUser(
  request: UpdatePasswordRequestInterface,
) {
  try {
    if (!request.token || !request.password || !request.password_confirmation) {
      return 'Preencha os dados!'
    }
    if (request.password !== request.password_confirmation) {
      return 'Senhas incompatíveis!'
    }

    const response = await ApiAction('/user/resetPassword', {
      method: 'PUT',
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request),
    })

    const data = await response.json()

    if (!response.ok) {
      return UserRequestWithReturnError(data.message)
    }

    return true
  } catch (error) {
    console.error(error)
    return 'Houve error.'
  }
}
