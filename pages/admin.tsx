import { Header } from '../components/Header'
import { AdminDashboard } from '../components/AdminDashboard'
import { Footer } from '../components/Footer'

export default function AdminPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <AdminDashboard />
      <Footer />
    </div>
  )
}
