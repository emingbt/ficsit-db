import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.ficsitdb.com'

  const routes = [
    '',
    '/items',
    '/buildings',
    '/blueprints',
    '/faq',
    '/search',
  ]

  const lastModified = new Date().toISOString()

  return routes.map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified,
    changeFrequency: 'weekly',
    priority: 0.7,
  }))
}
