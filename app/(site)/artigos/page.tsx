import Link from 'next/link'

import { getAllPosts } from '@/lib/sanity.queries'

export const revalidate = 300

export const metadata = {
  title: 'Artigos — Clínica Muzy',
}

export default async function ArtigosPage() {
  const posts = await getAllPosts()

  return (
    <div className="mx-auto max-w-3xl">
      <h1 className="mb-8 text-3xl font-bold text-[--color-brand-900]">Artigos</h1>

      {posts.length === 0 ? (
        <p className="text-[--color-text-muted]">Nenhum artigo publicado ainda.</p>
      ) : (
        <ul className="space-y-6">
          {posts.map((post) => (
            <li key={post._id} className="border-b border-[--color-border] pb-6">
              <Link href={`/artigos/${post.slug.current}`} className="group">
                <h2 className="text-xl font-semibold text-[--color-brand-900] group-hover:underline">
                  {post.title}
                </h2>
              </Link>

              <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-[--color-text-muted]">
                <time dateTime={post.publishedAt}>
                  {new Date(post.publishedAt).toLocaleDateString('pt-BR', {
                    day: '2-digit',
                    month: 'long',
                    year: 'numeric',
                  })}
                </time>

                {post.author && (
                  <>
                    <span aria-hidden>·</span>
                    <span>{post.author.name}</span>
                  </>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
