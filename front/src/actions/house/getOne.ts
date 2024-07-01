'use server'

import ApiAction from '@/functions/data/apiAction'
import { cookies } from 'next/headers'

export async function ShowOneHouses(id: string) {
  try {
    const response = await ApiAction(`/house/${id}`, {
      headers: {
        Accept: 'application/json',
        Authorization: 'Bearer' + cookies().get('token')?.value,
      },
      next: {
        revalidate: 1,
        tags: ['house'],
      },
    })

    const datas = await response.json()
    const data = datas.data

    return data
  } catch (err) {
    console.log(err)
    return null
  }
}
