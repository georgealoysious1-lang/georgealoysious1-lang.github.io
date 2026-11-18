# George Aloysious Portfolio

This repository serves a static portfolio through GitHub Pages. In the repository's **Settings → Pages**, the publishing source is the `main` branch and the `/ (root)` folder.

To update the portfolio profile, Languages list, or projects, edit `portfolio-content.json` in GitHub and commit the change. The public site reads this file directly. Replace `George-Aloysious-CV.pdf` with a new PDF using the same filename to update the CV links.

A project entry needs `id`, `title`, `category`, `subtitle`, `description`, `challenge`, `approach`, `stack`, `url`, `art`, and `sample`. Categories are Electronics, Web apps, Design, and Experiments. Use `"circuit"` for the chip artwork and leave `url` empty if there's no project link. Keep `sample` false for finished personal work.
