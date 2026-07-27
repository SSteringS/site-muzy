import { getAllPosts } from '@/lib/sanity.queries'
import { ArticleCard } from '@/components/artigos/ArticleCard'

export const revalidate = 300

export const metadata = {
  title: 'Artigos — Clínica Muzy',
}

export default async function ArtigosPage() {
  const posts = await getAllPosts()

  return (
    <>
      {/*
       * Hero da página.
       * -mx-4 e -mt-10 cancelam o px-4 py-10 do container em (site)/layout.tsx,
       * fazendo o hero ocupar a largura total do container de 1200px.
       */}
      <div className="-mx-4 -mt-10 mb-10 bg-brand-900 px-8 py-14 text-white">
        <h1 className="text-3xl font-bold md:text-4xl">Artigos</h1>
        <p className="mt-2 text-sm text-brand-50 opacity-80">
          Conteúdo sobre medicina esportiva e saúde com o Dr. Paulo Muzy
        </p>
      </div>

      {/* Listagem — grid 1/2/3 colunas conforme viewport */}
      {posts.length === 0 ? (
        <p className="text-text-muted">Nenhum artigo publicado ainda.</p>
      ) : (
        <ul
          className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
          role="list"
        >
          {posts.map((post) => (
            <li key={post._id} className="flex">
              <ArticleCard post={post} />
            </li>
          ))}
        </ul>
      )}
    </>
  )
}
