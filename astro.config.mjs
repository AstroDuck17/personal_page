import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import { unified } from '@astrojs/markdown-remark';
import compatibilityAssets from './scripts/compatibility-assets.mjs';

export default defineConfig({
  site: 'https://astroduck17.github.io',
  base: '/',
  output: 'static',
  compressHTML: true,
  trailingSlash: 'always',
  integrations: [mdx(), compatibilityAssets],
  markdown: {
    shikiConfig: { theme: 'github-light' },
    processor: unified({
      remarkPlugins: [remarkMath],
      rehypePlugins: [rehypeKatex]
    })
  },
  devToolbar: { enabled: false }
});
