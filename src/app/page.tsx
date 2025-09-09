import Hero from './components/Hero'
import Problem from './components/Problem'
import Solutions from './components/Solutions'
import Benefits from './components/Benefits'
import Contact from './components/Contact'
import Footer from './components/Footer'

export default function Home() {
  return (
    <>
      <main>
        <Hero />
        <Problem />
        <Solutions />
        <Benefits />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
