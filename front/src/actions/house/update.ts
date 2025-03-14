'use server'

import ApiAction from '@/functions/data/apiAction'
import { RevalidateTag } from '@/functions/data/revalidateTag'
import { HouseRequestWithReturnError } from '@/functions/error/house-request'
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

    if (!response.ok) {
      return HouseRequestWithReturnError(data.message)
    }

    if (response.ok) {
      RevalidateTag('house')
      return 'true'
    }
  } catch (error) {
    return 'Houver error'
  }
}
