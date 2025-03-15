'use server'

import ApiAction from '@/functions/data/apiAction'
import { cookies } from 'next/headers'

export async function ShowHousesUser(page: number) {
  try {
    const response = await ApiAction(`/housesUser?page=${page}`, {
      headers: {
        Accept: 'application/json',
        Authorization: 'Bearer ' + cookies().get('token')?.value,
      },
      cache: 'no-store',
      next: {
        // revalidate: 60 * 30,
        tags: ['house'],
      },
    })

    const datas = await response.json()
    console.log(datas)

    if (datas.message === 'House not found') {
      return { data: [], countPage: 0 }
    }

    if (!datas.meta || typeof datas.meta.last_page === 'undefined') {
      throw new Error('Estrutura de dados inesperada.')
    }

    const countPage = datas.meta.last_page
    const data = datas.data

    return { data, countPage }
  } catch (err) {
    console.error(err)
    return { data: [], countPage: 0 }
  }
}
