# Mark It Down - GitHub Pages Site

Static site for GitHub Pages hosting.

## File Structure

```
site/
├── index.html           # Landing page (English)
├── index-ja.html        # Landing page (Japanese)
├── privacy-policy.html  # Privacy policy (English, for Chrome Web Store)
├── style.css            # Shared styles (dark theme)
├── favicon.png          # 128x128 icon
└── README.md            # This file
```

## Deploying to GitHub Pages

1. Create a new public repository (e.g., `mark-it-down-site`)
2. Copy the contents of this folder
3. Go to Settings → Pages → Source: `main` branch, `/` (root)
4. Published URL: `https://username.github.io/mark-it-down-site/`

## Purpose

- **Privacy Policy**: Required for Chrome Web Store submission
- **Landing Page**: User-facing introduction to the extension

## Language Support

- `index.html` - English (default)
- `index-ja.html` - Japanese
- `privacy-policy.html` - English (Chrome Web Store requirement)

## Update Notes

- Keep `privacy-policy.html` in sync with `PRIVACY_POLICY.md`
- Update Chrome Web Store link after publication
