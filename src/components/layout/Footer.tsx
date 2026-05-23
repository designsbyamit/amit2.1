import { Link } from 'react-router-dom'

const footerLinks = [
  { label: 'Craft', to: '/craft' },
  { label: 'Leadership', to: '/leadership' },
  { label: 'Reflections', to: '/reflections' },
  { label: 'Philosophy', to: '/philosophy' },
]

export default function Footer() {
  return (
    <footer className="border-t border-white border-opacity-10 px-6 md:px-12 py-16">
      <div className="mx-auto max-w-7xl">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          <div>
            <p className="text-label text-white opacity-80 mb-2">Amit Kumar Tiwari</p>
            <p className="text-label text-white opacity-30">Design Leader · SAP</p>
            <p className="text-label text-white opacity-20 mt-1">Bangalore, India</p>
          </div>

          <div>
            <p className="text-overline text-white opacity-30 mb-4">Pages</p>
            <ul className="space-y-3">
              {footerLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-label text-white opacity-40 hover:opacity-80 transition-opacity"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-overline text-white opacity-30 mb-4">Connect</p>
            <ul className="space-y-3">
              <li>
                <a
                  href="https://linkedin.com/in/amitkrt"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-label text-white opacity-40 hover:opacity-80 transition-opacity"
                >
                  LinkedIn
                </a>
              </li>
              <li>
                <a
                  href="https://medium.com/@amitkrt"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-label text-white opacity-40 hover:opacity-80 transition-opacity"
                >
                  Medium
                </a>
              </li>
              <li>
                <a
                  href="mailto:amitkrt@gmail.com"
                  className="text-label text-white opacity-40 hover:opacity-80 transition-opacity"
                >
                  Email
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white border-opacity-10 pt-8 flex items-center justify-between">
          <p className="text-label text-white opacity-20">© {new Date().getFullYear()} Amit Kumar Tiwari</p>
          <Link
            to="/"
            className="text-label text-white opacity-20 hover:opacity-50 transition-opacity"
          >
            Back to top ↑
          </Link>
        </div>
      </div>
    </footer>
  )
}
