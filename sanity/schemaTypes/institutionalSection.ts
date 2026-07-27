import { defineField, defineType } from 'sanity'

export const institutionalSectionType = defineType({
  name: 'institutionalSection',
  title: 'Seção Institucional',
  type: 'document',
  fields: [
    defineField({
      name: 'key',
      title: 'Identificador (key)',
      type: 'string',
      description: 'Identificador único da seção — ex: "hero", "sobre-clinica".',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'heading',
      title: 'Título da seção',
      type: 'string',
    }),
    defineField({
      name: 'body',
      title: 'Texto da seção',
      type: 'text',
      rows: 6,
    }),
    defineField({
      name: 'backgroundImage',
      title: 'Imagem de fundo / destaque',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
  ],
  preview: {
    select: {
      title: 'key',
      subtitle: 'heading',
      media: 'backgroundImage',
    },
    prepare(selection) {
      return {
        ...selection,
        title: selection.title ? `[${selection.title}]` : 'Sem key',
      }
    },
  },
})
