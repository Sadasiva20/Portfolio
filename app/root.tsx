import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import Nav from './Components/nav';
import About from './Components/about';
import Contact from './Components/contact';
import Home from './Components/home';
import Experience from './Components/experience';
import type { LinksFunction } from "@remix-run/node";
import {NextUIProvider} from "@nextui-org/react";
import { ReactNode, useEffect} from 'react';
import { Link, useLocation } from 'react-router-dom';

import "./tailwind.css";

export const links: LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
];


export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}


export default function App() {
  const location = useLocation();

  useEffect(() => {
    const scrollToSection = () => {
      const path = location.pathname;
      let targetSection;

      if (path === "/") {
        document.title = "Home";
        targetSection = document.getElementById("home");
      } else if (path === "/about") {
        document.title = "About";
        targetSection = document.getElementById("about");
      } else if (path === "/experience") {
        document.title = "Experience";
        targetSection = document.getElementById("experience");
      } else if (path === "/contact") {
        document.title = "Contact";
        targetSection = document.getElementById("contact");
      }
      if (targetSection) {
    
        targetSection.scrollIntoView({ behavior: "smooth", block: "start" });
    
        setTimeout(() => {
            const offset = 65; 
            const sectionPosition = targetSection.getBoundingClientRect().top + window.scrollY;
            
            window.scrollTo({
                top: sectionPosition - offset,
                behavior: "smooth"
            });
        }, 0); 
      }
    }
    scrollToSection();
  }, [location]);

  return (
    <NextUIProvider>
      <div>
        <Nav />
        <main>
          <ScrollRestoration />
          <Scripts />
          <LiveReload />

          <div id="home" className="section">
            <Home />
          </div>

          <div id="about" className="section">
            <About />
          </div>

          <div id="experience" className="section">
            <Experience/>
          </div>

          <div id="contact" className="section">
            <Contact />
          </div>
        </main>
        <footer>
        </footer>
      </div>
    </NextUIProvider>
  );
}

