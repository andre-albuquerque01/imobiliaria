import { InsertUserComponent } from '@/components/user/insert-user'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: {
    template: '%s',
    default: 'Insert user',
  },
}

export default function InsertUser() {
  return (
    <div className="flex justify-center items-center h-[calc(100vh-80px)]">
      <InsertUserComponent />
    </div>
  )
}
