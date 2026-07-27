import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'

import { schemaTypes } from './schemaTypes'

// Tipos que existem como documento único (singleton)
const SINGLETON_TYPES = new Set(['siteSettings'])

export default defineConfig({
  name: 'site-muzy',
  title: 'Clínica Muzy',

  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Conteúdo')
          .items([
            // Singleton: siteSettings sempre abre o documento único
            S.listItem()
              .title('Configurações do Site')
              .id('siteSettings')
              .child(
                S.document()
                  .schemaType('siteSettings')
                  .documentId('siteSettings'),
              ),
            S.divider(),
            // Demais tipos (excluindo singletons da lista padrão)
            ...S.documentTypeListItems().filter(
              (listItem) => !SINGLETON_TYPES.has(listItem.getId() ?? ''),
            ),
          ]),
    }),
  ],

  document: {
    // Impede criar novo siteSettings pelo menu "Create new"
    newDocumentOptions: (prev, { creationContext }) => {
      if (creationContext.type === 'global') {
        return prev.filter(
          (templateItem) => !SINGLETON_TYPES.has(templateItem.templateId),
        )
      }
      return prev
    },
    // Remove ação de duplicar para singletons
    actions: (prev, { schemaType }) => {
      if (SINGLETON_TYPES.has(schemaType)) {
        return prev.filter(({ action }) => action !== 'duplicate')
      }
      return prev
    },
  },

  schema: {
    types: schemaTypes,
  },
})
