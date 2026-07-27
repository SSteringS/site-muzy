import { defineField, defineType } from 'sanity'

export const teamMemberType = defineType({
  name: 'teamMember',
  title: 'Profissional',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Nome',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'photo',
      title: 'Foto',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'role',
      title: 'Cargo / Especialidade',
      type: 'string',
    }),
    defineField({
      name: 'shortBio',
      title: 'Mini bio',
      type: 'text',
      rows: 4,
      validation: (Rule) => Rule.max(300),
    }),
    defineField({
      name: 'order',
      title: 'Ordem na listagem',
      type: 'number',
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'role',
      media: 'photo',
    },
  },
})
