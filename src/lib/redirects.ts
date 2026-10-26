export const legacyAliases: Record<string, string> = {
  'projects.html': '/projects/',
  'resume.html': '/resume/',
  'contact.html': '/contact/',
  'about.html': '/',
};

// HTML redirects for static hosting: no server or HTTP redirect status assumed.
export function redirectDocument(destination: string, site: URL): string {
  if (!destination.startsWith('/') || destination.startsWith('//') || destination.startsWith('/personal_page/')) {
    throw new Error(`Invalid final redirect destination: ${destination}`);
  }
  const canonical = new URL(destination, site).href;
  const literal = JSON.stringify(destination).replaceAll('<', '\\u003c');
  return `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>Page moved · Yashav Bhatnagar</title><meta name="robots" content="noindex"><meta name="redirect-destination" content="${destination}"><link rel="canonical" href="${canonical}"><noscript><meta http-equiv="refresh" content="0;url=${destination}"></noscript></head><body style="background:#FFFBEF;color:#35382C;font-family:system-ui;padding:3rem"><a href="#main">Skip to content</a><main id="main"><h1>This page has moved.</h1><p><a id="redirect-link" style="color:#5D642E" href="${destination}">Continue to the updated page →</a></p></main><script>(()=>{const target=new URL(${literal},location.origin);target.search=location.search;target.hash=location.hash;document.getElementById('redirect-link').href=target.href;location.replace(target.href);})();</script></body></html>`;
}
