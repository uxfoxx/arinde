import { Routes, Route } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import Home from './pages/Home'
import About from './pages/About'
import Projects from './pages/Projects'
import ProjectDetails from './pages/ProjectDetails'
import Contact from './pages/Contact'
import AdminLogin from './pages/admin/Login'
import AdminDashboard from './pages/admin/Dashboard'
import NotFound from './pages/NotFound'
import './styles/main.css'

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/projects/:id" element={<ProjectDetails />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/*" element={<AdminDashboard />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AuthProvider>
  )
}

export default App
