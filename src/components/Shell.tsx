import { useEffect } from 'react'
import { Link, NavLink, Outlet, useLocation } from 'react-router'

export function Shell() {
  const location = useLocation()

  useEffect(() => {
    if (location.hash) {
      const id = decodeURIComponent(location.hash.slice(1))
      const target = document.getElementById(id)
      if (target) {
        const reduce = window.matchMedia(
          '(prefers-reduced-motion: reduce)',
        ).matches
        target.scrollIntoView({
          behavior: reduce ? 'auto' : 'smooth',
          block: 'start',
        })
        return
      }
    }
    window.scrollTo(0, 0)
  }, [location.hash, location.pathname, location.search])

  return (
    <div className="shell">
      <a className="skip" href="#content">
        Skip to content
      </a>
      <header className="sidebar">
        <Link className="brand" to="/">
          <span className="brand-mark" aria-hidden="true">
            V
          </span>
          <span>
            <span className="brand-name">veynode</span>
            <span className="brand-note">static check</span>
          </span>
        </Link>
        <nav className="nav" aria-label="Primary">
          <NavLink to="/" end>
            Overview
          </NavLink>
          <NavLink to="/routes">Routes</NavLink>
          <NavLink to="/assets">Assets</NavLink>
        </nav>
        <p className="sidebar-meta">
          <span>Mode</span>
          <strong>{import.meta.env.MODE}</strong>
        </p>
      </header>
      <div className="main">
        <main id="content" tabIndex={-1}>
          <Outlet />
        </main>
        <footer className="colophon">
          <p>
            <code>npm run build</code> writes this site to <code>dist</code>.
            Deploy that folder.{' '}
            <a href="https://vite.dev/guide/static-deploy">
              Vite’s static deploy guide
            </a>
          </p>
        </footer>
      </div>
    </div>
  )
}
