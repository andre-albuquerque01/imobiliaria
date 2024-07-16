'use client'
import VerifyEmailAction from '@/actions/user/verifyEmail'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function VerifyEmail({ params }: { params: { id: string } }) {
  const router = useRouter()
  useEffect(() => {
    const handleData = async () => {
      const data = await VerifyEmailAction(params.id[0], params.id[1])
      alert(data)
      router.push('/')
    }
    handleData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
}
