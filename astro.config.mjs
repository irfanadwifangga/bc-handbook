import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

export default defineConfig({
  integrations: [
    starlight({
      title: 'BC Handbook',
      customCss: ['./src/styles/custom.css'],
      components: {
        Search: './src/components/Search.astro',
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
        {
          label: 'AL Developer',
          items: [
            { label: 'Jalur AL Developer', slug: '04-al-developer' },
            { label: 'AL-1 Fundamentals', items: [{ autogenerate: { directory: '04-al-developer/al-1-fundamentals' } }] },
            { label: 'AL-2 Intermediate', items: [{ autogenerate: { directory: '04-al-developer/al-2-intermediate' } }] },
            { label: 'AL-3 Advanced', items: [{ autogenerate: { directory: '04-al-developer/al-3-advanced' } }] },
          ],
        },
        { label: 'Cheatsheets', items: [{ autogenerate: { directory: 'cheatsheets' } }] },
        {
          label: 'Latihan',
          items: [
            { label: 'Latihan', slug: 'latihan' },
            { label: 'Basic', items: [{ autogenerate: { directory: 'latihan/basic' } }] },
            { label: 'Intermediate', items: [{ autogenerate: { directory: 'latihan/intermediate' } }] },
            { label: 'Expert', items: [{ autogenerate: { directory: 'latihan/expert' } }] },
            { label: 'AL', items: [{ autogenerate: { directory: 'latihan/al' } }] },
          ],
        },
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
