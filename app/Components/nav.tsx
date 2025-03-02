
"use client";

import React from "react";

import {Navbar,NavbarMenuToggle, NavbarMenu, NavbarItem, NavbarMenuItem, NavbarContent} from "@heroui/react";

import Link from 'next/link'

export default function Nav() {

  const [isNavOpen, setNavOpen] = React.useState(false);

  const NavItems = [
      { label: "Home", href: "/home" },
      { label: "About", href: "/about" },
      { label: "Experience", href: "/experience" },
      { label: "Contact", href: "/contact" },
    ];

  const handleLinkClick = () => {
    setNavOpen(false); 
  };

    return (
      
    <Navbar className = "dark  bg-nav text-white shadow-md"  onMenuOpenChange={setNavOpen} >
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isNavOpen ? "Close menu" : "Open menu"}
          className="sm:hidden" 
           onClick={() => setNavOpen(!isNavOpen)} 
           />
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center" >
        <NavbarItem>
           <Link className = " text-lg hover:bg-accent text-white transition duration-75" href="/home"> <strong>Home </strong> </Link>
        </NavbarItem>
        <NavbarItem>
           <Link className = "text-lg hover:bg-accent text-white transition duration-75 " href="/about"> <strong> About </strong> </Link>
        </NavbarItem>
        <NavbarItem>
          <Link className = "text-lg hover:bg-accent text-white transition duration-75" href="/experience"> <strong>  Experience </strong> </Link>
        </NavbarItem>
      <NavbarItem>
      <Link className = " text-lg hover:bg-accent text-white transition duration-75" href="/contact"> <strong> Contact </strong> </Link>
   </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
      </NavbarContent>
      <NavbarMenu className="bg-nav">
        {NavItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
               <Link className={`text-lg text-white block py-2 hover:bg-accent`} 
                 href={item.href}
                 onClick={handleLinkClick}>
            <strong> {item.label} </strong> 
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}


