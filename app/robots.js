export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/checkout/', '/admin/', '/admin-login'],
    },
    sitemap: 'https://smurfrank.vercel.app/sitemap.xml',
  }
}
