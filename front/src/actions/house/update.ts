'use server'

import ApiAction from '@/functions/data/apiAction'
import { RevalidateTag } from '@/functions/data/revalidateTag'
import { cookies } from 'next/headers'

export async function UpdateHouse(reqBody: object, id: string) {
  try {
    const response = await ApiAction(`/house/${id}`, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + cookies().get('token')?.value,
      },
      body: JSON.stringify(reqBody),
    })

    const data = await response.json()

    const message =
      typeof data.message === 'string'
        ? data.message
        : JSON.stringify(data.message)

    if (response.ok) {
      RevalidateTag('training')
      return 'true'
    }
    return message
  } catch (error) {
    return 'Houver error'
  }
}
