export default function Footer() {
  return (
    <footer className="border-t border-white border-opacity-10 px-6 md:px-12 py-12">
      <div className="mx-auto max-w-7xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <p className="text-label text-white opacity-40">Amit Kumar Tiwari</p>
          <p className="text-label text-white opacity-20 mt-1">Design Leader · SAP · Bangalore</p>
        </div>
        <div className="flex items-center gap-6">
          <a
            href="https://linkedin.com/in/amitkrt"
            target="_blank"
            rel="noopener noreferrer"
            className="text-label text-white opacity-40 hover:opacity-100 transition-opacity"
          >
            LinkedIn
          </a>
          <a
            href="https://medium.com/@amitkrt"
            target="_blank"
            rel="noopener noreferrer"
            className="text-label text-white opacity-40 hover:opacity-100 transition-opacity"
          >
            Medium
          </a>
          <a
            href="mailto:amitkrt@gmail.com"
            className="text-label text-white opacity-40 hover:opacity-100 transition-opacity"
          >
            Email
          </a>
        </div>
        <p className="text-label text-white opacity-20">
          © {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  )
}
