export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/checkout/', '/dashboard/'],
    },
    sitemap: 'https://smurfrank.vercel.app/sitemap.xml',
  }
}
