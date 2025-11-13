import About from "./About";
import Contact from "./Contact";
import CTA from "./CTA";
import Features from "./Features";
//import Footer from "./Footer";
import Hero from "./Hero";
import MissionVision from "./MissionVision";
import Tools from "./Tools";
import WhyChoose from "./WhyChoose";
import Workflow from "./Workflow";

export default function Home() {
  return (
    <>
      <Hero />
      <About/>
      <Tools/>
      <CTA/>
      <Features/>
      <Workflow/>
      <WhyChoose/>
      <MissionVision/>
      <Contact/>
      {/* <Footer/> */}
    </>
  );
}
