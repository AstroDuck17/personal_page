import type { APIRoute } from 'astro';
import { legacyAliases, redirectDocument } from '../lib/redirects';

export function getStaticPaths() { return Object.entries(legacyAliases).map(([legacy,destination])=>({params:{legacy:legacy.replace(/\.html$/, '')},props:{destination}})); }
export const GET: APIRoute = ({ props, site }) => new Response(redirectDocument(props.destination, site!), { headers: { 'Content-Type': 'text/html; charset=utf-8' } });
