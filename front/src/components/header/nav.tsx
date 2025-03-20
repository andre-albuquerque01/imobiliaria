/* eslint-disable prettier/prettier */
'use client'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { LogoutComponente } from '../user/logout/logout'
import { AiOutlineLogin } from 'react-icons/ai'
import { IoHomeOutline } from 'react-icons/io5'
import { FaRegBuilding } from 'react-icons/fa'
import { FaRegCircleUser } from 'react-icons/fa6'

export const Header = ({ authentication }: { authentication: boolean }) => {
  const [navbar, setNavBar] = useState<boolean>(false)
  const [scrolling, setScrolling] = useState<boolean>(false)

  useEffect(() => {
    const handleResize = () => setNavBar(false)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      setScrolling(window.scrollY > 50)
      setNavBar(false)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      className={`top-0 w-full z-50 transition-all duration-300 ${scrolling ? 'bg-zinc-900/90 shadow-lg backdrop-blur-md' : 'bg-zinc-900'
        }`}
    >
      <div className="container mx-auto px-5 flex justify-between items-center w-full h-20 text-white">
        {/* Logo */}
        <Link href="/" className="text-2xl font-semibold">
          <Image src={'/logo.png'} alt="logo" width={100} height={50} />
        </Link>

        {/* Menu Mobile */}
        <button
          className="md:hidden h-[25px] z-30 w-8 flex flex-col gap-1 p-1 relative"
          onClick={() => setNavBar((e) => !e)}
        >
          <hr
            className={`bg-white h-1 w-full rounded border-none transition-all transform absolute ${navbar ? 'rotate-[50deg] top-2 ' : 'top-0 '
              }`}
          />
          <hr
            className={`h-1 w-full rounded border-none transition-all transform absolute ${navbar ? 'bg-transparent top-1 ' : 'bg-white top-2'
              }`}
          />
          <hr
            className={`bg-white h-1 w-full rounded border-none transition-all transform absolute ${navbar ? 'rotate-[-50deg] top-2 ' : 'top-4'
              }`}
          />
        </button>

        {/* Menu */}
        <div
          className={`z-50 transition-all w-full flex-col md:w-auto md:flex-row md:visible md:flex md:gap-1 
            text-white font-[700] items-center flex duration-1000 overflow-hidden top-[80px] right-0 left-0 justify-start gap-9 
            fixed h-0 md:h-auto md:static ${navbar ? 'w-full t h-screen pt-12 bg-black' : 'invisible flex transition-all duration-1000'}`}
        >
          <Link
            href="/"
            className="rounded-md hover:bg-zinc-600 p-2"
            onClick={() => setNavBar(false)}
            title='inicio'
          >
            <IoHomeOutline size={25} />
          </Link>
          {!authentication && (
            <Link
              href="/user/login"
              className="rtransform duration-500 rounded-md hover:bg-zinc-600 p-2"
              onClick={() => setNavBar(false)}
              title='login'
            >
              <AiOutlineLogin size={25} />
            </Link>
          )}
          {authentication && (
            <>
              <Link
                href="/house/user"
                className="rounded-md hover:bg-zinc-600 p-2"
                onClick={() => setNavBar(false)}
                title='Meus anúncios'
              >
                <FaRegBuilding size={25} />
              </Link>
              <Link
                href="/user/update"
                className="rounded-md hover:bg-zinc-600 p-2"
                onClick={() => setNavBar(false)}
                title='Perfil'
              >
                <FaRegCircleUser size={25} />
              </Link>
              <LogoutComponente />
            </>
          )}
        </div>
      </div>
    </header>
  )
}
