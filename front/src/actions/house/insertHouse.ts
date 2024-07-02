'use server'

import ApiAction from '@/functions/data/apiAction'
import { RevalidateTag } from '@/functions/data/revalidateTag'
import apiError from '@/functions/error/apiErro'
import { cookies } from 'next/headers'

export async function InsertHouse(
  state: { ok: boolean; error: string; data: null },
  request: FormData,
) {
  const title = request.get('title') as string | null
  const description = request.get('description') as string | null
  const value = request.get('value') as string | null
  const address = request.get('address') as string | null

  try {
    if (!title || !description || !address || !value) {
      throw new Error('Preenchas os dados!')
    }

    const response = await ApiAction('/house', {
      method: 'POST',
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer ' + cookies().get('token')?.value,
      },
      body: request,
    })

    const data = await response.json()
    console.log(data)

    const message =
      data && data.data && typeof data.data.message === 'string'
        ? data.data.message
        : JSON.stringify(data?.data?.message || '')

    if (message && message.includes('The email has already been taken.'))
      throw new Error('E-mail já cadastrado!')

    RevalidateTag('house')
    return { data: null, error: '', ok: true }
  } catch (error) {
    return apiError(error)
  }
}
