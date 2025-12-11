import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import type { Database } from '../lib/database.types'

type SiteSettings = Database['public']['Tables']['site_settings']['Row']

export default function Footer() {
  const [settings, setSettings] = useState<SiteSettings | null>(null)

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

  return (
    <footer className="main-footer pt-128 black-120-bg">
      <div className="container">
        <div className="footer-top pb-64">
          <div className="row">
            <div className="col-md-12 col-lg-4 col-xl-3">
              <p className="category-line"></p>
              <p className="mt-16">
                ARINDE is an architecture and interior design company celebrated by top publications
                as one of the most in the industry. At ARINDE, we will help you create a spectacular home.
              </p>
            </div>
            <div className="col-md-12 col-lg-8 col-xl-9 right">
              <div className="giant-text">CONTACT</div>
            </div>
          </div>
          <div className="row mt-32">
            <div className="col-md-12 col-lg-8 col-xl-9 d-flex">
              <span className="special giant-text giant-text-light">A</span>
              <span className="special giant-text giant-text-light">R</span>
              <span className="special giant-text giant-text-light">N</span>
              <span className="special giant-text giant-text-light">I</span>
              <span className="special giant-text giant-text-light">D</span>
              <span className="special giant-text giant-text-light">E</span>
            </div>
            <div className="col-md-12 col-lg-4 col-xl-3 pl-64 f-c-info">
              <p><b>Address:</b> {settings?.company_address}</p>
              <p><b>Call us now:</b> <a href={`tel:${settings?.company_phone}`}>{settings?.company_phone}</a></p>
              <p><b>Email:</b><a href={`mailto:${settings?.company_email}`}> {settings?.company_email}</a></p>
              <p className="socials">
                <b>Follow us:</b>
                <a href={settings?.social_youtube} target="_blank" rel="noopener noreferrer"> Youtube</a>
                <a href={settings?.social_instagram} target="_blank" rel="noopener noreferrer"> Instagram</a>
              </p>
            </div>
          </div>
        </div>

        <div className="footer-bottom d-flex p-64">
          <div className="footer-widget pr-64">
            <h5>Links</h5>
            <ul className="links">
              <li><i className="fas fa-angle-double-right"></i> <Link to="/">Home</Link></li>
              <li><i className="fas fa-angle-double-right"></i> <Link to="/about">About Us</Link></li>
              <li><i className="fas fa-angle-double-right"></i> <Link to="/projects">Our Projects</Link></li>
              <li><i className="fas fa-angle-double-right"></i> <Link to="/contact">Contact Us</Link></li>
            </ul>
          </div>
        </div>

        <div className="row pt-32 pb-32 text-center copyright">
          <p>© Copyright ARINDE {new Date().getFullYear()}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
