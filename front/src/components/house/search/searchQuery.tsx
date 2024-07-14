'use client'
import { useRouter, useSearchParams } from 'next/navigation'
import { FormEvent } from 'react'
import { BiSearch } from 'react-icons/bi'

export default function SearchForm() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const query = searchParams.get('q')

  function handleSearch(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()

    const formData = new FormData(e.currentTarget)
    const data = Object.fromEntries(formData)

    const query = data.q

    if (!query) return null

    router.push(`/house/search?q=${query}`)
  }

  return (
    <form
      onSubmit={handleSearch}
      className="flex w-full items-center gap-3 rounded-xl border mx-auto px-5 py-3 ring-zinc-700"
    >
      <button>
        <BiSearch className="w-5 h-5 text-zinc-500" />
      </button>
      <input
        name="q"
        type="search"
        placeholder="Buscar imoveis..."
        className="flex-1 bg-transparent text-sm outline-none placeholder:text-zinc-500"
        defaultValue={query ?? ''}
        required
      />
    </form>
  )
}
