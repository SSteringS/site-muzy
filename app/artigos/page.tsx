import Link from 'next/link'

import { getAllPosts } from '@/lib/sanity.queries'

// Revalidação a cada 5 minutos como fallback (webhook em FE-04 fará revalidação on-demand)
export const revalidate = 300

export const metadata = {
  title: 'Artigos — Clínica Muzy',
}

export default async function ArtigosPage() {
  const posts = await getAllPosts()

  return (
    <main className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="mb-8 text-3xl font-bold">Artigos</h1>

      {posts.length === 0 ? (
        <p className="text-gray-500">Nenhum artigo publicado ainda.</p>
      ) : (
        <ul className="space-y-6">
          {posts.map((post) => (
            <li key={post._id} className="border-b pb-6">
              <Link
                href={`/artigos/${post.slug.current}`}
                className="group"
              >
                <h2 className="text-xl font-semibold group-hover:underline">
                  {post.title}
                </h2>
              </Link>

              <div className="mt-1 flex items-center gap-3 text-sm text-gray-500">
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
    </main>
  )
}
