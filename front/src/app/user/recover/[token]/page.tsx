import { UpdatePasswordRecoverComponent } from '@/components/user/recover/updatePasswordRecover'
import { redirect } from 'next/navigation'

export default function SendEmail({ params }: { params: { token: string } }) {
  if (!params) redirect('/')
  return (
    <div className="flex justify-center items-center h-[calc(100vh-80px)]">
      <UpdatePasswordRecoverComponent token={params.token} />
    </div>
  )
}
