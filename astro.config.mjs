import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

export default defineConfig({
  integrations: [
    starlight({
      title: 'BC Handbook',
      customCss: ['./src/styles/custom.css'],
      components: {
        PageTitle: './src/components/PageTitle.astro',
        SocialIcons: './src/components/HeaderLinks.astro',
        Footer: './src/components/Footer.astro',
      },
      sidebar: [
        { label: 'Mulai', link: '/' },
        { label: 'Orientasi', items: [{ autogenerate: { directory: '00-orientasi' } }] },
        { label: 'Basic', items: [{ autogenerate: { directory: '01-basic' } }] },
        { label: 'Intermediate', items: [{ autogenerate: { directory: '02-intermediate' } }] },
        { label: 'Expert', items: [{ autogenerate: { directory: '03-expert' } }] },
        { label: 'Cheatsheets', items: [{ autogenerate: { directory: 'cheatsheets' } }] },
        { label: 'Latihan', items: [{ autogenerate: { directory: 'latihan' } }] },
        {
          label: 'Referensi',
          items: [
            { label: 'Glosarium', slug: 'glosarium' },
            { label: 'Referensi resmi', slug: 'referensi' },
          ],
        },
      ],
      defaultLocale: 'root',
      locales: {
        root: { label: 'Bahasa Indonesia', lang: 'id' },
      },
    }),
  ],
});
