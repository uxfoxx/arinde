import { ReactNode } from 'react'
import Header from './Header'
import Footer from './Footer'

interface LayoutProps {
  children: ReactNode
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="page-wrapper">
      <div className="preloader"><div className="custom-loader"></div></div>
      <Header />
      <main>{children}</main>
      <Footer />
      <button className="scroll-top scroll-to-target" data-target="html">
        <span className="fas fa-angle-double-up"></span>
      </button>
    </div>
  )
}
