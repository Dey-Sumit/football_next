import React from 'react'
import { FaChartPie, FaUserCog } from 'react-icons/fa'
import { MdChat } from 'react-icons/md'
import Link from 'next/link'

const Navbar = () => {
   return (
      <div className='fixed bottom-0 left-0 flex items-center justify-around w-full p-3 bg-dark boxShadow'>
         <Link href='/chat'>
            <a>
               <MdChat size={25} className='text-white' />
            </a>
         </Link>
         <Link href='/chat'>
            <a>
               <MdChat size={25} className='text-white' />
            </a>
         </Link>
         <Link href='/'>
            <a>
               <img
                  src='https://media.api-sports.io/football/teams/547.png'
                  className='logo-small'
                  alt='logo'
               />
            </a>
         </Link>
         <Link href='/league'>
            <a>
               <FaChartPie size={25} className='text-white' />
            </a>
         </Link>
         <Link href='/settings'>
            <a>
               <FaUserCog size={25} className='text-white' />
            </a>
         </Link>
      </div>
   )
}

export default Navbar
