import { useState, useEffect } from 'react'
import Layout from '../components/Layout'
import { supabase } from '../lib/supabase'
import type { Database } from '../lib/database.types'

type SiteSettings = Database['public']['Tables']['site_settings']['Row']

export default function Contact() {
  const [settings, setSettings] = useState<SiteSettings | null>(null)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  })
  const [message, setMessage] = useState('')

  useEffect(() => {
    loadSettings()
  }, [])

  const loadSettings = async () => {
    const { data } = await supabase
      .from('site_settings')
      .select('*')
      .maybeSingle()

    if (data) setSettings(data)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const { error } = await supabase
      .from('contact_submissions')
      .insert({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        message: formData.message
      } as any)

    if (error) {
      setMessage('Error submitting form. Please try again.')
    } else {
      setMessage('Thank you for contacting us! We will get back to you soon.')
      setFormData({ name: '', email: '', phone: '', message: '' })
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <Layout>
      <section className="page-banner py-128 black-120-bg">
        <div className="container">
          <div className="text-center">
            <h1 className="text-white">Contact Us</h1>
          </div>
        </div>
      </section>

      <section className="contact-area py-128">
        <div className="container">
          <div className="row">
            <div className="col-lg-6">
              <h2>Get In Touch</h2>
              <p className="mt-32">Have a project in mind? We'd love to hear from you. Send us a message and we'll respond as soon as possible.</p>
              <div className="contact-info mt-64">
                <div className="info-item mb-32">
                  <h5>Address</h5>
                  <p>{settings?.company_address}</p>
                </div>
                <div className="info-item mb-32">
                  <h5>Phone</h5>
                  <p><a href={`tel:${settings?.company_phone}`}>{settings?.company_phone}</a></p>
                </div>
                <div className="info-item mb-32">
                  <h5>Email</h5>
                  <p><a href={`mailto:${settings?.company_email}`}>{settings?.company_email}</a></p>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <form onSubmit={handleSubmit} className="contact-form black-120-bg p-32">
                <div className="form-group mb-32">
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your Name"
                    required
                    className="form-control"
                  />
                </div>
                <div className="form-group mb-32">
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Your Email"
                    required
                    className="form-control"
                  />
                </div>
                <div className="form-group mb-32">
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Your Phone"
                    className="form-control"
                  />
                </div>
                <div className="form-group mb-32">
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Your Message"
                    required
                    rows={5}
                    className="form-control"
                  ></textarea>
                </div>
                {message && <div className="alert mb-32">{message}</div>}
                <button type="submit" className="theme-btn">Send Message</button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  )
}
