import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// base derives from DOCS_BASE so the site mounts under the portal prefix
// (/apps/foundry-routines); the Dockerfile places the built files under the same prefix
// because Astro's output is flat (INT-HOMELAB-018, ADR-023).
export default defineConfig({
    base: process.env.DOCS_BASE || '/',
    integrations: [
        starlight({
            title: "Foundry Routines",
        }),
    ],
});
