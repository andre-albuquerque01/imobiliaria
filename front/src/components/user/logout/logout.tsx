'use client'
import { Logout } from '@/actions/user/logout'
import { FormEvent } from 'react'

export const LogoutComponente = () => {
  async function handleDelete(e: FormEvent) {
    e.preventDefault()
    await Logout()
  }

  return (
    <button
      onClick={handleDelete}
      className="transform duration-500 rounded-md hover:bg-zinc-600 p-2 uppercase"
    >
      Sair
    </button>
  )
}
