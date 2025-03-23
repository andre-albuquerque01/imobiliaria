'use client'
import { DeleteHouse } from '@/actions/house/delete'
import { FormEvent } from 'react'
import { FiTrash } from 'react-icons/fi'

export const DeleteHouseComponente = ({ id }: { id: string }) => {
  async function handleDelete(e: FormEvent) {
    e.preventDefault()
    if (confirm('Deseja excluir a publicação?')) {
      const response = await DeleteHouse(id)
      if (response) alert('Publicação excluída com sucesso!')
    }
  }

  return (
    <button onClick={handleDelete} className=" hover:text-blue-500">
      <FiTrash size={20} />
    </button>
  )
}
