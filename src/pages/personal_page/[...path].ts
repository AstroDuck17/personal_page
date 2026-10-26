import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { topics } from '../../data/topics';
import { legacyAliases, redirectDocument } from '../../lib/redirects';

export async function getStaticPaths() {
  // Deliberately independent of REVIEW_DRAFTS: old addresses exist only for published content.
  const published = ({ data }: { data: { draft: boolean; status: string } }) => !data.draft && data.status !== 'draft';
  const [projects, writing] = await Promise.all([getCollection('projects', published), getCollection('writing', published)]);
  const routes = ['/', '/projects/', '/resume/', '/writing/', '/contact/',
    ...projects.map(entry => `/projects/${entry.id}/`),
    ...writing.map(entry => `/writing/${entry.id}/`),
    ...Object.keys(topics).map(topic => `/topics/${topic}/`),
  ];
  const paths = new Map<string, string>();
  for (const destination of routes) {
    // Emit index files so both directory URLs and explicit index.html bookmarks work.
    paths.set(`${destination.slice(1)}index.html`, destination);
  }
  for (const [alias, destination] of Object.entries(legacyAliases)) paths.set(alias, destination);
  return [...paths].map(([path, destination]) => ({ params: { path }, props: { destination } }));
}

export const GET: APIRoute = ({ props, site }) => new Response(redirectDocument(props.destination, site!), { headers: { 'Content-Type': 'text/html; charset=utf-8' } });
