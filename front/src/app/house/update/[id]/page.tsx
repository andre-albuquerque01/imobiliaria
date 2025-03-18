import { UpdateHouseComponent } from '@/components/house/update/update'
import { Suspense } from 'react'

export default async function UpdateHouse({
  params,
}: {
  params: { id: string }
}) {
  return (
    <div className="flex justify-center items-center min-h-[calc(100vh-80px)]">
      <Suspense>
        <UpdateHouseComponent id={params.id} />
      </Suspense>
    </div>
  )
}
