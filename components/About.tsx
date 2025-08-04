'use client'

import { motion } from 'motion/react'
import { ImageWithFallback } from './figma/ImageWithFallback'

export function About() {
  return (
    <section id="about" className="py-20 lg:py-32 bg-muted/30">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8 }}
            className="order-2 lg:order-1"
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl tracking-tight mb-8">
              OUR STORY
            </h2>
            
            <div className="space-y-6 text-lg leading-relaxed text-muted-foreground">
              <p>
                Founded in 2010, Lumina emerged from a simple vision: to create a dining experience 
                where exceptional cuisine meets unparalleled hospitality. Our commitment to excellence 
                has earned us recognition among the world's finest restaurants.
              </p>
              
              <p>
                Executive Chef Marcus Laurent brings over two decades of culinary expertise, having 
                trained in the most prestigious kitchens of France and Japan. His innovative approach 
                combines classic techniques with modern creativity.
              </p>
              
              <p>
                Every detail at Lumina is carefully considered, from our locally-sourced ingredients 
                to our thoughtfully curated wine selection. We believe that dining is an art form, 
                and each visit should be a memorable journey.
              </p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-10 grid grid-cols-3 gap-8 text-center"
            >
              <div>
                <div className="text-2xl md:text-3xl mb-2">15+</div>
                <div className="text-sm text-muted-foreground tracking-wide">YEARS</div>
              </div>
              <div>
                <div className="text-2xl md:text-3xl mb-2">3</div>
                <div className="text-sm text-muted-foreground tracking-wide">MICHELIN STARS</div>
              </div>
              <div>
                <div className="text-2xl md:text-3xl mb-2">50+</div>
                <div className="text-sm text-muted-foreground tracking-wide">AWARDS</div>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8 }}
            className="order-1 lg:order-2"
          >
            <div className="relative">
              <div className="aspect-[4/5] rounded-2xl overflow-hidden">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=800&q=80"
                  alt="Chef preparing food"
                  className="w-full h-full object-cover"
                />
              </div>
              
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="absolute -bottom-6 -right-6 w-32 h-32 rounded-xl overflow-hidden shadow-lg"
              >
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&q=80"
                  alt="Restaurant interior"
                  className="w-full h-full object-cover"
                />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}