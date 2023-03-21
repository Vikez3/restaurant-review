import React from 'react'
import { Link } from 'react-router-dom'
import { FaHeart } from 'react-icons/fa'

type Props = {}

export default function Navbar({ }: Props) {
  return (
    <nav className='container nav'>
      <Link to={'/'} className='logo'>RESTOURANT</Link>
      <Link to={'/favourites'} className='favourites-link'><FaHeart /></Link>
    </nav>
  )
}