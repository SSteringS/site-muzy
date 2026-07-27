import Image from 'next/image'

import type { TeamMember } from '@/lib/sanity.queries'

type TeamMemberCardProps = {
  member: TeamMember
}

/** Retorna a inicial maiúscula do nome para o avatar placeholder. */
function getInitial(name: string): string {
  return name.charAt(0).toUpperCase()
}

/**
 * Card de profissional para a listagem de /profissionais.
 * Exibe foto via next/image (se disponível) ou avatar placeholder com inicial do nome.
 * Server Component — recebe dados como props, sem estado.
 */
export function TeamMemberCard({ member }: TeamMemberCardProps) {
  return (
    <article className="flex flex-col items-center rounded-lg border border-border bg-surface p-6 text-center shadow-sm">
      {/* Foto ou avatar placeholder */}
      <div className="relative mb-4 h-24 w-24 overflow-hidden rounded-full">
        {member.photo ? (
          <Image
            src={member.photo}
            alt={member.name}
            fill
            sizes="96px"
            className="object-cover"
          />
        ) : (
          /* Placeholder: círculo navy com inicial do nome */
          <div
            aria-hidden="true"
            className="flex h-full w-full items-center justify-center bg-brand-900 text-2xl font-bold text-white"
          >
            {getInitial(member.name)}
          </div>
        )}
      </div>

      {/* Nome */}
      <h2 className="text-lg font-semibold text-brand-900">{member.name}</h2>

      {/* Cargo */}
      {member.role && (
        <p className="mt-1 text-sm font-medium text-text-muted">{member.role}</p>
      )}

      {/* Mini-bio */}
      {member.shortBio && (
        <p className="mt-3 text-sm leading-relaxed text-text-muted">
          {member.shortBio}
        </p>
      )}
    </article>
  )
}
