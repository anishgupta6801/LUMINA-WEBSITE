import { useState, useEffect } from 'react'
import { motion } from 'motion/react'
import { Calendar, Clock, Users, Phone, Mail, User } from 'lucide-react'

interface Reservation {
  _id: string
  name: string
  email: string
  phone: string
  date: string
  time: string
  guests: string
  occasion?: string
  specialRequests?: string
  status: 'pending' | 'confirmed' | 'cancelled'
  createdAt: string
}

export function AdminDashboard() {
  const [reservations, setReservations] = useState<Reservation[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    fetchReservations()
  }, [])

  const fetchReservations = async () => {
    try {
      const response = await fetch('/api/reservations')
      const result = await response.json()
      
      if (result.success) {
        setReservations(result.reservations)
      } else {
        setError(result.error)
      }
    } catch (err) {
      setError('Failed to fetch reservations')
    } finally {
      setLoading(false)
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p>Loading reservations...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl tracking-tight mb-6">
            RESERVATION DASHBOARD
          </h1>
          <p className="text-lg text-muted-foreground">
            Manage all restaurant reservations
          </p>
        </motion.div>

        {error && (
          <div className="bg-destructive/10 border border-destructive text-destructive rounded-lg p-4 mb-8">
            Error: {error}
          </div>
        )}

        <div className="grid gap-6">
          {reservations.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No reservations found</p>
            </div>
          ) : (
            reservations.map((reservation) => (
              <motion.div
                key={reservation._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-card rounded-lg shadow-md p-6 border"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="flex items-center space-x-3">
                    <User className="w-5 h-5 text-primary" />
                    <div>
                      <p className="font-medium">{reservation.name}</p>
                      <p className="text-sm text-muted-foreground">Customer</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <Calendar className="w-5 h-5 text-primary" />
                    <div>
                      <p className="font-medium">{formatDate(reservation.date)}</p>
                      <p className="text-sm text-muted-foreground">Date</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <Clock className="w-5 h-5 text-primary" />
                    <div>
                      <p className="font-medium">{reservation.time}</p>
                      <p className="text-sm text-muted-foreground">Time</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <Users className="w-5 h-5 text-primary" />
                    <div>
                      <p className="font-medium">{reservation.guests} guests</p>
                      <p className="text-sm text-muted-foreground">Party size</p>
                    </div>
                  </div>
                </div>

                <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center space-x-3">
                    <Mail className="w-4 h-4 text-muted-foreground" />
                    <p className="text-sm">{reservation.email}</p>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <Phone className="w-4 h-4 text-muted-foreground" />
                    <p className="text-sm">{reservation.phone}</p>
                  </div>
                </div>

                {reservation.occasion && (
                  <div className="mt-2">
                    <p className="text-sm">
                      <span className="font-medium">Occasion:</span> {reservation.occasion}
                    </p>
                  </div>
                )}

                {reservation.specialRequests && (
                  <div className="mt-2">
                    <p className="text-sm">
                      <span className="font-medium">Special requests:</span> {reservation.specialRequests}
                    </p>
                  </div>
                )}

                <div className="mt-4 flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      reservation.status === 'confirmed' 
                        ? 'bg-green-100 text-green-800' 
                        : reservation.status === 'cancelled'
                          ? 'bg-red-100 text-red-800'
                          : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {reservation.status.toUpperCase()}
                    </span>
                  </div>
                  
                  <p className="text-xs text-muted-foreground">
                    Submitted: {formatDate(reservation.createdAt)}
                  </p>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
