/**
 * The STARLIGHT bundle's first claim, attested (INT-HOMELAB-022).
 *
 * The bundle is the claim AND the spec that holds it; shipping
 * docs/intent.yaml alone leaves an unattested claim, which csd-intent fails in
 * the shared workflow's conformance job. Walks the docs tree, parses each
 * page's frontmatter, and asserts the title: every page must carry one.
 */

import { readdirSync, readFileSync, statSync } from 'node:fs';
import { extname, join, relative } from 'node:path';

import { expect } from 'vitest';

import { intent } from '@psa-department-of-engineering/vitest-intent';

const DOCS_DIR = join(process.cwd(), 'src', 'content', 'docs');
const FRONTMATTER_RE = /^---\s*\n([\s\S]*?)\n---/;

function pages(dir: string): string[] {
    return readdirSync(dir).flatMap((entry) => {
        const full = join(dir, entry);
        if (statSync(full).isDirectory()) return pages(full);
        return ['.md', '.mdx'].includes(extname(full)) ? [full] : [];
    });
}

intent('INT-STARLIGHT-001', 'every doc page has a non-empty title', () => {
    const found = pages(DOCS_DIR);
    expect(found.length).toBeGreaterThan(0);
    for (const page of found) {
        const match = FRONTMATTER_RE.exec(readFileSync(page, 'utf8'));
        const where = relative(DOCS_DIR, page);
        expect(match, `${where}: no frontmatter block`).not.toBeNull();
        expect(match![1], `${where}: frontmatter carries no title:`).toMatch(/^title:\s*\S+/m);
    }
});
