"use client";

import { Card, CardBody,  CardFooter, Button } from "@heroui/react";
import github from '../Icons/github.svg';
import UpCancer from '../Images/UpCancer.jpg';
import linkedin from '../Icons/linkedin.svg';
import Jpass from '../Images/Jpass.jpg';
import todolist from '../Images/todolist.png';
import NGame from'../Images/NGame.jpg';
import Oppia from '../Images/oppia.jpg';
import Image from 'next/image';

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Experience - Siva Sankar',
  description: 'A comprehensive showcase of Siva Sankar\'s projects, demonstrating both frontend and backend development solutions using various technologies such as React, Node.js, JavaScript, Python, and Java.',
  keywords: ['Projects', 'Siva Sankar', 'Frontend', 'Backend', 'React', 'Node.js', 'JavaScript', 'Python', 'Java' , 'GitHub'],
}

const cardData = [
  { id: 1, src: UpCancer, title: "Up Cancer", details: "Technologies: React, node.js , Dynamodb, JavaScript", description: "A comprehensive showcase of my projects, demonstrating both frontend and backend development solutions."
   , link: "https://github.com/Sadasiva20/Up-Cancer-Workspace", linktitle: "Github link" },
  { id: 2, src: Oppia, title: "Oppia", details: "Technologies: Python, CSS, HTML, JavaScript", description: "A showcase of my projects, highlighting front-end and back-end development along with relevant documentation."
  ,link: "https://github.com/Sadasiva20/oppia/tree/develop", linktitle: "Github link" },
  { id: 3, src: todolist, title: "TaskNest", details: "Technologies: React, node.js, JavaScript, Remix ", description: "To do List app that allows users to add and delete tasks.", link: "https://github.com/Sadasiva20/Todolist", linktitle: "Github link" },
  { id: 4, src: Jpass, title: "JPass", details: "Technologies: Java ",description: "A Password Manager app that allows users to generate secure passwords by defining their length."
  , link: "https://github.com/Sadasiva20/PasswordGenerator", linktitle: "Github link" },
  { id: 5, src: NGame, title: "GuessIt!", details: "Technologies: Java" ,description: 
  "A Java-based Number Guessing game where users try to guess a number across four escalating difficulty levels." 
  , link: "https://github.com/Sadasiva20/NGuess", linktitle: "Github link" }
  ];


export default function Experience() {
 

  return (
    <div className="flex flex-col min-h-screen bg-primary overflow-hidden">
    <head>
      <meta charSet="utf-8" />
      <title>Experience</title>
       <meta name = "keyword"  content = "projects, github, work experience" />
       <meta name="description" content="Experience" />
    </head>
     <h1 className="text-3xl md:text-4xl font-bold text-white text-center font-custom2">Experience</h1>
    <main className="flex-grow flex flex-col items-center justify-center px-4 py-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
        {cardData.map(card => (
          <Card key={card.id} className="w-full max-w-[520px] border-none transition-transform transform hover:scale-105 relative bg-transparent">
            
            <CardBody className="flex flex-row flex-wrap p-0 sm:flex-nowrap bg-transparent">
              <Image
                alt={card.title}
                className="h-auto w-full flex-none object-cover object-top md:w-48"
                src={card.src}
              />
  
              <div className="px-4 py-5 bg-transparent">
                <h3 className="text-lg font-custom2 text-white">{card.title}</h3>
                <div className="flex flex-col gap-1 pt-2 text-sm text-default-400 font-custom2">
                  <p>{card.details}</p>
                  <p>{card.description}</p>
                </div>
              </div>
            </CardBody>
  
            <CardFooter className="absolute bottom-0 right-0 w-auto flex justify-end p-4 bg-transparent z-10">
              <Button
                variant="flat"
                color="default"
                radius="lg"
                size="sm"
                onPress={() => window.open(card.link, "_blank")}
                className="text-sm text-white bg-blue-600 opacity-100 hover:bg-blue-700"
              >
                {card.linktitle}
              </Button>
            </CardFooter>
          </Card>
        ))}
        <div className="col-span-1 sm:col-span-2 mt-4 flex justify-start">
        <a href="https://drive.google.com/uc?export=download&id=1lI6aejYHkD-QhnIqIaKkWw8VWiINw52b">
        <button className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg text-lg w-full sm:w-auto">
              Resume
     </button>
     </a>
     </div>
     </div>
      
    </main>
  
    <footer className="bg-primary text-white py-6 text-center">
      <p className="flex justify-center items-center space-x-8 mb-0">
        <span className="text-lg font-custom2">&copy; {new Date().getFullYear()} Siva Sankar</span>
    
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
