# FVTT Cyberpunk RED — Next

[![Foundry VTT](https://img.shields.io/badge/Foundry%20VTT-v14-orange.svg)](https://foundryvtt.com/)
[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](LICENSE)
[![GitHub Release](https://img.shields.io/github/v/release/HeiseiRei/FVTT-Cyberpunk-RED---next?color=green)](https://github.com/HeiseiRei/FVTT-Cyberpunk-RED---next/releases)

A community-maintained continuation of the **Cyberpunk RED** system, modernized specifically for **Foundry VTT v14** with integrated bug fixes, UI/UX polish, and some optimizations.

> **Unofficial Fan Build:** This repository is an independent community project and is not an official Foundry VTT or R. Talsorian Games product.

**Current release: [v0.1.1](https://github.com/HeiseiRei/FVTT-Cyberpunk-RED---next/releases/tag/v0.1.1)** — a patch release for Foundry VTT 14, verified on 14.369.

---

## Installation in Foundry VTT

1. Open Foundry's **Game Systems** setup screen.
2. Click **Install System**.
3. Paste the following Manifest URL into the field at the bottom:

```text
https://github.com/HeiseiRei/FVTT-Cyberpunk-RED---next/releases/latest/download/system.json
```

4. Click **Install**. Foundry downloads the latest release. Keep this stable manifest URL to check for future updates from Foundry.

---

## What's Included in v0.1.1

This patch release updates the current CPR Core — Next project for Foundry VTT 14.

* **Foundry v14 support:** The package targets Foundry 14 and is verified on 14.369.
* **Updated system:** Includes the project's accumulated bug fixes, interface and usability refinements, and optimizations.
* **Compendiums:** Includes Core, DLC, Black Chrome, and Other content, with an in-game **Changelog** compendium.

See the [v0.1.1 release](https://github.com/HeiseiRei/FVTT-Cyberpunk-RED---next/releases/tag/v0.1.1) for the installable archive and checksums. Future release notes are published on the [Releases page](https://github.com/HeiseiRei/FVTT-Cyberpunk-RED---next/releases).

---

## Acknowledgements & Credits

This project would not exist without the foundational work of **The Project Red Team**. 

* **Original System:** Based directly on [FVTT Cyberpunk RED - Core](https://gitlab.com/cyberpunk-red-team/fvtt-cyberpunk-red-core).
* **Special Thanks:** Enormous gratitude to the original creators and contributors who built the core system on GitLab. Their massive effort made Cyberpunk RED playable for thousands of people worldwide, and this fork is dedicated to keeping their work alive and thriving on modern Foundry versions.

---

## Development & Releases

### Local Validation
Requires Node.js. Run from the project root:

```bash
# Validate manifest paths, compendiums, and JSON syntax
node scripts/validate-system.mjs

# Check JavaScript syntax across all project files
find . -type f -name '*.js' -not -path './.git/*' -not -path './.github/*' -not -path './scripts/*' -print0 | xargs -0 -r -n1 node --check
```

### Publishing Releases
Automated via GitHub Actions when a version tag is pushed:

1. Update the `version` field and matching versioned `download` URL in `system.json` (for example, `v0.1.1`).
2. Run `node scripts/validate-system.mjs`, then commit and push the changes to the GitHub default branch (currently `pre-alpha-sht`).
3. Create and push a tag matching the manifest version:

```bash
git tag -a v0.1.1 -m "CPR Core v0.1.1"
git push origin v0.1.1
```

The release workflow verifies that the tag matches `system.json`, validates the project, packages the Foundry-ready ZIP, generates SHA-256 checksums, and publishes the GitHub Release automatically. The workflow generates the release manifest at the stable URL used in the installation instructions above.

---

## Legal & Licensing

* **Software License:** Licensed under the [GNU General Public License v3.0](LICENSE).
* **Fonts:** Third-party font notices are preserved under `fonts/cpr-sheet-nd/licenses`.
* **Copyright Notice:** *Cyberpunk RED* and related marks are trademarks or registered trademarks of **R. Talsorian Games, Inc.** This project is free, open-source fan content created under the **R. Talsorian Games Homebrew Content Policy**.
