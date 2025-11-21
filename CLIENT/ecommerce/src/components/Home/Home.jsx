import React from 'react'
import Footer from '../Footer/Footer'
import Navbar from './Navbar'

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="sticky top-0 z-20">
        <Navbar />
      </header>

      <main className="flex-1">
      </main>

      <footer className="mt-auto">
        <Footer />
      </footer>
    </div>
  )
}

export default Home
