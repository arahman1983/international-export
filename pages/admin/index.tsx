import { useRouter } from 'next/router'
import { useEffect } from 'react'
import {AdminLayout} from '../../components'

export default function AdminIndex(){
  const router = useRouter()
  useEffect(() => {
    router.push('/admin/about')
  }, [])
  return(
    <AdminLayout>
      <h1>Admin Index</h1>
    </AdminLayout>
  )
}
