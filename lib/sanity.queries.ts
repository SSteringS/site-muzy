import { groq } from 'next-sanity'
import type { PortableTextBlock } from '@portabletext/types'

import { client } from './sanity.client'

// ─── Tipos de retorno das queries ─────────────────────────────────────────────

/** Resumo de artigo — usado na listagem (/artigos) */
export type PostSummary = {
  _id: string
  title: string
  slug: { current: string }
  publishedAt: string
  author: {
    name: string
    photo: string | null
  } | null
}

/** Artigo completo — usado na página de detalhe (/artigos/[slug]) */
export type PostDetail = {
  _id: string
  title: string
  publishedAt: string
  body: PortableTextBlock[] | null
  author: {
    name: string
    role: string | null
    photo: string | null
  } | null
  coverImage: string | null
}

/** Configurações globais do site (singleton) */
export type SiteSettings = {
  phone: string | null
  whatsapp: string | null
  email: string | null
  address: string | null
  cnpj: string | null
  businessHours: string | null
  instagramUrl: string | null
  facebookUrl: string | null
  logoUrl: string | null
}

/** Profissional da equipe */
export type TeamMember = {
  _id: string
  name: string
  role: string | null
  shortBio: string | null
  photo: string | null
}

// ─── Queries GROQ ─────────────────────────────────────────────────────────────

const getAllPostsQuery = groq`
  *[_type == "post" && defined(slug.current)] | order(publishedAt desc) {
    _id,
    title,
    slug,
    publishedAt,
    "author": author->{ name, "photo": photo.asset->url }
  }
`

const getPostBySlugQuery = groq`
  *[_type == "post" && slug.current == $slug][0] {
    _id,
    title,
    publishedAt,
    body,
    "author": author->{ name, role, "photo": photo.asset->url },
    "coverImage": coverImage.asset->url
  }
`

const getSiteSettingsQuery = groq`
  *[_type == "siteSettings"][0] {
    phone,
    whatsapp,
    email,
    address,
    cnpj,
    businessHours,
    instagramUrl,
    facebookUrl,
    "logoUrl": logo.asset->url
  }
`

const getAllTeamMembersQuery = groq`
  *[_type == "teamMember"] | order(order asc) {
    _id,
    name,
    role,
    shortBio,
    "photo": photo.asset->url
  }
`

// ─── Funções de busca tipadas ──────────────────────────────────────────────────

/** Retorna todos os artigos publicados, do mais recente ao mais antigo. */
export async function getAllPosts(): Promise<PostSummary[]> {
  return client.fetch<PostSummary[]>(getAllPostsQuery)
}

/** Retorna um artigo completo pelo slug. Retorna `null` se não encontrado. */
export async function getPostBySlug(slug: string): Promise<PostDetail | null> {
  return client.fetch<PostDetail | null>(getPostBySlugQuery, { slug })
}

/** Retorna as configurações globais do site (singleton). */
export async function getSiteSettings(): Promise<SiteSettings | null> {
  return client.fetch<SiteSettings | null>(getSiteSettingsQuery)
}

/** Retorna todos os profissionais da equipe, ordenados pelo campo `order`. */
export async function getAllTeamMembers(): Promise<TeamMember[]> {
  return client.fetch<TeamMember[]>(getAllTeamMembersQuery)
}
