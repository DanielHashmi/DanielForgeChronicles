import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './src/sanity/schemaTypes'
import { codeInput } from '@sanity/code-input'
export default defineConfig({
  name: 'default',
  title: 'DanielForgeChronicles',

  projectId: 'j72oknuv',
  dataset: 'production',
  plugins: [structureTool(), visionTool(), codeInput()],

  schema: {
    types: schemaTypes,
  },
})
