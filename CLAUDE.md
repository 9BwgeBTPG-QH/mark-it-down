# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

---

## Repository Overview

This is the **GitHub Pages website** for Mark It Down (Chrome extension Markdown editor).

The `ref/` folder contains the **source app documentation** (gitignore対象、ローカルのみ). Use `ref/README.md` as the authoritative source for app features and specifications.

---

## Project Structure

```
docs/                    # GitHub Pages site (deployed)
├── index.html / index-ja.html           # Landing page
├── features.html / features-ja.html     # Features
├── changelog.html / changelog-ja.html   # Release notes
├── faq.html / faq-ja.html               # FAQ
├── troubleshooting.html / troubleshooting-ja.html
├── feedback.html / feedback-ja.html
├── privacy-policy.html / privacy-policy-ja.html
└── style.css                            # Shared styles

ref/                     # Source app docs (gitignore, local only)
├── README.md            # App README - authoritative source
├── release-notes-v*.md  # Detailed release notes per version
└── screenshot/          # Store screenshots
```

---

## Key Conventions

### Bilingual Pages
Every page has English (`*.html`) and Japanese (`*-ja.html`). **Always update both**.

### Version Updates
When releasing a new version:
1. `index.html` / `index-ja.html`: Update "Coming in vX.X.X" section
2. `changelog.html` / `changelog-ja.html`: Add new version (Under Review), change previous to "Released"
3. `features.html` / `features-ja.html`: Remove "Under Review" badges from released features

### CSS-Only Tabs
features.html uses CSS radio inputs for tabs. No JavaScript required.

---

## Deployment

GitHub Pages from `/docs` on `main` branch.
URL: `https://9bwgebptg-qh.github.io/mark-it-down/`
