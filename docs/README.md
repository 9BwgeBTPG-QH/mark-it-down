# Mark It Down - GitHub Pages Site

Static site for GitHub Pages hosting.

## File Structure

```
docs/
├── index.html              # Landing page (English)
├── index-ja.html           # Landing page (Japanese)
├── privacy-policy.html     # Privacy policy (English)
├── privacy-policy-ja.html  # Privacy policy (Japanese)
├── style.css               # Shared styles (dark theme)
├── favicon.png             # 128x128 icon
├── icon-*.png              # Extension icons (16/48/128)
├── screenshots/            # Screenshots for landing page
└── README.md               # This file
```

## Deploying to GitHub Pages

1. Push this repository to GitHub
2. Go to **Settings** > **Pages**
3. Under **Source**, select **Deploy from a branch**
4. Select `main` branch and `/docs` folder
5. Click **Save**
6. Wait a few minutes for deployment
7. Published URL: `https://9bwgebptg-qh.github.io/mark-it-down/`

## Purpose

- **Privacy Policy**: Required for Chrome Web Store submission
- **Landing Page**: User-facing introduction to the extension
- **Support**: Links to GitHub Issues for bug reports and feature requests

## Language Support

| Page | English | Japanese |
|------|---------|----------|
| Landing Page | `index.html` | `index-ja.html` |
| Privacy Policy | `privacy-policy.html` | `privacy-policy-ja.html` |

## Chrome Web Store Publication

### Prerequisites

1. **Developer Account**: Register at [Chrome Web Store Developer Dashboard](https://chrome.google.com/webstore/devconsole) ($5 one-time fee)
2. **Extension Package**: ZIP file containing the extension (manifest.json + source files)
3. **Assets**:
   - Screenshots: 1280x800 or 640x400 (1-5 images)
   - Promo image: 440x280 (optional)
   - Icon: 128x128 PNG

### Submission Steps

1. Go to [Chrome Web Store Developer Dashboard](https://chrome.google.com/webstore/devconsole)
2. Click **New Item**
3. Upload your extension ZIP file
4. Fill in store listing:
   - **Description**: Short and detailed descriptions
   - **Category**: Productivity
   - **Language**: English (add Japanese if needed)
5. Upload screenshots and promotional images
6. Set **Privacy Policy URL**: `https://9bwgebptg-qh.github.io/mark-it-down/privacy-policy.html`
7. Fill in **Privacy Practices** questionnaire
8. Submit for review (typically 1-3 business days)

### After Publication

Update the Chrome Web Store links in:
- `docs/index.html` (line 51)
- `docs/index-ja.html` (line 51)

Replace `href="#"` with the actual Chrome Web Store URL.

## Update Notes

- Keep both English and Japanese privacy policies in sync
- Update Chrome Web Store link after publication
- Update "Last Updated" date in privacy policies when making changes
