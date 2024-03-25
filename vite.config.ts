import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Markdown from 'unplugin-vue-markdown/vite'
import markdownItPrism from 'markdown-it-prism'
import markdownItAttrs from 'markdown-it-attrs'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue({
    include: [/\.vue$/, /\.md$/],
  }), Markdown({
    markdownItOptions: {
      html: true,
      linkify: true,
      typographer: true,
    },
    // A function providing the Markdown It instance gets the ability to apply custom settings/plugins
    markdownItSetup(md) {
      // for example
      // md.use(MarkdownItAnchor)
      md.use(markdownItAttrs)
      md.use(markdownItPrism, {
        highlightInlineCode: true,
        plugins: ['copy-to-clipboard']
      })
    },
    // Class names for the wrapper div
    wrapperClasses: 'markdown-body'
  })],
  clearScreen: false,
  // base: '/'
})
