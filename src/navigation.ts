import { getPermalink, getBlogPermalink, getAsset } from './utils/permalinks';

export const headerData = {
  links: [
    {
      text: 'Blog',
      href: getBlogPermalink(),
    },
    {
      text: 'Categories',
      links: [
        {
          text: 'AI',
          href: getPermalink('AI', 'category'),
        },
        {
          text: 'Machine Learning',
          href: getPermalink('machine learning', 'category'),
        },
        {
          text: 'Research',
          href: getPermalink('research', 'category'),
        },
        {
          text: 'Life',
          href: getPermalink('life', 'category'),
        },
        {
          text: 'Projects',
          href: getPermalink('projects', 'category'),
        },
      ],
    },
    {
      text: 'About',
      href: getPermalink('/about'),
    },
    {
      text: 'Archives',
      href: getPermalink('/archives'),
    },
    {
      text: 'News',
      href: getPermalink('/news'),
    },
  ],
  actions: [],
};

export const footerData = {
  links: [],
  secondaryLinks: [],
  socialLinks: [
    { ariaLabel: 'Github', icon: 'tabler:brand-github', href: 'https://github.com/james20141606' },
    { ariaLabel: 'LinkedIn', icon: 'tabler:brand-linkedin', href: 'https://www.linkedin.com/in/xupeng-chen-1a3b3b1a3/' },
    { ariaLabel: 'Mail', icon: 'tabler:mail', href: 'mailto:xupeng.chen@nyu.edu' },
    { ariaLabel: 'RSS', icon: 'tabler:rss', href: getAsset('/rss.xml') },
  ],
  footNote: `
    &copy; 2025 James Chen · <a class="text-blue-600 underline dark:text-muted" href="https://www.cmwonderland.com">WonderLand</a>
  `,
};
