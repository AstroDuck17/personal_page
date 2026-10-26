import { mkdir, copyFile } from 'node:fs/promises';

export default {
  name: 'compatibility-assets',
  hooks: {
    'astro:build:done': async ({ dir }) => {
      await mkdir(new URL('personal_page/', dir), { recursive: true });
      await copyFile(new URL('../public/cv.pdf', import.meta.url), new URL('personal_page/cv.pdf', dir));
    },
  },
};
