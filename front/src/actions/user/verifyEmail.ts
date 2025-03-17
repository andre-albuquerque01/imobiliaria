'use server'

import ApiAction from '@/functions/data/apiAction'
import { UserRequestWithReturnError } from '@/functions/error/user-request'

export interface UserInterface {
  name: string
  email: string
}

export default async function VerifyEmail(id: string, hash: string) {
  try {
    const response = await ApiAction(`/user/verify/${id}/${hash}`, {
      headers: {
        Accept: 'application/json',
      },
    })

    const data = await response.json()

    if (!response.ok) return UserRequestWithReturnError(data.message)

    if (data.message === 'success') return 'Verificado com sucesso'
    return 'Houver erro na verificação'
  } catch (error) {
    return 'Houver erro na verificação'
  }
}
