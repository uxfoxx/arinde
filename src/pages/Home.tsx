import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Carousel from 'react-bootstrap/Carousel'
import Layout from '../components/Layout'
import { supabase } from '../lib/supabase'
import type { Database } from '../lib/database.types'

type Project = Database['public']['Tables']['projects']['Row']
type Service = Database['public']['Tables']['services']['Row']
type Testimonial = Database['public']['Tables']['testimonials']['Row']
type SiteSettings = Database['public']['Tables']['site_settings']['Row']

export default function Home() {
  const [projects, setProjects] = useState<Project[]>([])
  const [services, setServices] = useState<Service[]>([])
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [settings, setSettings] = useState<SiteSettings | null>(null)
  const [selectedCategory, setSelectedCategory] = useState('*')

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    const [projectsRes, servicesRes, testimonialsRes, settingsRes] = await Promise.all([
      supabase.from('projects').select('*').eq('is_published', true).order('order_number'),
      supabase.from('services').select('*').eq('is_active', true).order('order_number'),
      supabase.from('testimonials').select('*').eq('is_active', true).order('order_number'),
      supabase.from('site_settings').select('*').maybeSingle()
    ])

    if (projectsRes.data) setProjects(projectsRes.data)
    if (servicesRes.data) setServices(servicesRes.data)
    if (testimonialsRes.data) setTestimonials(testimonialsRes.data)
    if (settingsRes.data) setSettings(settingsRes.data)
  }

  const filteredProjects = selectedCategory === '*'
    ? projects
    : projects.filter(p => p.category?.toUpperCase() === selectedCategory)

  return (
    <Layout>
      <section className="hero-area black-120-bg">
        <Carousel id="recipeCarousel" controls={false} indicators={false} interval={5000}>
          <Carousel.Item style={{ backgroundImage: `url(${settings?.hero_images?.[0] || '/images/background/slider-1.png'})` }}>
            <div className="container pt-64 pb-64">
              <p className="text-white category-line category-hero">{settings?.hero_category || 'MODERN'}</p>
              <h1 className="col-lg-10 text-white">{settings?.hero_title || 'Architecture And Interior Design From Arinde'}</h1>
              <div className="row pt-32">
                <div className="carousel-buttons col-6">
                  <button className="prev" type="button">
                    <span className="carousel-control-prev-icon" aria-hidden="true">
                      <i className="fa fa-long-arrow-left"></i>
                    </span>
                  </button>
                  <button type="button">
                    <span className="carousel-control-next-icon" aria-hidden="true">
                      <i className="fa fa-long-arrow-right"></i>
                    </span>
                  </button>
                </div>
                <div className="small-img col-6">
                  <Link to="/projects">
                    <img className="hero-img" src="/images/background/slider-1-sm.png" alt="hero image" title="hero image" />
                  </Link>
                </div>
              </div>
            </div>
          </Carousel.Item>
          {settings?.hero_images?.[1] && (
            <Carousel.Item style={{ backgroundImage: `url(${settings.hero_images[1]})` }}>
              <div className="container pt-64 pb-64">
                <p className="text-white category-line category-hero">DESIGN</p>
                <h1 className="col-lg-10 text-white">{settings?.hero_subtitle || 'Interior And Architecture Design From Arinde'}</h1>
                <div className="row pt-32">
                  <div className="carousel-buttons col-6">
                    <button className="prev" type="button">
                      <span className="carousel-control-prev-icon" aria-hidden="true">
                        <i className="fa fa-long-arrow-left"></i>
                      </span>
                    </button>
                    <button type="button">
                      <span className="carousel-control-next-icon" aria-hidden="true">
                        <i className="fa fa-long-arrow-right"></i>
                      </span>
                    </button>
                  </div>
                  <div className="small-img col-6">
                    <Link to="/projects">
                      <img className="hero-img" src="/images/background/slider-2-sm.jpg" alt="hero image" title="hero image" />
                    </Link>
                  </div>
                </div>
              </div>
            </Carousel.Item>
          )}
        </Carousel>
      </section>

      <section className="about-area py-128 black-100-bg">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-sm-12 content pt-40">
              <div className="big-text category-line">ABOUT US</div>
              <div className="row pt-32">
                <h2 className="col-md-6">{settings?.about_title || 'We are a passionate team aim to creating best living spaces'}</h2>
              </div>
              <div className="row pt-96 pb-64">
                <p className="col-md-6 col-lg-3 text">
                  {settings?.about_text || "ARINDE has worked on projects nationwide and worldwide, designs that make magic happen, without the wand. focuses more on structural design, whereas interior design is the practice of creating interior atmosphere. This involves carefully designing lines, colors, plants, lighting, building materials, and space to create an area that feels nurturing to the human body."}
                </p>
                <img className="small-image col-md-6 col-lg-5" src="/images/about/image-2.png" alt="about image" title="about image" />
              </div>
            </div>
            <img className="col-sm-12 col-md-6 right-image" src="/images/about/image-1.png" alt="about image" title="about image" />
          </div>
        </div>
      </section>

      <section className="service-area black-120-bg py-128 justify-content-center">
        <div className="container">
          <div className="d-flex section-heading mb-96">
            <div className="section-title">
              <h2 className="wow fadeInUp delay-0-2s">
                Services Provided In Interior <br />
                And Architecture Design
              </h2>
            </div>
          </div>
          <Carousel id="servicerecipeCarousel" controls={false} indicators={false} interval={3000}>
            {services.map((service, index) => (
              <Carousel.Item key={service.id}>
                <div className="col-12 col-md-6 col-lg-4 col-xl-3 item service-act">
                  <h5>{String(index + 1).padStart(2, '0')}</h5>
                  <Link to="/projects">
                    <img src={service.image_url || ''} alt={service.title} />
                  </Link>
                  <div className="carousel-caption">
                    <Link to="/projects">
                      <h6 className="text-black">{service.title}</h6>
                    </Link>
                    <p className="mb-16">{service.description}</p>
                    <Link to="/projects">
                      <span className="right-arrow text-black">
                        <i className="fa fa-long-arrow-right"></i>
                      </span>
                    </Link>
                  </div>
                </div>
              </Carousel.Item>
            ))}
          </Carousel>
        </div>
      </section>

      <section className="homeproject-area py-128">
        <div className="container">
          <div className="row rel z-1 justify-content-center">
            <div className="section-title text-center mb-96 wow fadeInUp delay-0-2s">
              <span className="sub-title mb-16">PROJECTS</span>
              <h2>Latest Works</h2>
            </div>
          </div>
          <ul className="project-filter tab-style-one justify-content-center nav nav-pills nav-fill mb-96 wow fadeInUp delay-0-4s">
            <li
              data-filter="*"
              className={`nav-item ${selectedCategory === '*' ? 'current' : ''}`}
              onClick={() => setSelectedCategory('*')}
            >
              <a className="nav-link">ALL</a>
            </li>
            <li
              className={`nav-item ${selectedCategory === 'ARCHITECTURE' ? 'current' : ''}`}
              onClick={() => setSelectedCategory('ARCHITECTURE')}
            >
              <a className="nav-link">ARCHITECTURE</a>
            </li>
            <li
              className={`nav-item ${selectedCategory === 'INTERIOR' ? 'current' : ''}`}
              onClick={() => setSelectedCategory('INTERIOR')}
            >
              <a className="nav-link">INTERIOR</a>
            </li>
            <li
              className={`nav-item ${selectedCategory === 'LANDSCAPE' ? 'current' : ''}`}
              onClick={() => setSelectedCategory('LANDSCAPE')}
            >
              <a className="nav-link">LANDSCAPE</a>
            </li>
            <li
              className={`nav-item ${selectedCategory === 'REMODELING' ? 'current' : ''}`}
              onClick={() => setSelectedCategory('REMODELING')}
            >
              <a className="nav-link">REMODELING</a>
            </li>
          </ul>
          <div className="row gap-128 project-active">
            {filteredProjects.map((project) => (
              <div key={project.id} className={`col-xl-6 col-md-6 item ${project.category?.toUpperCase()}`}>
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
                    <span className="category">{project.category?.toUpperCase()}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="col-12 text-center">
            <Link className="loadmore primary-readmore" to="/projects">
              More Projects
            </Link>
          </div>
        </div>
      </section>

      <section className="reviews-area py-128 black-100-bg">
        <div className="container">
          <div className="d-flex section-heading mb-96">
            <div className="section-title">
              <p className="category-line">TESTIMONIALS</p>
              <h2 className="wow fadeInUp delay-0-2s">What Our Clients Say</h2>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <Carousel id="testiCarousel" controls={false} indicators={false} interval={4000}>
                {testimonials.map((testimonial) => (
                  <Carousel.Item key={testimonial.id}>
                    <div className="row">
                      <div className="testimonial-item">
                        <div className="section-title mb-32 wow fadeInUp delay-0-2s">
                          {[...Array(testimonial.rating || 5)].map((_, i) => (
                            <i key={i} className="fa fa-star"></i>
                          ))}
                        </div>
                        <div className="h5 author-text mb-32">"{testimonial.content}"</div>
                        <div className="d-flex">
                          {testimonial.photo_url && (
                            <img className="testi-img" src={testimonial.photo_url} alt={testimonial.client_name} />
                          )}
                          <div className="testi-author">
                            <h5 className="text-white">{testimonial.client_name}</h5>
                            <p className="designations">{testimonial.company}</p>
                          </div>
                          <i className="fas fa-quote-right"></i>
                        </div>
                      </div>
                    </div>
                  </Carousel.Item>
                ))}
              </Carousel>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  )
}
