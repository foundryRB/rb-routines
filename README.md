# Foundry Routines

Standing work: run a skill on a schedule or an event

Scaffolded by platform-studio (create_app_repo): a walking skeleton carrying
the full REF-Homelab app-repo contract, green in CI from the first push.

## Run with Docker

```bash
docker compose -f devops/docker-compose.yml up --build
```

The app serves at http://localhost:8080.

## Develop without Docker

The walking skeleton is a static page (`app/index.html`); open it directly,
or serve the docs site with `cd docs && npm install && npm run dev`. Replace
this section as the real app takes shape.

## Layout

- `app/` - the application (walking skeleton: a static landing page)
- `devops/` - Dockerfile + compose (the released images) + the promotion contract
- `k8s/` - the Helm chart CI publishes (paused wiring, pull secret, own-Gateway route)
- `docs/` - the Starlight docs site, served under the portal at `/apps/foundry-routines`
- `intent.yaml` - the app's CSD-INTENT-01 claims
- `.github/workflows/build.yml` - thin caller of the shared ci workflow

## Commits

Every commit follows the platform's commit convention: a Conventional Commit
subject and no co-author trailer. CI derives the version from the type and
blocks release otherwise. The convention is documented on the platform
portal's GitOps delivery page, under "Commit convention"; the committed
`.pre-commit-config.yaml` checks it locally once installed (`pre-commit install`).
