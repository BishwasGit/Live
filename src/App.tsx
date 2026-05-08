import { useState, useCallback } from "react"
import PreLoader from "./components/PreLoader"
import HeroNav from "./components/navigation/HeroNav"
import BottomNavDock from "./components/navigation/BottomNavDock"
import HeroSection from "./components/sections/HeroSection"
import TechStackSection from "./components/sections/TechStackSection"
import About from "./components/sections/About"
import CVDownloadSection from "./components/sections/CVDownloadSection"
import MusicPlayerSection from "./components/sections/MusicPlayerSection"
import ContactSection from "./components/sections/ContactSection"
import MyProjects from "./components/sections/MyProjects"
import BuyMeCoffeeSection from "./components/sections/BuyMeCoffeeSection"

export default function App() {
  const [preloaderDone, setPreloaderDone] = useState(false)

  const handleComplete = useCallback(() => {
    setPreloaderDone(true)
  }, [])

  useEffect(() => {
    document.title = "Bishwas Shrestha | Full Stack Web Developer Nepal"
  }, [])

  return (
    <>
      {!preloaderDone && <PreLoader onComplete={handleComplete} />}

       {preloaderDone && (
        <>
          <HeroNav />
          <BottomNavDock />
        </>
      )}
      <main style={{ minHeight: "100vh", background: "#070b13" }}>
        <HeroSection />
        <About />
        <MyProjects/>
        <TechStackSection />
        <MusicPlayerSection/>
        <ContactSection/>
        <CVDownloadSection/>
        <BuyMeCoffeeSection/>
      </main>
    </>
  )
}