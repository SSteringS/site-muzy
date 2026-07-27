import Link from 'next/link'

import { NAV_LINKS } from './nav-links'
import { MobileMenuToggle } from './MobileMenuToggle'

/** Header global da Clínica Muzy. Server Component — sem estado. */
export function Header() {
  return (
    <header className="relative bg-[--color-brand-900] text-white shadow-md">
      <div className="mx-auto flex max-w-[1200px] items-center justify-between px-4 py-4">
        {/* Logo textual — imagem real chega com a agência */}
        <Link
          href="/"
          className="text-xl font-bold tracking-wide hover:opacity-90"
          aria-label="Clínica Muzy — página inicial"
        >
          Muzy
        </Link>

        {/* Navegação desktop — oculta em mobile */}
        <nav aria-label="Menu principal" className="hidden md:block">
          <ul className="flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm font-medium text-white/90 hover:text-white"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Hamburguer + menu mobile — Client Component */}
        <MobileMenuToggle />
      </div>
    </header>
  )
}
