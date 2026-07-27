import type { Metadata } from 'next'

import { getAllTeamMembers } from '@/lib/sanity.queries'
import { TeamMemberCard } from '@/components/profissionais/TeamMemberCard'

export const revalidate = 300

export const metadata: Metadata = {
  title: 'Profissionais | Clínica Muzy',
}

export default async function ProfissionaisPage() {
  const members = await getAllTeamMembers()

  return (
    <>
      {/*
       * Hero da página — mesmo padrão de FE-09.
       * -mx-4 e -mt-10 cancelam o px-4 py-10 do container em (site)/layout.tsx.
       */}
      <div className="-mx-4 -mt-10 mb-10 bg-brand-900 px-8 py-14 text-white">
        <h1 className="text-3xl font-bold md:text-4xl">Nossa Equipe</h1>
        <p className="mt-2 text-sm text-brand-50 opacity-80">
          Conheça os profissionais da Clínica Muzy
        </p>
      </div>

      {/* Grid de profissionais ou estado vazio */}
      {members.length === 0 ? (
        <p className="text-text-muted">
          Em breve mais informações sobre nossa equipe.
        </p>
      ) : (
        <ul
          className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
          role="list"
        >
          {members.map((member) => (
            <li key={member._id}>
              <TeamMemberCard member={member} />
            </li>
          ))}
        </ul>
      )}
    </>
  )
}
