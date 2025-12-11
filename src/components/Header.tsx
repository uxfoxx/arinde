import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import type { Database } from '../lib/database.types'

type SiteSettings = Database['public']['Tables']['site_settings']['Row']

export default function Header() {
  const [settings, setSettings] = useState<SiteSettings | null>(null)
  const [searchOpen, setSearchOpen] = useState(false)

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
    <header className="main-header">
      <div className="header-upper black-120-bg">
        <div className="container clearfix">
          <div className="header-inner rel d-flex align-items-center">
            <div className="logo-outer">
              <div className="logo">
                <Link to="/">
                  <img src={settings?.logo_url || '/images/logos/logo.png'} alt="Logo" title="Logo" />
                </Link>
              </div>
            </div>

            <div className="nav-outer ms-auto clearfix">
              <nav className="main-menu navbar-expand-lg">
                <div className="navbar-header py-10">
                  <div className="mobile-logo">
                    <Link to="/">
                      <img src={settings?.logo_url || '/images/logos/logo.png'} alt="Logo" title="Logo" />
                    </Link>
                  </div>

                  <button
                    type="button"
                    className="navbar-toggle"
                    data-bs-toggle="collapse"
                    data-bs-target=".navbar-collapse"
                  >
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                  </button>
                </div>

                <div className="navbar-collapse collapse clearfix">
                  <ul className="navigation clearfix">
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/about">About</Link></li>
                    <li><Link to="/projects">Projects</Link></li>
                    <li><Link to="/contact">Contact</Link></li>
                  </ul>
                </div>
              </nav>
            </div>

            <div className="search-btns">
              <span className="search-icon" onClick={() => setSearchOpen(!searchOpen)}>
                <i className="far fa-search"></i>
              </span>
            </div>
          </div>

          {searchOpen && (
            <form className="search-project search-form mt-96" id="project-search">
              <input type="search" required placeholder="Type to search..." />
              <button type="submit"><i className="fa fa-search"></i></button>
            </form>
          )}
        </div>
      </div>
    </header>
  )
}
