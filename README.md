# English Proficiency Learning Academy

A responsive first-stage website preview for the English Proficiency Learning Academy.

## Files
- `index.html` — website structure
- `style.css` — layout and visual styling
- `script.js` — mobile menu, course preview notices, and demo account dialog

## Publish with GitHub Pages
1. Upload all three website files (`index.html`, `style.css`, `script.js`) to the **root** of your GitHub repository, next to `README.md`.
2. Open your repository on GitHub.
3. Select **Settings** → **Pages**.
4. Under **Build and deployment**, choose **Deploy from a branch**.
5. Choose branch **main** and folder **/(root)**, then click **Save**.
6. Wait for GitHub Pages to publish the site. The Pages panel will show the website address.

## Important security note
This is a front-end prototype only. The registration/login form does not create accounts, and activation codes, teacher accounts, private courses, video protection, tests, and an admin dashboard are not implemented. Never collect real passwords with this prototype.

For the real school platform, connect a backend/authentication service (for example, Supabase or Firebase), enforce permissions on the server/database, and keep secret keys out of GitHub client-side files. A static GitHub Pages site alone cannot securely protect private courses or one-use activation codes.
