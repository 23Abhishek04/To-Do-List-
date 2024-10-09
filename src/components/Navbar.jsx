import React from 'react'

const Navbar = () => {
  return (
    <nav className='flex justify-between py-2 text-[#2B2B2B] bg-[#D1E8E2]'>
      <div className="logo">
        <span className='mx-8 font-bold text-x1'>iTask   <i class="fa-brands fa-apple"></i></span>
      </div>
      <ul className='flex gap-8'>
        <li className='transition-all duration-75 cursor-pointer hover:font-bold'>Home   <i className="fa-solid fa-house "></i></li>
        <li className='transition-all duration-75 cursor-pointer hover:font-bold'>Your Tasks</li>
      </ul>
    </nav>
  )
}

export default Navbar
