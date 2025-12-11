import { Link } from 'react-router-dom'
import Layout from '../components/Layout'

export default function NotFound() {
  return (
    <Layout>
      <section className="error-area py-128 text-center">
        <div className="container">
          <img src="/images/404/404.png" alt="404" className="mb-64" />
          <h1>Page Not Found</h1>
          <p className="mt-32">The page you are looking for doesn't exist or has been moved.</p>
          <Link to="/" className="theme-btn mt-64">Go Home</Link>
        </div>
      </section>
    </Layout>
  )
}
