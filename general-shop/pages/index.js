import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <Head>
        <title>General Shop</title>
        <meta name="description" content="Camisetas Basicas con sentido Práctico" />
        <meta charset="utf-8"/>
    <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <link rel="icon" href="" />
      </Head>
      <main className={`${styles.main} ${inter.className}`}>

        <div className={styles.center}>
          <Image
            className={styles.logo}
            src="/next.svg"
            alt="Next.js Logo"
            width={180}
            height={37}
            priority
          />
        </div>

        <div className={styles.grid}>
        <Link href="/registro" className={styles.card}>
            Registrarse
        </Link>
          
        <Link href="/login" className={styles.card}>
            Inicio Sesion
        </Link>
        </div>
      </main>
    </>
  )
}
