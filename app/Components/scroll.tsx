'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/compat/router';

export default function ScrollToSection() {
  const [isMounted, setIsMounted] = useState(false);  
  const router = useRouter();  

 
  useEffect(() => {
    setIsMounted(true);  
  }, []);

  useEffect(() => {
  
    if (isMounted && router && router.pathname) {
      const { pathname } = router;
      let targetSection;

 
      if (pathname === "/") {
        targetSection = document.getElementById("home");
      } else if (pathname === "/about") {
        targetSection = document.getElementById("about");
      } else if (pathname === "/experience") {
        targetSection = document.getElementById("experience");
      } else if (pathname === "/contact") {
        targetSection = document.getElementById("contact");
      }

     
      if (targetSection) {
        targetSection.scrollIntoView({ behavior: "smooth", block: "start" });

       
        const offset = 65; 
        setTimeout(() => {
          const sectionPosition = targetSection.getBoundingClientRect().top + window.scrollY;
          window.scrollTo({
            top: sectionPosition - offset,
            behavior: "smooth",
          });
        }, 0);
      }
    }
  }, [router, router?.pathname, isMounted]); 

  return null; 
}
