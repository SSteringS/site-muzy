import { notFound } from 'next/navigation'
import { PortableText } from '@portabletext/react'
import type { Metadata } from 'next'
import Link from 'next/link'

import { getAllPosts, getPostBySlug } from '@/lib/sanity.queries'

export const revalidate = 300

export async function generateStaticParams() {
  const posts = await getAllPosts()
  return posts.map((post) => ({ slug: post.slug.current }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const post = await getPostBySlug(slug)
  if (!post) return { title: 'Artigo não encontrado — Clínica Muzy' }
  return { title: `${post.title} — Clínica Muzy` }
}

export default async function ArtigoPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = await getPostBySlug(slug)

  if (!post) notFound()

  return (
    <div className="mx-auto max-w-3xl">
      <Link
        href="/artigos"
        className="mb-8 inline-block text-sm text-[--color-text-muted] hover:underline"
      >
        ← Voltar para artigos
      </Link>

      <article>
        <header className="mb-8">
          <h1 className="text-3xl font-bold leading-tight text-[--color-brand-900]">
            {post.title}
          </h1>

          <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-[--color-text-muted]">
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
                  <span className="text-[--color-text-muted]">({post.author.role})</span>
                )}
              </>
            )}
          </div>
        </header>

        {post.body ? (
          <div className="space-y-4 leading-relaxed text-[--color-text-primary]">
            <PortableText value={post.body} />
          </div>
        ) : (
          <p className="italic text-[--color-text-muted]">Este artigo ainda não tem conteúdo.</p>
        )}
      </article>
    </div>
  )
}
