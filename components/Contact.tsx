'use client'

import { motion } from 'motion/react'
import { MapPin, Phone, Clock, Mail } from 'lucide-react'

const contactInfo = [
  {
    icon: MapPin,
    title: 'LOCATION',
    details: ['Greater Noida W Rd','Sector 4', 'Greater Noida', 'India']
  },
  {
    icon: Phone,
    title: 'RESERVATIONS',
    details: ['+91 9876543210', 'Available 24/7']
  },
  {
    icon: Clock,
    title: 'HOURS',
    details: ['Tue - Sat: 5:30pm - 11:00pm', 'Sun: 5:00pm - 10:00pm', 'Closed Mondays']
  },
  {
    icon: Mail,
    title: 'EMAIL',
    details: ['reservations@lumina.com', 'events@lumina.com']
  }
]

export function Contact() {
  return (
    <section id="contact" className="py-20 lg:py-32 bg-background">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl tracking-tight mb-6">
            VISIT US
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            We look forward to welcoming you for an unforgettable dining experience
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-16">
          {contactInfo.map((info, index) => (
            <motion.div
              key={info.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="text-center group"
            >
              <div className="w-16 h-16 mx-auto mb-6 bg-muted rounded-full flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                <info.icon size={24} />
              </div>
              <h3 className="text-lg mb-4 tracking-wide">
                {info.title}
              </h3>
              <div className="space-y-1 text-muted-foreground">
                {info.details.map((detail, detailIndex) => (
                  <p key={detailIndex} className="text-sm">
                    {detail}
                  </p>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-muted/50 rounded-2xl p-8 lg:p-12 text-center"
        >
          <h3 className="text-2xl md:text-3xl tracking-wide mb-6">
            MAKE A RESERVATION
          </h3>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Reservations are highly recommended and can be made up to 15 days in advance. 
            For parties of 8 or more, please call us directly.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.a
              href="/booking.html"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="inline-block px-8 py-3 bg-primary text-primary-foreground hover:bg-primary/90 transition-colors duration-300 tracking-wide text-center"
            >
              Book Online
            </motion.a>
            <motion.button
              onClick={() => window.location.href = 'tel:+919876543210'}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-8 py-3 border border-border hover:bg-muted transition-colors duration-300 tracking-wide"
            >
              Call Now
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}