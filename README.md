# FVTT-Cyberpunk-RED---next

Cyberpunk RED system for Foundry VTT v14 - ported from v12 with bug fixes, UI/UX polish, and some optimizations.

This repository is a community-maintained build of the Cyberpunk RED system for Foundry Virtual Tabletop. It is not an official Foundry VTT or R. Talsorian Games repository.

## Install in Foundry VTT

After the first GitHub Release is published:

1. Open Foundry's **Game Systems** setup screen and choose **Install System**.
2. Paste this manifest URL:

   `https://github.com/HeiseiRei/FVTT-Cyberpunk-RED---next/releases/latest/download/system.json`

The manifest points to the latest published system archive, so Foundry can check for and install updates from the same URL.

The system currently targets Foundry VTT 14. Check [`system.json`](./system.json) for the version and compatibility range.

## Releases

GitHub Actions validates the system and publishes a Foundry-ready ZIP and release manifest when a version tag is pushed. The tag must match the `version` in `system.json` (for example, `v0.92.4`).

For a new release:

1. Update `version` and its matching versioned `download` URL in `system.json`, and confirm the compatibility fields.
2. Commit and push the changes to `main`.
3. Create and push a matching version tag, such as `v1.0.0`.

The release workflow checks all JSON files, manifest paths, compendium declarations, and JavaScript syntax before creating the release. It attaches a versioned ZIP, the stable `system.json` manifest, and a SHA-256 checksum file. The ZIP contains the system files at its root, as expected by Foundry's manifest installer.

## Local validation

Node.js is required. From the system directory, run:

```sh
node scripts/validate-system.mjs
```

To check JavaScript syntax in every project file:

```sh
find . -type f -name '*.js' -not -path './.git/*' -not -path './.github/*' -not -path './scripts/*' -print0 | xargs -0 -r -n1 node --check
```

## Credits and licensing

The upstream project is maintained at [cyberpunk-red-team/fvtt-cyberpunk-red-core](https://gitlab.com/cyberpunk-red-team/fvtt-cyberpunk-red-core). The existing GPLv3 license is in [`LICENSE`](./LICENSE). Third-party font notices are preserved under [`fonts/cpr-sheet-nd/licenses`](./fonts/cpr-sheet-nd/licenses).

Cyberpunk RED and related names and marks belong to their respective rights holders. Refer to the applicable rights and notices for game content and artwork; the software license does not by itself grant rights to third-party material.
