export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/login', '/register'],
    },
    sitemap: 'https://smurfrank.vercel.app/sitemap.xml',
  };
}