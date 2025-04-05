import React, { useState } from "react";
import { FaBars } from "react-icons/fa";
import { FaXmark } from "react-icons/fa6";

const navItems = [
	{ label: "Home", href: "/#" },
	{ label: "About", href: "/#about" },
	{ label: "Services", href: "/#services" },
];

const Navbar = () => {
	const [menu, openMenu] = useState(false);

	return (
		<nav className="flex justify-between items-center px-10 py-4 md:px-20 text-white fixed z-20 w-full bg-blue-950 shadow-lg">
			{/* Logo */}
			<a href="/#" className="flex items-center flex-shrink-0">
				<span className="text-2xl font-bold">FlyHelp</span>
			</a>

			{/* Desktop Menu */}
			<ul className="hidden md:flex gap-8 text-lg">
				{/* <li>
					<a
						href="#about"
						className="hover:text-blue-300 hover:underline transition-colors duration-200"
					>
						About
					</a>
				</li>
				<li>
					<a
						href="#services"
						className="hover:text-blue-300 hover:underline transition-colors duration-200"
					>
						Services
					</a>
				</li> */}
				{navItems.map((item, index) => (
					<li key={index}>
						<a
							href={item.href}
							target={item.target} // Dynamically set target
							rel={item.rel} // Dynamically set rel
							className="hover:text-blue-300 hover:underline transition-colors duration-200"
						>
							{item.label}
						</a>
					</li>
				))}
			</ul>

			{/* Mobile Menu Button */}
			<div className="md:hidden relative">
				<button onClick={() => openMenu(!menu)} className="focus:outline-none">
					{menu ? <FaXmark size={25} /> : <FaBars size={25} />}
				</button>

				{/* Small Dropdown Menu (Top Right) */}
				{menu && (
					<ul className="absolute right-0 mt-2 bg-blue-200 text-black font-semibold shadow-lg rounded-lg w-25 -mr-6 py-2 z-30">
						{/* <li>
							<a
								href="#about"
								className="block px-4 py-2 hover:bg-gray-200"
								onClick={() => openMenu(false)}
							>
								About
							</a>
						</li>
						<li>
							<a
								href="#services"
								className="block px-4 py-2 hover:bg-gray-200"
								onClick={() => openMenu(false)}
							>
								Services
							</a>
						</li> */}
						{navItems.map((item, index) => (
							<li key={index}>
								<a
									href={item.href}
									target={item.target} // Dynamically set target
									className="block px-4 py-2"
									rel={item.rel} // Dynamically set rel
									onClick={() => openMenu(!menu)}
								>
									{item.label}
								</a>
							</li>
						))}
					</ul>
				)}
			</div>
		</nav>
	);
};

export default Navbar;
