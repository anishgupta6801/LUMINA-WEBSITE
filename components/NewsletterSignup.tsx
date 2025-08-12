'use client'

import { motion } from 'motion/react'
import { useState } from 'react'
import { Mail, Check } from 'lucide-react'

export function NewsletterSignup() {
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState('')
  const [isSubscribed, setIsSubscribed] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setMessage('')

    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, name })
      })

      const result = await response.json()

      if (result.success) {
        setMessage('Thank you for subscribing! You\'ll receive our latest news and special offers.')
        setIsSubscribed(true)
        setEmail('')
        setName('')
      } else {
        setMessage(`Error: ${result.error || 'Subscription failed'}`)
      }
    } catch (error) {
      console.error('Error:', error)
      setMessage('There was an error. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSubscribed) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-primary/10 rounded-2xl p-8 text-center"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4"
        >
          <Check className="h-8 w-8 text-white" />
        </motion.div>
        <h3 className="text-2xl font-semibold mb-2">You're All Set!</h3>
        <p className="text-muted-foreground">
          Thank you for subscribing to our newsletter. You'll be the first to know about our special offers and events.
        </p>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-card rounded-2xl p-8"
    >
      <div className="text-center mb-6">
        <Mail className="h-12 w-12 text-primary mx-auto mb-4" />
        <h3 className="text-2xl font-semibold mb-2">Stay Updated</h3>
        <p className="text-muted-foreground">
          Subscribe to our newsletter for exclusive offers, seasonal menus, and special events.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name (optional)"
            className="w-full px-4 py-3 border border-border rounded-lg bg-background focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
          />
        </div>
        
        <div>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email address"
            required
            className="w-full px-4 py-3 border border-border rounded-lg bg-background focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
          />
        </div>

        {message && (
          <div className={`p-3 rounded-lg text-sm ${
            message.includes('Error') 
              ? 'bg-red-50 text-red-700 border border-red-200' 
              : 'bg-green-50 text-green-700 border border-green-200'
          }`}>
            {message}
          </div>
        )}

        <button
          type="submit"
          disabled={isSubmitting || !email}
          className="w-full bg-primary text-primary-foreground px-6 py-3 rounded-lg font-medium hover:bg-primary/90 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Subscribing...' : 'Subscribe to Newsletter'}
        </button>
      </form>

      <p className="text-xs text-muted-foreground mt-4 text-center">
        We respect your privacy. Unsubscribe at any time.
      </p>
    </motion.div>
  )
}
