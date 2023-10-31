import Navbar from '@/components/Navbar'
import { Inter } from 'next/font/google'


const inter = Inter({ subsets: ['latin'] })

export default function App({ Component, pageProps }) {
  return (
    <>
      <Navbar />
      <Component {...pageProps} />
      
    </>
  )
}
