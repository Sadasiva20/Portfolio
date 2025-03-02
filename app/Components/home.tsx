"use client";

import github from '../Icons/github.svg';
import  linkedin from '../Icons/linkedin.svg';
import picture from '../Images/Picture3.png'
import  Image from 'next/image';
import type { Metadata } from 'next' 


export const metadata: Metadata = {
  title: 'Home',
  description: 'Welcome to the portfolio of Siva Sankar, a passionate Software Engineer. Explore my professional journey, projects, and personal interests.',
  keywords: ['Introduction', 'Interests', 'Occupation', 'Sadasiva Sankar', 'Software Engineer', 'Projects', 'Portfolio'],
} 


export default function Home() {
    return (
        <div className="flex flex-col min-h-screen bg-primary">
        <head>
        <meta charSet="utf-8" />
        <title>Home</title>
         <meta name="description" content="Home" />
         <meta name = "keyword"   content = "Introduction, Interests and Occupation , Sadasiva Sankar " />
         <link rel="canonical" href="https://sivasan29.com/home" />
        </head>
    
           
    
<main className="bg-primary text-white flex-grow flex flex-col items-center justify-center px-4 py-12 font-sans">
    <section className="max-w-2xl text-center mb-8">
    <div className="flex justify-center items-center ">
    <Image src= {picture} alt="Picture of me." />
   </div>
    <h3 className="text-lg mt-2 text-center font-bold font-custom2"> Welcome! I’m Siva Sankar, a Software Engineer </h3>
        <p className="text-base mb-6 leading-relaxed font-custom2">
        I have a passion for creating dynamic web applications and tackling complex challenges with innovative technology solutions. 
        This portfolio showcases my professional journey, featuring my experience, projects, and personal interests. 
        I invite you to explore my work and discover how I can contribute to your business success.
        </p>
        <a href="/experience">
        <button className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg text-lg">
            View My Projects
        </button>
        </a>
    </section>
</main>
<footer className="bg-primary text-white py-6 text-center">
        <p className="flex justify-center items-center space-x-8 mb-0">
          <span className="text-sm">&copy; {new Date().getFullYear()} Siva Sankar</span>
          
         
          <span className="mx-2">
            <a
              href="https://github.com/Sadasiva20?tab=repositories"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-blue-500"
            >
              <Image
                src={github}
                alt="GitHub"
                className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 transition-transform transform hover:scale-125"
              />
            </a>
          </span>

     
          <span className="mx-2">
            <a
              href="https://www.linkedin.com/in/ssank31/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-blue-500"
            >
              <Image
                src={linkedin}
                alt="LinkedIn"
                className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 transition-transform transform hover:scale-125"
              />
            </a>
          </span>
        </p>
      </footer>
    </div>
  );
}
