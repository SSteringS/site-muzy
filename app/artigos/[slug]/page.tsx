import { notFound } from 'next/navigation'
import { PortableText } from '@portabletext/react'
import type { Metadata } from 'next'
import Link from 'next/link'

import { getAllPosts, getPostBySlug } from '@/lib/sanity.queries'

// Fallback de revalidação — webhook de FE-04 invalida on-demand quando publicado
export const revalidate = 300

// Gera as páginas estáticas para todos os slugs conhecidos no momento do build
export async function generateStaticParams() {
  const posts = await getAllPosts()
  return posts.map((post) => ({ slug: post.slug.current }))
}

// Metadata dinâmica: título vem do artigo real
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const post = await getPostBySlug(slug)

  if (!post) {
    return { title: 'Artigo não encontrado — Clínica Muzy' }
  }

  return {
    title: `${post.title} — Clínica Muzy`,
  }
}

export default async function ArtigoPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = await getPostBySlug(slug)

  // Slug inexistente → 404
  if (!post) notFound()

  return (
    <main className="mx-auto max-w-3xl px-4 py-12">
      <Link
        href="/artigos"
        className="mb-8 inline-block text-sm text-gray-500 hover:underline"
      >
        ← Voltar para artigos
      </Link>

      <article>
        <header className="mb-8">
          <h1 className="text-3xl font-bold leading-tight">{post.title}</h1>

          <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-gray-500">
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
                {post.author.role && (
                  <span className="text-gray-400">({post.author.role})</span>
                )}
              </>
            )}
          </div>
        </header>

        {post.body ? (
          // Wrapper com espaçamento entre blocos — design final na Sprint 02
          <div className="space-y-4 leading-relaxed text-gray-800">
            <PortableText value={post.body} />
          </div>
        ) : (
          <p className="text-gray-400 italic">Este artigo ainda não tem conteúdo.</p>
        )}
      </article>
    </main>
  )
}
