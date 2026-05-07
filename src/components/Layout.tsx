import { useEffect, useState } from 'react'
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { ErrorBoundary } from '@/components/ErrorBoundary'
import { Button } from '@/components/ui/Button'
import { cn } from '@/lib/utils'

const navLinks = [
  { to: '/', label: 'Home', accent: 'border-accent-blue' },
  { to: '/rovers/curiosity', label: 'Rovers (DEPRECATED)', accent: 'border-accent-rover' },
  { to: '/space-weather', label: 'Space Weather', accent: 'border-accent-weather' },
  { to: '/earth', label: 'Earth', accent: 'border-accent-earth' },
  { to: '/asteroids', label: 'Asteroids', accent: 'border-accent-asteroid' },
]

function isActivePath(pathname: string, to: string) {
  if (to === '/') return pathname === '/'
  return pathname.startsWith(to.split('/')[1] ? `/${to.split('/')[1]}` : to)
}

export function Layout() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    setIsMenuOpen(false)
  }, [location.pathname])

  return (
    <div className="min-h-screen bg-space-bg text-text-primary">
      <header className="sticky top-0 z-50 border-b border-space-border bg-space-bg/80 backdrop-blur-xl">
        <nav aria-label="Main navigation" className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link to="/" className="text-base font-bold tracking-tight text-text-primary">
            ROVER<span className="text-accent-rover">·</span>ROVER
          </Link>

          <div className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  cn(
                    'border-b-2 border-transparent py-5 text-sm font-medium text-text-secondary transition-colors duration-150 hover:text-text-primary',
                    (isActive || isActivePath(location.pathname, link.to)) && ['text-text-primary', link.accent],
                  )
                }
              >
                {link.label}
              </NavLink>
            ))}
          </div>

          <Button variant="icon" className="md:hidden" onClick={() => setIsMenuOpen((value) => !value)} aria-label="Toggle navigation menu">
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </nav>

        <AnimatePresence>
          {isMenuOpen ? (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden border-b border-space-border bg-space-surface md:hidden"
            >
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="block px-6 py-3 text-sm font-medium text-text-secondary transition-colors duration-150 hover:text-text-primary"
                >
                  {link.label}
                </Link>
              ))}
            </motion.div>
          ) : null}
        </AnimatePresence>
      </header>

      <main>
        <ErrorBoundary>
          <Outlet />
        </ErrorBoundary>
      </main>

      <footer className="mt-16 border-t border-space-border">
        <div className="mx-auto flex h-14 max-w-7xl items-center justify-center px-4 text-xs text-text-muted sm:px-6 lg:px-8">
          Powered by NASA Open APIs — data is public domain
        </div>
      </footer>
    </div>
  )
}
