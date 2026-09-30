# RailGo Frontend Refresh

This frontend refresh is an IRCTC-inspired railway portal design. It intentionally does not copy IRCTC branding/assets.

## Main changes
- Railway-style blue navigation with red active indicator.
- Responsive navigation and mobile menu.
- Logged-in profile now uses the user's `fullName` initial in a circular avatar. Example: `Anand Kumar` -> `A`.
- The email is no longer displayed in the main profile trigger; it remains available inside the account dropdown.
- Account dropdown includes My Profile, My Bookings and Logout.
- Homepage redesigned with railway journey search, quick links, service cards and journey CTA.
- Train cards, booking screens, PNR status, train status, login/register and profile screens receive the same visual system.
- Existing API endpoints, authentication flow, routes and booking logic are preserved.
- Mobile/tablet responsive styling included.

## Run
```bash
npm install
npm run dev
```

The ZIP intentionally does not include `node_modules`, Playwright reports, or generated test screenshots.
