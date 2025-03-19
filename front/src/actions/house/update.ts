'use server'

import ApiAction from '@/functions/data/apiAction'
import { RevalidateTag } from '@/functions/data/revalidateTag'
import { HouseRequestWithReturnError } from '@/functions/error/house-request'
import { cookies } from 'next/headers'

export type requestType = {
  title: string
  description: string
  value: number | string
  address: string
  rooms: number | string
  image: string[]
}

export async function UpdateHouse(request: requestType, id: string) {
  try {
    if (
      !request.title ||
      !request.description ||
      !request.address ||
      !request.value ||
      request.image.length === 0
    ) {
      return 'Preenchas os dados!'
    }
    const response = await ApiAction(`/house/${id}`, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + cookies().get('token')?.value,
      },
      body: JSON.stringify(request),
    })

    const data = await response.json()

    if (!response.ok) {
      return HouseRequestWithReturnError(data.message)
    }

    if (response.ok) {
      RevalidateTag('house')
      return 'true'
    }
    return ''
  } catch (error) {
    return 'Houver error'
  }
}
