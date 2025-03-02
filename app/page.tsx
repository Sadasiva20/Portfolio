

import Nav from './Components/nav';
import Home from './Components/home';
import About from './Components/about';
import Experience from './Components/experience';
import Contact from './Components/contact';

export default function Page() {

  return (
  <div> 
    <Nav />
    <section id="home">
    <Home />
    </section>
    <section id="about" >
     <About /> 
    </section>
    <section id="experience" >
      <Experience /> 
    </section>
    <section id="contact" >
     <Contact/> 
    </section>
    </div>
   
  );

}