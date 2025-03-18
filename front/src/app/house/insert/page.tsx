import { InsertHouseComponent } from '@/components/house/insert/InsertHouseComponent'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: {
    template: '%s',
    default: 'Insert anúncio',
  },
}

export default function InsertHouse() {
  return (
    <div className="flex justify-center items-center min-h-[calc(100vh-80px)]">
      <InsertHouseComponent />
    </div>
  )
}
