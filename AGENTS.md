<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Delta Agency: Neo-Brutalist Design System

When working on this project, ALWAYS adhere to the following core UI/UX design specifications:

## 1. Aesthetic: Neo-Brutalism
- **Borders & Shadows:** Use thick black borders (`border-4 border-black` or `border-8`) and solid, unblurred drop shadows (e.g., `shadow-[4px_4px_0_0_#000]`, `shadow-[8px_8px_0_0_#000]`). Do NOT use soft, blurred glassmorphism shadows.
- **Contrast & Colors:** Use `#F4F4F0` (warm off-white) for the main background. Use `#000` for primary text and structural lines. Accent colors: Cyan (`#06B6D4`), Yellow (`#FACC15`), Pink (`#EC4899`).
- **Typography:** Use `Space Grotesk` (`font-space font-black uppercase`) for headings, structural elements, and buttons. Use `Inter` for body copy.

## 2. Interaction & Components
- **Buttons & Cards:** Must feel physical. Default state has a hard shadow. Hover state translates up/left (`-translate-y-1 -translate-x-1`) and extends the shadow. Active state compresses down/right and removes the shadow.
- **Mobile vs Desktop:** Desktop uses massive padding (`py-32`) and CSS `hover` states. Mobile uses tighter padding (`py-16` or `pt-8 pb-16`) and requires explicit React state (e.g., `onClick` tap-to-reveal) for complex interactions rather than relying on CSS hover, preventing stuck hover states on touch screens.
- **Scrolling:** The site uses Lenis smooth scrolling. Whenever a full-screen overlay, drawer, or modal is opened, the overlay container MUST include the `data-lenis-prevent` attribute to stop background scrolling, as standard `overflow: hidden` on the body is insufficient.
