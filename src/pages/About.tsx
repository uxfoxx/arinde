import { useState, useEffect } from 'react'
import Layout from '../components/Layout'
import { supabase } from '../lib/supabase'
import type { Database } from '../lib/database.types'

type SiteSettings = Database['public']['Tables']['site_settings']['Row']
type TeamMember = Database['public']['Tables']['team_members']['Row']

export default function About() {
  const [settings, setSettings] = useState<SiteSettings | null>(null)
  const [team, setTeam] = useState<TeamMember[]>([])

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    const [settingsRes, teamRes] = await Promise.all([
      supabase.from('site_settings').select('*').maybeSingle(),
      supabase.from('team_members').select('*').eq('is_active', true).order('order_number')
    ])

    if (settingsRes.data) setSettings(settingsRes.data)
    if (teamRes.data) setTeam(teamRes.data)
  }

  return (
    <Layout>
      <section className="about-area py-128 black-100-bg">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-sm-12 content pt-40">
              <div className="big-text category-line">ABOUT US</div>
              <div className="row pt-32">
                <h2 className="col-md-6">{settings?.about_title}</h2>
              </div>
              <div className="row pt-96 pb-64">
                <p className="col-md-6 col-lg-3 text">{settings?.about_text}</p>
                <img className="small-image col-md-6 col-lg-5 wow zoomIn" src="/images/about/image-2.png" alt="about image" />
              </div>
            </div>
            <img className="col-sm-12 col-md-6 right-image wow zoomIn" src="/images/about/image-1.png" alt="about image" />
          </div>
        </div>
      </section>

      {team.length > 0 && (
        <section className="team-area py-128 black-120-bg">
          <div className="container">
            <div className="section-title text-center mb-96">
              <h2>Our Team</h2>
            </div>
            <div className="row">
              {team.map(member => (
                <div key={member.id} className="col-lg-4 col-md-6">
                  <div className="team-member wow fadeInUp">
                    {member.photo_url && (
                      <img src={member.photo_url} alt={member.name} />
                    )}
                    <h4>{member.name}</h4>
                    <span>{member.role}</span>
                    {member.bio && <p>{member.bio}</p>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </Layout>
  )
}
