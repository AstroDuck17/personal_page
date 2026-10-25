import type { APIRoute } from 'astro';
import { href } from '../lib/content';

const destinations = { projects: 'projects/', resume: 'resume/', contact: 'contact/', about: '' };
export function getStaticPaths() { return Object.entries(destinations).map(([legacy,destination])=>({params:{legacy},props:{destination}})); }
export const GET: APIRoute = ({ props }) => {
  const destination = href(props.destination);
  return new Response(`<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>Page moved · Yashav Bhatnagar</title><link rel="canonical" href="https://AstroDuck17.github.io${destination}"><meta http-equiv="refresh" content="0;url=${destination}"></head><body style="background:#FFFBEF;color:#35382C;font-family:system-ui;padding:3rem"><h1>This page has moved.</h1><p><a style="color:#5D642E" href="${destination}">Continue to the updated page →</a></p></body></html>`, { headers: { 'Content-Type': 'text/html; charset=utf-8' } });
};
