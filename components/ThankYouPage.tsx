'use client'

import { motion } from 'motion/react'
import { CheckCircle, Calendar, Phone, Mail, ArrowLeft } from 'lucide-react'

export function ThankYouPage() {
  return (
    <div className="min-h-screen bg-background pt-20">
      <div className="max-w-4xl mx-auto px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="inline-flex items-center justify-center w-24 h-24 bg-green-100 rounded-full mb-8"
          >
            <CheckCircle className="w-12 h-12 text-green-600" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-4xl md:text-5xl lg:text-6xl tracking-tight mb-6"
          >
            THANK YOU!
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto"
          >
            Your reservation request has been successfully submitted
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="bg-card rounded-2xl shadow-lg p-8 mb-8 max-w-2xl mx-auto"
          >
            <h2 className="text-2xl font-semibold mb-6 text-center">What happens next?</h2>
            
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-semibold text-sm">
                  1
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Confirmation Call</h3>
                  <p className="text-muted-foreground text-sm">
                    Our team will contact you within 24 hours to confirm your reservation details
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-semibold text-sm">
                  2
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Email Confirmation</h3>
                  <p className="text-muted-foreground text-sm">
                    You'll receive a detailed confirmation email with your reservation information
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-semibold text-sm">
                  3
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Dining Experience</h3>
                  <p className="text-muted-foreground text-sm">
                    Arrive at your reserved time and enjoy an exceptional culinary journey
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
          >
            <div className="bg-card rounded-xl p-6 shadow-sm">
              <Phone className="w-8 h-8 text-primary mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Call Us</h3>
              <p className="text-sm text-muted-foreground mb-2">Need to modify your reservation?</p>
              <p className="text-sm font-medium">+91 9876543210</p>
            </div>

            <div className="bg-card rounded-xl p-6 shadow-sm">
              <Mail className="w-8 h-8 text-primary mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Email Us</h3>
              <p className="text-sm text-muted-foreground mb-2">Have questions or special requests?</p>
              <p className="text-sm font-medium">reservations@lumina.com</p>
            </div>

            <div className="bg-card rounded-xl p-6 shadow-sm">
              <Calendar className="w-8 h-8 text-primary mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Cancellation</h3>
              <p className="text-sm text-muted-foreground mb-2">Free cancellation up to</p>
              <p className="text-sm font-medium">24 hours before</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="space-y-4 md:space-y-0 md:space-x-6 md:flex md:justify-center"
          >
            <motion.button
              onClick={() => window.location.href = '/'}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center justify-center px-8 py-3 bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-300 tracking-wide rounded-lg"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </motion.button>
            
            <motion.button
              onClick={() => window.location.href = '/#menu'}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center justify-center px-8 py-3 border border-border hover:bg-muted transition-all duration-300 tracking-wide rounded-lg"
            >
              View Our Menu
            </motion.button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="mt-12 pt-8 border-t border-border"
          >
            <p className="text-sm text-muted-foreground">
              Follow us on social media for the latest updates and culinary creations
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}
