import React, { useState } from 'react'
import { FaBars } from "react-icons/fa";
import { FaXmark } from "react-icons/fa6";

const Navbar = () => {
	const [menu, openMenu] = useState(false);
	const [showMenu, setShowMenu] = useState(true);
  return (
	<nav className='flex flex-wrap justify-between items-center px-10 py-4 md:px-20 text-white fixed z-10 w-full bg-blue-950'>
		<a href="/#" className="flex items-center flex-shrink-0">
            <span className="text-2xl font-bold">FlyHelp</span>
			{/* <img className="h-10 w-10 mr-2" src={logo} alt="Logo" /> */}
          </a>
		<ul className={`${menu? "block":"hidden"} mx-24 font-semibold px-2 text-center md:static md:mx-0 md:flex gap-6`}>
			<a href="#about"><li>About</li></a>
			<a href="#services"><li>Services</li></a>
		</ul>
		{showMenu? (
			<FaBars 
			    size={15}
				className='md:hidden cursor-pointer absolute right-10 top-6 transition-all duration-200'
				onClick={() => {
					openMenu(!menu);
					setShowMenu(!showMenu);
				}}
			/>
		) : (
			<FaXmark 
			    size={15}
				className='md:hidden cursor-pointer absolute right-10 top-6 transition-all duration-200'
				onClick={() => {
					openMenu(!menu);
					setShowMenu(!showMenu);
				}}
			/>

		)
		}
	</nav>
  )
}

export default Navbar