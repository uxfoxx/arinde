import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Layout from '../components/Layout'
import { supabase } from '../lib/supabase'
import type { Database } from '../lib/database.types'

type Project = Database['public']['Tables']['projects']['Row']

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([])
  const [selectedCategory, setSelectedCategory] = useState('*')

  useEffect(() => {
    loadProjects()
  }, [])

  const loadProjects = async () => {
    const { data } = await supabase
      .from('projects')
      .select('*')
      .eq('is_published', true)
      .order('order_number')

    if (data) setProjects(data)
  }

  const filteredProjects = selectedCategory === '*'
    ? projects
    : projects.filter(p => p.category === selectedCategory)

  return (
    <Layout>
      <section className="page-banner py-128" style={{ backgroundImage: 'url(/images/projects/page-banner.png)' }}>
        <div className="container">
          <div className="text-center">
            <h1 className="text-white">Our Projects</h1>
          </div>
        </div>
      </section>

      <section className="homeproject-area py-128">
        <div className="container">
          <ul className="project-filter tab-style-one justify-content-center nav nav-pills nav-fill mb-96">
            <li className={`nav-item ${selectedCategory === '*' ? 'current' : ''}`} onClick={() => setSelectedCategory('*')}>
              <a className="nav-link">ALL</a>
            </li>
            <li className={`nav-item ${selectedCategory === 'ARCHITECTURE' ? 'current' : ''}`} onClick={() => setSelectedCategory('ARCHITECTURE')}>
              <a className="nav-link">ARCHITECTURE</a>
            </li>
            <li className={`nav-item ${selectedCategory === 'INTERIOR' ? 'current' : ''}`} onClick={() => setSelectedCategory('INTERIOR')}>
              <a className="nav-link">INTERIOR</a>
            </li>
            <li className={`nav-item ${selectedCategory === 'LANDSCAPE' ? 'current' : ''}`} onClick={() => setSelectedCategory('LANDSCAPE')}>
              <a className="nav-link">LANDSCAPE</a>
            </li>
            <li className={`nav-item ${selectedCategory === 'REMODELING' ? 'current' : ''}`} onClick={() => setSelectedCategory('REMODELING')}>
              <a className="nav-link">REMODELING</a>
            </li>
          </ul>

          <div className="row gap-128">
            {filteredProjects.map(project => (
              <div key={project.id} className="col-xl-6 col-md-6 item">
                <div className="row apartment-image wow fadeInLeft delay-0-1s">
                  <Link to={`/projects/${project.slug}`}>
                    <img src={project.featured_image || ''} alt={project.title} />
                  </Link>
                </div>
                <div className="row apartment-content wow fadeInRight delay-0-1s rp-0">
                  <div className="pro-title text-center">
                    <Link to={`/projects/${project.slug}`}>
                      <h4 className="text-black">{project.title}</h4>
                    </Link>
                    <span className="category">{project.category}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  )
}
