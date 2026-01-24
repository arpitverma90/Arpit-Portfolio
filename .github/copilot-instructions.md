# Copilot Instructions: Arpit's Portfolio

## Project Overview
This is a personal portfolio website for a Data Engineer/Analyst. It's a single-page application (SPA) using vanilla JavaScript, jQuery, and external libraries. The site dynamically loads skills from `skills.json` and projects from external sources, with smooth scrolling navigation and email integration.

## Architecture

### Data Flow
- **skills.json**: JSON array of skill objects with `name` and `icon` (external CDN URLs)
- **Dynamic Rendering**: Skills and projects are fetched asynchronously and inserted into the DOM
- **Email Integration**: EmailJS service handles contact form submissions (credentials in `script.js`)

### Key Components
| File | Purpose |
|------|---------|
| [index.html](index.html) | Single-page structure with semantic sections (home, about, skills, education, projects, contact) |
| [assets/js/script.js](assets/js/script.js) | jQuery-based interactivity: scroll spy, form handling, typed effect |
| [assets/js/app.js](assets/js/app.js) | Particles.js configuration for animated background |
| [assets/css/style.css](assets/css/style.css) | Responsive design with CSS Grid/Flexbox; 1272 lines covering all sections |
| [skills.json](skills.json) | Data source for skills section rendering |

## Developer Patterns & Conventions

### DOM Manipulation
- Use jQuery selectors (`$()`) for event binding and DOM updates
- Example: Append skill HTML dynamically in `showSkills()` function (line ~75 in script.js)
- All images are lazy-loaded from external CDN URLs (icons8.com, brandfetch.io)

### Navigation & Routing
- Hash-based navigation (`#home`, `#about`, etc.) with smooth scroll (500ms animation)
- Active nav link determined by scroll position (scroll spy pattern)
- Mobile menu toggles with Font Awesome icons (`#menu` toggle)

### External Integrations
- **EmailJS**: Configured with hardcoded service/template IDs in `script.js` line ~35
  - Service ID: `service_clipkkh`
  - Template ID: `template_9q1jime`
  - Public Key: `p9GssEuj6GLDmPLE-`
- **Font Awesome 5.15.3**: All icons via CDN
- **Typed.js**: Auto-rotating role descriptions
- **Particles.js**: Canvas-based animated background
- **Vanilla Tilt**: 3D tilt effect on images with `class="tilt"`

### CSS Organization
- Root variables for colors (e.g., selection color `#2b3dda`)
- Scrollbar styling at root level (`::-webkit-scrollbar`)
- Section-based styling; breakpoints for responsive design
- Transitions applied globally (`transition: all 0.2s linear`)

## Common Development Tasks

### Adding a New Skill
1. Add entry to [skills.json](skills.json) with `name` and `icon` URL
2. The `showSkills()` function automatically renders all skills dynamically
3. No HTML changes needed

### Modifying Section Content
- Edit relevant section in [index.html](index.html) directly
- Sections are self-contained; no inter-dependencies except navigation links
- Keep IDs consistent with navbar links (e.g., `<section id="skills">` matches `href="#skills"`)

### Updating Styling
- All styles in [assets/css/style.css](assets/css/style.css)
- Use CSS Grid for layout (`.row` and `.container` classes)
- Mobile-first: media queries typically in lower sections of file

### Testing Contact Form
- EmailJS requires internet connection and proper credentials
- Form resets on success; alert confirms submission
- Check browser console for EmailJS errors

## Project-Specific Conventions

### Naming
- CSS classes: kebab-case (`.nav-toggle`, `.box-container`)
- IDs: lowercase (`.active` state indicator)
- Variables in JS: camelCase (standard)

### Event Handlers
- All jQuery handlers in `$(document).ready()` block
- Smooth scroll implemented with `.animate()` for consistency
- Right-click disabled globally (`oncontextmenu="return false"` in body tag)

### Data Fetching
- `fetchData()` helper function: accepts "skills" or other types
- Returns parsed JSON; used for dynamic rendering
- Projects would load from `./projects/projects.json` (currently commented out)

## Quick References

- **Portfolio Entry Point**: [index.html](index.html) lines 1-50 (meta tags, navbar structure)
- **Key Handlers**: [assets/js/script.js](assets/js/script.js) lines 1-50 (menu toggle, scroll spy)
- **Skills Rendering**: [assets/js/script.js](assets/js/script.js) lines 70-85 (dynamic DOM insertion)
- **Form Submission**: [assets/js/script.js](assets/js/script.js) lines 35-50 (EmailJS integration)
- **Particles Config**: [assets/js/app.js](assets/js/app.js) (all ~100 lines)

## Known Patterns to Preserve

1. **Smooth interactions**: All scrolling uses jQuery animation (500ms linear)
2. **Responsive images**: Use `.tilt` class for 3D effects on profile images
3. **Icon convention**: Font Awesome icons with aria-labels for accessibility
4. **Data-driven sections**: Skills section populates from JSON; replicate pattern for new data-heavy sections
