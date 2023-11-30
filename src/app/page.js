import Image from 'next/image'
import Navbar from '../components/Navbar'
import { useRouter } from 'next/navigation'
import { userAgent } from 'next/server'

export default function Home() {
  const router = useRouter()
  router.push('/profile')
  return (
    <main className="w-full h-full ">
      <Navbar />
    </main>
  )

}
