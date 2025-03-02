
import {Providers} from "../providers";

import Nav from '../Components/nav';
import Home from '../Components/home';
import About from '../Components/about';
import Experience from '../Components/experience';
import Scroll from '../Components/scroll';






export default function RootLayout({children}: { children: React.ReactNode }) {
  return (
    <html lang="en" className='dark'>
    <meta charSet="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <body>
    <Providers>
    <div>
    <Nav/>
    <Scroll/>
    <div id="home" className="section">
     <Home/>
    </div>

    <div id="about" className="section">
    <About />
    </div>

    <div id="experience" className="section">
    <Experience/>
    </div>

    <div id="contact" className="section">
      {children}
    </div>
    </div>
    </Providers>
    </body>
    </html>
  );
}
