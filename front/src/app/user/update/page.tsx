import { UpdateUserComponent } from '@/components/user/update/updateUser'
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
      <UpdateUserComponent />
    </div>
  )
}
