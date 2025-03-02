
import {Providers} from "../providers";

import Nav from '../Components/nav';
import Home from '../Components/home';
import Experience from '../Components/experience';
import Contact from '../Components/contact';
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
      <Home />
    </div>

    <div id="about" className="section">
     {children}
    </div>

    <div id="experience" className="section">
      <Experience/>
    </div>

    <div id="contact" className="section">
      <Contact/>
    </div>
    </div>
        </Providers>
      </body>
    </html>
  );
}