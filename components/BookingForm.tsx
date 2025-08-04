'use client'

import { motion } from 'motion/react'
import { useState } from 'react'
import { Calendar, Clock, Users, User, Mail, Phone, MessageSquare } from 'lucide-react'

export function BookingForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    guests: '2',
    occasion: '',
    specialRequests: ''
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Send data to MongoDB via API
      const response = await fetch('/api/reservations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          submittedAt: new Date().toISOString()
        })
      })

      const result = await response.json()

      if (result.success) {
        // Store reservation ID for thank you page
        sessionStorage.setItem('reservationId', result.reservationId)
        // Redirect to thank you page
        window.location.href = '/thank-you.html'
      } else {
        alert(`Error: ${result.error || 'There was an error submitting your reservation. Please try again.'}`)
      }
    } catch (error) {
      console.error('Error:', error)
      alert('There was an error submitting your reservation. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const timeSlots = [
    '17:30', '18:00', '18:30', '19:00', '19:30', '20:00', 
    '20:30', '21:00', '21:30', '22:00', '22:30'
  ]

  const occasions = [
    'Birthday', 'Anniversary', 'Date Night', 'Business Dinner', 
    'Family Gathering', 'Celebration', 'Other'
  ]

  return (
    <div className="min-h-screen bg-background pt-20">
      <div className="max-w-4xl mx-auto px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl tracking-tight mb-6">
            MAKE A RESERVATION
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            We look forward to welcoming you for an exceptional dining experience at Lumina
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-card rounded-2xl shadow-lg p-8"
        >
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Personal Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="flex items-center text-sm font-medium mb-3">
                  <User className="w-4 h-4 mr-2" />
                  Full Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                  placeholder="Enter your full name"
                />
              </div>

              <div>
                <label className="flex items-center text-sm font-medium mb-3">
                  <Mail className="w-4 h-4 mr-2" />
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                  placeholder="Enter your email"
                />
              </div>

              <div>
                <label className="flex items-center text-sm font-medium mb-3">
                  <Phone className="w-4 h-4 mr-2" />
                  Phone Number *
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                  placeholder="+91 XXXXX XXXXX"
                />
              </div>

              <div>
                <label className="flex items-center text-sm font-medium mb-3">
                  <Users className="w-4 h-4 mr-2" />
                  Number of Guests *
                </label>
                <select
                  name="guests"
                  value={formData.guests}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                >
                  {[1,2,3,4,5,6,7,8,9,10].map(num => (
                    <option key={num} value={num}>{num} {num === 1 ? 'Guest' : 'Guests'}</option>
                  ))}
                  <option value="10+">10+ Guests (Call for arrangement)</option>
                </select>
              </div>
            </div>

            {/* Reservation Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="flex items-center text-sm font-medium mb-3">
                  <Calendar className="w-4 h-4 mr-2" />
                  Preferred Date *
                </label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  required
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                />
              </div>

              <div>
                <label className="flex items-center text-sm font-medium mb-3">
                  <Clock className="w-4 h-4 mr-2" />
                  Preferred Time *
                </label>
                <select
                  name="time"
                  value={formData.time}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                >
                  <option value="">Select time</option>
                  {timeSlots.map(time => (
                    <option key={time} value={time}>{time}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Occasion */}
            <div>
              <label className="flex items-center text-sm font-medium mb-3">
                <MessageSquare className="w-4 h-4 mr-2" />
                Special Occasion (Optional)
              </label>
              <select
                name="occasion"
                value={formData.occasion}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
              >
                <option value="">Select occasion</option>
                {occasions.map(occasion => (
                  <option key={occasion} value={occasion}>{occasion}</option>
                ))}
              </select>
            </div>

            {/* Special Requests */}
            <div>
              <label className="text-sm font-medium mb-3 block">
                Special Requests or Dietary Requirements
              </label>
              <textarea
                name="specialRequests"
                value={formData.specialRequests}
                onChange={handleChange}
                rows={4}
                className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all resize-none"
                placeholder="Please let us know about any allergies, dietary restrictions, or special requests..."
              />
            </div>

            {/* Submit Button */}
            <div className="text-center pt-6">
              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-12 py-4 bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 tracking-wide text-lg rounded-lg"
              >
                {isSubmitting ? 'Submitting...' : 'CONFIRM RESERVATION'}
              </motion.button>
            </div>

            <p className="text-sm text-muted-foreground text-center mt-6">
              * Required fields. We'll contact you within 24 hours to confirm your reservation.
            </p>
          </form>
        </motion.div>
      </div>
    </div>
  )
}
