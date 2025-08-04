'use client'

import { motion } from 'motion/react'
import { Instagram, Facebook, Twitter } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground py-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-xl mb-6 tracking-wide">LUMINA</h3>
            <p className="text-primary-foreground/80 leading-relaxed mb-6">
              An exceptional dining experience where culinary artistry meets timeless elegance.
            </p>
            <div className="flex space-x-4">
              <motion.a
                whileHover={{ scale: 1.1 }}
                href="#"
                className="w-10 h-10 bg-primary-foreground/10 rounded-full flex items-center justify-center hover:bg-primary-foreground/20 transition-colors"
              >
                <Instagram size={18} />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.1 }}
                href="#"
                className="w-10 h-10 bg-primary-foreground/10 rounded-full flex items-center justify-center hover:bg-primary-foreground/20 transition-colors"
              >
                <Facebook size={18} />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.1 }}
                href="#"
                className="w-10 h-10 bg-primary-foreground/10 rounded-full flex items-center justify-center hover:bg-primary-foreground/20 transition-colors"
              >
                <Twitter size={18} />
              </motion.a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h4 className="mb-6 tracking-wide">Quick Links</h4>
            <div className="space-y-3">
              {['Menu', 'Wine List', 'Private Dining', 'Gift Cards', 'Careers'].map((link) => (
                <button
                  key={link}
                  className="block text-primary-foreground/80 hover:text-primary-foreground transition-colors text-sm"
                >
                  {link}
                </button>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h4 className="mb-6 tracking-wide">Contact</h4>
            <div className="space-y-3 text-sm text-primary-foreground/80">
              <p>Greater Noida W Rd</p>
              <p>Sector 4, Greater Noida</p>
              <p>+91 1234567890</p>
              <p>reservations@lumina.com</p>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="pt-8 border-t border-primary-foreground/20 text-center"
        >
          <p className="text-sm text-primary-foreground/60">
            © 2024 Lumina Restaurant. All rights reserved.
          </p>
        </motion.div>
      </div>
    </footer>
  )
}