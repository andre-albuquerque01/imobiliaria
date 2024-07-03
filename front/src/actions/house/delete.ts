'use server'

import ApiAction from '@/functions/data/apiAction'
import { RevalidateTag } from '@/functions/data/revalidateTag'
import apiError from '@/functions/error/apiErro'
import { cookies } from 'next/headers'

export async function DeleteHouse(id: string) {
  try {
    const response = await ApiAction(`/house/${id}`, {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        Authorization: 'Bearer ' + cookies().get('token')?.value,
      },
    })
    RevalidateTag('house')
    if (!response.ok) {
      return false
    }
    return true
  } catch (error) {
    return apiError(error)
  }
}
