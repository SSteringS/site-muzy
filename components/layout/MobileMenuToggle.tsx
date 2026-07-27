/**
 * "use client" — controla o estado isOpen do menu hamburguer.
 * Único ponto de interatividade no Header; tudo o mais é Server Component.
 */
'use client'

import { useState } from 'react'
import Link from 'next/link'

import { NAV_LINKS } from './nav-links'

export function MobileMenuToggle() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="md:hidden">
      {/* Botão hamburguer */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? 'Fechar menu' : 'Abrir menu'}
        aria-expanded={isOpen}
        className="p-2 text-white"
      >
        {isOpen ? (
          /* Ícone X */
          <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          /* Ícone hamburguer */
          <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        )}
      </button>

      {/* Menu mobile expandido */}
      {isOpen && (
        <nav
          aria-label="Menu mobile"
          className="absolute left-0 right-0 top-full bg-brand-900 border-t border-brand-700 px-4 py-4"
        >
          <ul className="flex flex-col gap-4">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="block py-1 text-white hover:text-brand-50"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </div>
  )
}
