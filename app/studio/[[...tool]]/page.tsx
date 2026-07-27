/**
 * "use client" obrigatório: sanity.config contém funções (structure callbacks,
 * action filters) que não são serializáveis através da boundary Server→Client.
 * Todo o bundle do Studio roda no browser.
 */
'use client'

import { NextStudio } from 'next-sanity/studio'

import config from '../../../sanity/sanity.config'

export default function StudioPage() {
  return <NextStudio config={config} />
}
