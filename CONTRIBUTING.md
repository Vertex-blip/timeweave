# Contributing to Timeweave

Small, considered improvements are welcome. Open an issue for a substantial product change before implementing it.

1. Fork and clone the repository.
2. Use Node.js 22 or newer and run `npm run dev`. No dependency installation is needed.
3. Make a focused change. Keep user text escaped and avoid adding external requests.
4. Run `npm test` and check the complete interaction in a browser.
5. Check desktop and 390px mobile layouts, keyboard navigation, and an offline reload.
6. Increment the service-worker cache version after changing app-shell files.
7. Include a screenshot for visual changes and describe behavior and validation in your pull request.

Do not commit credentials, personal backups, browser profiles, or generated dependency folders.
