'use server'

import ApiAction from '@/functions/data/apiAction'
import { RevalidateTag } from '@/functions/data/revalidateTag'
import apiError from '@/functions/error/apiErro'
import { HouseRequestError } from '@/functions/error/house-request'
import { cookies } from 'next/headers'
import { requestType } from './update'

export async function InsertHouse(request: requestType) {
  console.log(request)
  try {
    if (
      !request.title ||
      !request.description ||
      !request.address ||
      !request.value ||
      request.image.length === 0
    ) {
      return {
        error: 'Preencha os dados!',
        ok: false,
        data: null,
      }
    }

    const response = await ApiAction('/house', {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + cookies().get('token')?.value,
      },
      body: JSON.stringify(request),
    })

    const data = await response.json()

    if (!response.ok) {
      return HouseRequestError(data.message)
    }

    RevalidateTag('house')
    return { data: null, error: '', ok: true }
  } catch (error) {
    return apiError(error)
  }
}
