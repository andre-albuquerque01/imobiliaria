'use server'

import ApiAction from '@/functions/data/apiAction'

export async function ShowHousesSearch(title: string, page: number) {
  try {
    const response = await ApiAction(`/houseTitle/${title}?page=${page}`, {
      headers: {
        Accept: 'application/json',
      },
      next: {
        revalidate: 60 * 30,
        tags: ['house'],
      },
    })

    const datas = await response.json()

    if (!datas.meta || typeof datas.meta.last_page === 'undefined') {
      throw new Error('Estrutura de dados inesperada.')
    }

    const countPage = datas.meta.last_page
    const data = datas.data

    return { data, countPage }
  } catch (err) {
    console.log(err)
    return null
  }
}
