import { useEffect, useState } from 'react'
import { Routes, Route, Link, Navigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import { supabase } from '../../lib/supabase'
import type { Database } from '../../lib/database.types'

type Project = Database['public']['Tables']['projects']['Row']
type ContactSubmission = Database['public']['Tables']['contact_submissions']['Row']

function DashboardHome() {
  const [stats, setStats] = useState({ projects: 0, services: 0, testimonials: 0, contacts: 0 })

  useEffect(() => {
    loadStats()
  }, [])

  const loadStats = async () => {
    const [projectsRes, servicesRes, testimonialsRes, contactsRes] = await Promise.all([
      supabase.from('projects').select('id', { count: 'exact', head: true }),
      supabase.from('services').select('id', { count: 'exact', head: true }),
      supabase.from('testimonials').select('id', { count: 'exact', head: true }),
      supabase.from('contact_submissions').select('id', { count: 'exact', head: true })
    ])

    setStats({
      projects: projectsRes.count || 0,
      services: servicesRes.count || 0,
      testimonials: testimonialsRes.count || 0,
      contacts: contactsRes.count || 0
    })
  }

  return (
    <div>
      <h2>Dashboard</h2>
      <div className="row mt-64">
        <div className="col-md-3">
          <div className="stat-card p-32 black-120-bg">
            <h3>{stats.projects}</h3>
            <p>Projects</p>
          </div>
        </div>
        <div className="col-md-3">
          <div className="stat-card p-32 black-120-bg">
            <h3>{stats.services}</h3>
            <p>Services</p>
          </div>
        </div>
        <div className="col-md-3">
          <div className="stat-card p-32 black-120-bg">
            <h3>{stats.testimonials}</h3>
            <p>Testimonials</p>
          </div>
        </div>
        <div className="col-md-3">
          <div className="stat-card p-32 black-120-bg">
            <h3>{stats.contacts}</h3>
            <p>Contact Submissions</p>
          </div>
        </div>
      </div>
    </div>
  )
}

function ProjectsList() {
  const [projects, setProjects] = useState<Project[]>([])

  useEffect(() => {
    loadProjects()
  }, [])

  const loadProjects = async () => {
    const { data } = await supabase
      .from('projects')
      .select('*')
      .order('order_number')

    if (data) setProjects(data)
  }

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this project?')) {
      await supabase.from('projects').delete().eq('id', id)
      loadProjects()
    }
  }

  return (
    <div>
      <h2>Projects</h2>
      <table className="table mt-32">
        <thead>
          <tr>
            <th>Title</th>
            <th>Category</th>
            <th>Published</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {projects.map(project => (
            <tr key={project.id}>
              <td>{project.title}</td>
              <td>{project.category}</td>
              <td>{project.is_published ? 'Yes' : 'No'}</td>
              <td>
                <button onClick={() => handleDelete(project.id)} className="btn-danger">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function ContactSubmissions() {
  const [submissions, setSubmissions] = useState<ContactSubmission[]>([])

  useEffect(() => {
    loadSubmissions()
  }, [])

  const loadSubmissions = async () => {
    const { data } = await supabase
      .from('contact_submissions')
      .select('*')
      .order('created_at', { ascending: false })

    if (data) setSubmissions(data)
  }

  return (
    <div>
      <h2>Contact Submissions</h2>
      <table className="table mt-32">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Date</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {submissions.map(submission => (
            <tr key={submission.id}>
              <td>{submission.name}</td>
              <td>{submission.email}</td>
              <td>{submission.phone}</td>
              <td>{new Date(submission.created_at).toLocaleDateString()}</td>
              <td>{submission.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default function AdminDashboard() {
  const { user, signOut } = useAuth()

  if (!user) {
    return <Navigate to="/admin/login" />
  }

  return (
    <div className="admin-dashboard">
      <div className="admin-sidebar" style={{ width: '250px', minHeight: '100vh', backgroundColor: '#2a2a2a', position: 'fixed', left: 0, top: 0, padding: '2rem' }}>
        <h3 style={{ color: '#fff', marginBottom: '2rem' }}>Admin Panel</h3>
        <nav>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            <li style={{ marginBottom: '1rem' }}><Link to="/admin" style={{ color: '#fff', textDecoration: 'none' }}>Dashboard</Link></li>
            <li style={{ marginBottom: '1rem' }}><Link to="/admin/projects" style={{ color: '#fff', textDecoration: 'none' }}>Projects</Link></li>
            <li style={{ marginBottom: '1rem' }}><Link to="/admin/contacts" style={{ color: '#fff', textDecoration: 'none' }}>Contacts</Link></li>
            <li style={{ marginBottom: '1rem' }}><Link to="/" style={{ color: '#fff', textDecoration: 'none' }}>View Site</Link></li>
            <li><button onClick={signOut} style={{ color: '#ff6b6b', background: 'none', border: 'none', cursor: 'pointer' }}>Logout</button></li>
          </ul>
        </nav>
      </div>
      <div className="admin-content" style={{ marginLeft: '250px', padding: '2rem', minHeight: '100vh', backgroundColor: '#1a1a1a', color: '#fff' }}>
        <Routes>
          <Route index element={<DashboardHome />} />
          <Route path="projects" element={<ProjectsList />} />
          <Route path="contacts" element={<ContactSubmissions />} />
        </Routes>
      </div>
    </div>
  )
}
