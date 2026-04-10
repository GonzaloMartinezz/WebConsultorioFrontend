# Design System Document: The Clinical Atelier

## 1. Overview & Creative North Star

### The Creative North Star: "The Modern Apothecary"
The design system moves away from the sterile, cold blue of traditional dentistry. Instead, it adopts the persona of "The Modern Apothecary"—a blend of high-end clinical precision and the warmth of a luxury wellness retreat. We replace rigid, boxed-in layouts with an editorial approach that uses generous breathing room, layered depth, and intentional asymmetry to guide the patient’s journey.

**Design Philosophy:**
*   **Intentional Asymmetry:** Break the 12-column monotony. Shift content blocks slightly off-center or overlap images over containers to create a custom, human-centric feel.
*   **Tonal Authority:** Trust is built through sophisticated earth tones (`#4F351F`) balanced by a surgical, professional orange (`#FF7A00`) that acts as a beacon for action.
*   **Bespoke Editorial:** Treat every page like a premium health journal. Typography is the primary architect of the layout, not borders.

---

## 2. Colors

Our palette is rooted in organic stability. It avoids "techy" vibes in favor of a "tactile" clinical experience.

### Palette Strategy
*   **Primary (`#994700`) & Primary Container (`#FF7A00`):** These are your high-engagement signals. Use them sparingly for CTAs to ensure they retain their professional "pop" against the deep browns.
*   **Surface Hierarchy (The "No-Line" Rule):** 
    *   **Prohibition:** 1px solid borders for sectioning are strictly forbidden. 
    *   **Execution:** Define boundaries through background shifts. A `surface-container-low` section should sit directly against a `surface` background.
*   **Nesting:** Use `surface-container-lowest` for the base and `surface-container-high` for elevated information cards to create natural, physical depth.
*   **The "Glass & Gradient" Rule:** For floating elements (like a navigation bar or a sticky "Book Appointment" widget), use Glassmorphism. Utilize a semi-transparent `surface` color with a `backdrop-blur` of 12px to 20px. 
*   **Signature Textures:** For Hero backgrounds, apply a subtle linear gradient from `primary` to `primary_container` at a 135-degree angle to provide "visual soul" that feels more premium than a flat fill.

---

## 3. Typography

The typography scale utilizes **Manrope** for authoritative displays and **Inter** for clinical readability.

*   **Display & Headline (Manrope):** These are your "Editorial Voices." Use `display-lg` (3.5rem) with tight letter-spacing for high-impact brand statements. The semi-bold weights communicate medical authority.
*   **Title & Body (Inter):** Inter is the workhorse. It provides a clean, modern aesthetic that is highly legible even in complex dental charts or treatment plans.
*   **Hierarchy as Navigation:** Use dramatic scale shifts (e.g., a `display-sm` headline next to a `body-md` paragraph) to create a visual path for the user’s eye, reducing cognitive load.

---

## 4. Elevation & Depth

We eschew traditional shadows in favor of **Tonal Layering**.

*   **The Layering Principle:** Depth is a physical stack. Place a `surface-container-lowest` card on a `surface-container-low` section. This creates a "soft lift" that feels architectural rather than digital.
*   **Ambient Shadows:** If a card must float (e.g., a patient testimonial), use an ultra-diffused shadow:
    *   **Blur:** 40px - 60px.
    *   **Opacity:** 4% - 6%.
    *   **Color:** Tint the shadow with `on-surface` (`#2b1704`) instead of black to maintain the warm, organic atmosphere.
*   **The "Ghost Border" Fallback:** If accessibility requires a border, use the `outline-variant` token at 15% opacity. It should be felt, not seen.
*   **Frosted Glass:** Use `surface_bright` with 80% opacity and a heavy blur for modals. This allows the dental clinic's warm brown branding to bleed through, keeping the experience integrated.

---

## 5. Components

### Buttons
*   **Primary:** `primary_container` fill with `on_primary_container` text. Large horizontal padding (2rem) and `md` (0.75rem) roundedness.
*   **Secondary:** No fill. `ghost-border` (15% opacity) and `primary` text.
*   **Tertiary:** Text only in `secondary` with a subtle hover state shift to `primary`.

### Input Fields
*   **Surface:** Use `surface_container_low`. 
*   **State:** On focus, transition the background to `surface_container_highest` rather than changing the border color. This feels smoother and more premium.

### Cards & Dental Lists
*   **Layout:** Forbid the use of divider lines. 
*   **Separation:** Use 24px - 32px of vertical white space from the Spacing Scale. 
*   **Dental Charting (Odontogram):** Use `surface_container` for the tooth selection grid. Highlight active teeth with a soft `primary_fixed` glow rather than a harsh outline.

### Contextual Components
*   **The Progress Ribbon:** A slim, semi-transparent bar at the top of treatment forms using a `primary` to `tertiary` gradient.
*   **Treatment Clusters:** Group related medical data in containers with `xl` (1.5rem) rounded corners to soften the "medical" feel.

---

## 6. Do's and Don'ts

### Do
*   **Do** use overlapping elements. Let the clinic's logo or a high-quality medical image bleed over the edge of a container.
*   **Do** prioritize white space over data density. A patient’s health record should feel "calm."
*   **Do** use `on_surface_variant` for helper text to maintain the sophisticated, low-contrast editorial look.

### Don't
*   **Don't** use pure black (`#000000`). Use the deep `on_background` brown (`#2b1704`) to maintain warmth.
*   **Don't** use standard 1px gray dividers. They shatter the premium "Atelier" feel.
*   **Don't** use "Alert Red" for warnings unless critical. Use the `tertiary` orange-brown tokens to maintain the brand’s color story even in error states.