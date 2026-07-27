import { defineField, defineType } from 'sanity'

export const siteSettingsType = defineType({
  name: 'siteSettings',
  title: 'Configurações do Site',
  type: 'document',
  // Singleton: ações limitadas via sanity.config.ts
  fields: [
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'phone',
      title: 'Telefone',
      type: 'string',
      description: 'Ex: (11) 3619-3044',
    }),
    defineField({
      name: 'whatsapp',
      title: 'WhatsApp',
      type: 'string',
      description: 'Número com DDD, ex: 11999999999',
    }),
    defineField({
      name: 'email',
      title: 'E-mail de contato',
      type: 'string',
    }),
    defineField({
      name: 'address',
      title: 'Endereço',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'cnpj',
      title: 'CNPJ',
      type: 'string',
    }),
    defineField({
      name: 'businessHours',
      title: 'Horários de funcionamento',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'instagramUrl',
      title: 'Instagram (URL)',
      type: 'url',
    }),
    defineField({
      name: 'facebookUrl',
      title: 'Facebook (URL)',
      type: 'url',
    }),
  ],
  preview: {
    select: {
      title: 'email',
      media: 'logo',
    },
    prepare(selection) {
      return {
        ...selection,
        title: 'Configurações do Site',
        subtitle: selection.title ?? '',
      }
    },
  },
})
