# Luis Emmanuel Reyes — Portfolio

A responsive portfolio built with HTML, CSS, and vanilla JavaScript. Open `index.html` directly, or serve this folder with `python -m http.server 8000`.

## Personalize

- GitHub and LinkedIn links are configured in `CONFIG` at the top of `script.js` and as HTML links in `index.html`. Update both files if your profile URLs change.
- Contact submissions open a prefilled Gmail draft in a new tab by default. Email icons and links also open Gmail. Visitors review and send the message in Gmail. To use an email provider, configure an HTTPS `contactEndpoint` accepting JSON fields `name`, `email`, `subject`, and `message`. Never put secret API keys in browser code.
- The downloadable PDF is generated from the supplied resume, with the phone line removed for the public copy. The original resume image remains unchanged in `image/`; exclude that original image from any public deployment to keep the phone number private.
- Certificate and project previews use the supplied files. Replace assets in `image/` and update their references as needed.

## GitHub Pages

Publish these root files and the referenced assets from your chosen branch. All local URLs are relative, so repository subpaths work. No build step is required. Do not publish the original resume PNG, which contains private contact information. Google Fonts and Lucide load from external CDNs; system fonts provide a fallback.
