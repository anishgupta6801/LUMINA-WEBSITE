'use client'

import { motion } from 'motion/react'
import { Menu, X } from 'lucide-react'
import { useState, useEffect } from 'react'

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
    setIsMenuOpen(false)
  }

  return (
    <motion.header 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-lg border-b border-gray-200/50 shadow-lg' 
          : 'bg-black/30 backdrop-blur-md border-b border-white/20'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="flex items-center space-x-3"
          >
            {/* Logo Image */}
            <div className="w-8 h-8 rounded-full overflow-hidden bg-gradient-to-r from-amber-400 to-orange-500 flex items-center justify-center">
              <span className={`text-sm font-bold ${isScrolled ? 'text-white' : 'text-white'}`}>
                L
              </span>
            </div>
            {/* Brand Name */}
            <span className={`text-xl font-bold tracking-wider ${
              isScrolled ? 'text-gray-900' : 'text-white'
            }`}>
              LUMINA
            </span>
          </motion.div>
          
          <nav className="hidden md:flex items-center space-x-8">
            {['MENU', 'ABOUT', 'CONTACT'].map((item, index) => (
              <motion.button
                key={item}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                onClick={() => scrollToSection(item.toLowerCase())}
                className={`relative py-2 px-1 text-sm font-semibold tracking-wider transition-colors duration-300 ${
                  isScrolled 
                    ? 'text-gray-900 hover:text-amber-600' 
                    : 'text-white hover:text-amber-300'
                }`}
              >
                {item}
                <motion.div
                  className={`absolute bottom-0 left-0 w-full h-0.5 ${
                    isScrolled ? 'bg-amber-600' : 'bg-amber-300'
                  }`}
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.button>
            ))}
          </nav>

          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={`md:hidden p-2 rounded-lg transition-colors ${
              isScrolled 
                ? 'text-gray-900 hover:bg-gray-100' 
                : 'text-white hover:bg-white/10'
            }`}
          >
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </motion.button>
        </div>
      </div>

      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className={`md:hidden border-t transition-colors ${
            isScrolled 
              ? 'bg-white/95 border-gray-200/50' 
              : 'bg-black/30 border-white/20'
          }`}
        >
          <div className="px-6 py-4 space-y-3">
            {['MENU', 'ABOUT', 'CONTACT'].map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item.toLowerCase())}
                className={`block w-full text-left py-2 text-sm font-semibold tracking-wider transition-colors ${
                  isScrolled 
                    ? 'text-gray-900 hover:text-amber-600' 
                    : 'text-white hover:text-amber-300'
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        </motion.div>
      )}
    </motion.header>
  )
}