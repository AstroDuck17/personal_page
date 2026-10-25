// Keep Astro's optional telemetry from writing outside the checkout.
process.env.ASTRO_TELEMETRY_DISABLED = '1';
await import('../node_modules/astro/bin/astro.mjs');
