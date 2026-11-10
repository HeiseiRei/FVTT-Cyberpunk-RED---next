# FVTT Cyberpunk RED — Next

[![Foundry VTT](https://img.shields.io/badge/Foundry%20VTT-v14-orange.svg)](https://foundryvtt.com/)
[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](LICENSE)
[![GitHub Release](https://img.shields.io/github/v/release/HeiseiRei/FVTT-Cyberpunk-RED---next?color=green)](https://github.com/HeiseiRei/FVTT-Cyberpunk-RED---next/releases)

A community-maintained continuation of the **Cyberpunk RED** system, modernized specifically for **Foundry VTT v14** with integrated bug fixes, UI/UX polish, and some optimizations.

> **Unofficial Fan Build:** This repository is an independent community project and is not an official Foundry VTT or R. Talsorian Games product.

---

## Installation in Foundry VTT

1. Open Foundry's **Game Systems** setup screen.
2. Click **Install System**.
3. Paste the following Manifest URL into the field at the bottom:

```text
https://github.com/HeiseiRei/FVTT-Cyberpunk-RED---next/releases/latest/download/system.json
```

4. Click **Install**. Foundry will download the system archive and use this URL to check for future updates automatically.

---

## What's New in "Next"

* **Foundry v14 Port:** Updated from v12 codebase to fully support modern Foundry v14 APIs and architecture.
* **Bug Fixes:** Resolved legacy calculation errors, interaction bugs, and sheet desync issues.
* **Next-Gen Interface:** A modern redesign centered around style, intuitive usability, and immersive table flow.

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

1. Update the `version` field and its corresponding download URL inside `system.json`.
2. Commit and push the changes to `main`.
3. Create and push a version tag matching `system.json` (for example, `v1.0.0`):

```bash
git tag v1.0.0
git push origin v1.0.0
```

The CI workflow will run syntax validation, package the Foundry-ready ZIP, generate SHA-256 checksums, and publish the GitHub Release automatically.

---

## Legal & Licensing

* **Software License:** Licensed under the [GNU General Public License v3.0](LICENSE).
* **Fonts:** Third-party font notices are preserved under `fonts/cpr-sheet-nd/licenses`.
* **Copyright Notice:** *Cyberpunk RED* and related marks are trademarks or registered trademarks of **R. Talsorian Games, Inc.** This project is free, open-source fan content created under the **R. Talsorian Games Homebrew Content Policy**.
