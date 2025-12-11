import { ReactNode, useEffect, useState } from 'react'
import Header from './Header'
import Footer from './Footer'

interface LayoutProps {
  children: ReactNode
}

export default function Layout({ children }: LayoutProps) {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false)
    }, 500)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const scrollTop = document.querySelector('.scroll-top')

    const handleScroll = () => {
      if (window.scrollY > 300) {
        scrollTop?.classList.add('active')
      } else {
        scrollTop?.classList.remove('active')
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="page-wrapper">
      {loading && (
        <div className="preloader">
          <div className="custom-loader"></div>
        </div>
      )}
      <Header />
      <main>{children}</main>
      <Footer />
      <button className="scroll-top scroll-to-target" onClick={scrollToTop}>
        <span className="fas fa-angle-double-up"></span>
      </button>
    </div>
  )
}
