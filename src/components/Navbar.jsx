import React from 'react'
import { NavLink } from 'react-router'

const navbar = () => {
  return (
    <div className='flex flex-row gap-4'>
        <NavLink to="/">
            Home
        </NavLink>
        <NavLink to="/pastes"> 
            Pastes
        </NavLink>
    </div>
  )
}

export default navbar