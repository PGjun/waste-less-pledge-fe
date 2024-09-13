import Image from 'next/image'
import background from '@/app/images/main.png'
import { Main } from './container/main'

export default function Home() {
  return (
    <div className="">
      <div className="relative flex items-center justify-center">
        <Image
          src={background}
          alt="main-banner"
          className="absolute top-0 -z-10"
        />
        <Main />
      </div>
    </div>
  )
}
