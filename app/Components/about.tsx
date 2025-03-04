
"use client";

import github from '../Icons/github.svg';
import  linkedin from '../Icons/linkedin.svg';
import Image from 'next/image';


import type { Metadata } from 'next'

export const metadata: Metadata = {
  title:'About',
  description: 'Learn more about Siva Sankar, a recent graduate with a master’s degree in Computer Science, a Software Engineer with experience at Up Cancer, and a Coder at Outlier AI. Discover his education, work experience, and hobbies.',
  keywords: ['Siva Sankar', 'Software Engineer', 'Computer Science', 'Up Cancer', 'Outlier AI', 'Education', 'Work Experience', 'Hobbies']
}

export default function About() {
    return (
        <div className="flex flex-col min-h-screen bg-primary  ">
        <head>
        <meta charSet="utf-8" />
        <title>About</title>
        <meta name="description" content="About" /> 
        <meta name ="keyword" content = "Experience, Programming, and interests"/>
        </head>

        <h3 className="text-3xl md:text-4xl text-white font-bold text-center font-custom2">About</h3>

        <main className="flex-grow flex flex-col items-center justify-center px-4 py-8">


            <section className="max-w-2xl mb-8">

                <h3 className="text-4xl font-bold text-white mb-4 font-custom2">Education</h3>
                <p className="text-base text-white mb-6 font-custom2">
                I&apos;m a recent graduate from the University of Illinois Springfield, where I earned my master&rsquo;s degree in Computer Science in December 2023. Before that, I completed my studies at the University of North Carolina Wilmington, graduating with a bachelor&rsquo;s degree in Information Technology in December 2020. Throughout my academic journey, I built a solid foundation in computer science principles, algorithms, software engineering, and web development. I had the opportunity to work on a variety of compelling projects, igniting my passion for creating innovative solutions.

                </p>
            </section>

            <section className="max-w-2xl mb-8">
                <h3 className="text-4xl font-bold text-white mb-4 font-custom2">Work Experience</h3>
                <p className="text-base text-white mb-6 font-custom2">
                    I&apos;ve spent years of working as a Software Engineer  at <span className="font-bold">Up Cancer</span>, a nonprofit organization. Here I&apos;ve had the opportunity to:
                </p>
                <ul className="list-disc list-inside text-base text-white mb-6 font-custom2">
                <li>Collaborate with cross-functional teams to develop front-end and back-end solutions.</li>
                <li>Crafted comprehensive documentation that greately benefited the organization.</li>
                <li>Developed product mockups before developing them.</li>
                </ul>
                <p className="text-base text-white mb-6 font-custom2">

                I volunteered as a Web Application Developer at <span className="font-bold">Oppia</span>, a nonprofit dedicated to making education more accessible, where I contributed to the following:
                </p>
                <ul className="list-disc list-inside text-base text-white mb-6 font-custom2">
                <li>Excelled in producing comprehensive user documentation, significantly enhancing user experience and support.</li>
                <li>Designed and engineered user-centric applications and websites that not only met but exceeded user expectations.</li>
                <li>Implemented changes using Python, HTML, JavaScript, and CSS, while utilizing GitHub for version control to ensure collaboration and code integrity.</li>
                </ul>

                <p className="text-base text-white mb-6 font-custom2">

                Currently, I am a Coder at <span className="font-bold">Outlier AI </span>, where I focus on training AI models to enhance accuracy.

                </p>
            </section>

            <section className="max-w-2xl mb-8">
                <h2 className="text-4xl font-bold text-white mb-4 font-custom1">Hobbies</h2>
                <p className="text-base text-white mb-6 font-custom2">
                Outside of coding, I have a passion for fixing computers and playing video games, activities that not only spark my creativity but also enhance my problem-solving abilities. I also enjoy contributing to open-source projects on GitHub and keeping up to date with the latest technology trends. I believe that exploring diverse interests greatly enriches my skill set and perspective in the tech landscape.
                </p>
            </section>
        </main>


        <footer className="bg-primary text-white py-6 text-center">
        <p className="flex justify-center items-center space-x-8 mb-0">
          <span className="text-sm">&copy; {new Date().getFullYear()} Siva Sankar </span>


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
