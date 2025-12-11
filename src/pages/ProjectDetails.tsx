import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Layout from '../components/Layout'
import { supabase } from '../lib/supabase'
import type { Database } from '../lib/database.types'

type Project = Database['public']['Tables']['projects']['Row']

export default function ProjectDetails() {
  const { id } = useParams<{ id: string }>()
  const [project, setProject] = useState<Project | null>(null)

  useEffect(() => {
    if (id) loadProject()
  }, [id])

  const loadProject = async () => {
    if (!id) return

    const { data } = await supabase
      .from('projects')
      .select('*')
      .eq('slug', id)
      .eq('is_published', true)
      .maybeSingle()

    if (data) setProject(data)
  }

  if (!project) {
    return <Layout><div className="container py-128">Loading...</div></Layout>
  }

  return (
    <Layout>
      <section className="page-banner py-128" style={{ backgroundImage: `url(${project.featured_image})` }}>
        <div className="container">
          <div className="text-center">
            <h1 className="text-white">{project.title}</h1>
            <span className="text-white">{project.category}</span>
          </div>
        </div>
      </section>

      <section className="project-details py-128">
        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              {project.featured_image && (
                <img src={project.featured_image} alt={project.title} className="w-100 mb-32" />
              )}
              {project.description && (
                <div className="project-description">
                  <h3>About This Project</h3>
                  <p>{project.description}</p>
                </div>
              )}
              {project.gallery_images && project.gallery_images.length > 0 && (
                <div className="project-gallery mt-64">
                  <h3>Project Gallery</h3>
                  <div className="row">
                    {project.gallery_images.map((image, index) => (
                      <div key={index} className="col-md-6 mb-32">
                        <img src={image} alt={`${project.title} ${index + 1}`} className="w-100" />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <div className="col-lg-4">
              <div className="project-info black-120-bg p-32">
                <h4>Project Info</h4>
                {project.client_name && (
                  <div className="info-item mt-32">
                    <h6>Client</h6>
                    <p>{project.client_name}</p>
                  </div>
                )}
                {project.location && (
                  <div className="info-item mt-32">
                    <h6>Location</h6>
                    <p>{project.location}</p>
                  </div>
                )}
                {project.area_size && (
                  <div className="info-item mt-32">
                    <h6>Area Size</h6>
                    <p>{project.area_size}</p>
                  </div>
                )}
                {project.project_date && (
                  <div className="info-item mt-32">
                    <h6>Completion Date</h6>
                    <p>{new Date(project.project_date).toLocaleDateString()}</p>
                  </div>
                )}
                <div className="info-item mt-32">
                  <h6>Category</h6>
                  <p>{project.category}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  )
}
