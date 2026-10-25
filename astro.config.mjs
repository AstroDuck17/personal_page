import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import { unified } from '@astrojs/markdown-remark';

export default defineConfig({
  site: 'https://AstroDuck17.github.io',
  base: '/personal_page',
  output: 'static',
  compressHTML: true,
  trailingSlash: 'always',
  integrations: [mdx()],
  markdown: {
    shikiConfig: { theme: 'github-light' },
    processor: unified({
      remarkPlugins: [remarkMath],
      rehypePlugins: [rehypeKatex]
    })
  },
  devToolbar: { enabled: false }
});
