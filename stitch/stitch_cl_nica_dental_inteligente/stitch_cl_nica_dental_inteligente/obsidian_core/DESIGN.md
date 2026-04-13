# Design System Document: Tactical Precision & Tonal Depth

## 1. Overview & Creative North Star

### Creative North Star: "The Kinetic Laboratory"
This design system is not a static set of rules; it is a high-performance environment built for builders. Inspired by the tactical density of developer tools like Raycast and the expansive engineering clarity of Supabase, our goal is to create a "professional workstation" feel. 

We move beyond the "generic SaaS" look by rejecting traditional structural lines in favor of **Tonal Layering** and **Intentional Asymmetry**. The interface should feel like a custom-tooled instrument—precise, high-contrast, and deeply immersive. We utilize a "dark-first" philosophy where depth is communicated through light emission and surface elevation rather than outlines.

---

## 2. Colors & Surface Philosophy

The palette is anchored in deep charcoal and absolute blacks, punctuated by the high-energy "Odonto Amber."

### The "No-Line" Rule
To achieve a premium, integrated feel, **1px solid borders are prohibited for general sectioning.** We do not "box" our content with lines. Instead, use background color shifts to define boundaries. A `surface-container-low` section sitting against a `surface` background provides all the separation a professional eye requires.

### Surface Hierarchy & Nesting
Treat the UI as a physical stack of technical materials. Use the hierarchy below to "nest" importance:
*   **Background (#131313):** The base laboratory floor.
*   **Surface-Container-Lowest (#0E0E0E):** Sunken utility areas or code blocks.
*   **Surface-Container-High (#2A2A2A):** Elevated interactive modules.
*   **Surface-Container-Highest (#353534):** Popovers and active state overlays.

### The "Glass & Gradient" Rule
Floating elements (Command Palettes, Tooltips) should utilize **Glassmorphism**. Combine `surface` colors at 80% opacity with a `20px backdrop-blur`. 

### Signature Textures
For primary CTAs and Hero moments, avoid flat fills. Use a subtle linear gradient from `primary` (#FFB68B) to `primary_container` (#FF7A00) at a 135-degree angle to add "soul" and a sense of metallic sheen.

---

## 3. Typography: Technical Authority

We use **Inter** (or Manrope) to convey a sense of engineering precision. The type system is an editorial tool, not just a content delivery mechanism.

*   **Display & Headline Scale:** Large, tight-tracking ( -0.02em ) and high-contrast. These are used to create "entry points" in an otherwise dense UI.
*   **Title Scale:** Used for module headers. These should always be paired with a subtle `on_surface_variant` label for context.
*   **Body & Label Scale:** The workhorses. Ensure `body-md` remains the default for readability, while `label-sm` is used for "meta-data" (e.g., keyboard shortcuts, status indicators).

**Hierarchy Rule:** Use `on_surface_variant` (#E0C0AF) for secondary information to create a visual "recession," making the primary `on_surface` text pop without increasing font weight.

---

## 4. Elevation & Depth

In a dark, high-tech UI, depth is simulated through the behavior of light.

*   **The Layering Principle:** Stack `surface-container` tiers to create natural lift. A card shouldn't "sit" on a background; it should be an elevation of the material itself.
*   **Ambient Shadows:** For floating elements, use extra-diffused shadows. 
    *   *Values:* `0px 24px 48px rgba(0, 0, 0, 0.5)`. 
    *   *Color:* Always tint your shadow with a hint of the background color to prevent a "muddy" look.
*   **The "Ghost Border" Fallback:** If containment is strictly required for accessibility, use the `outline_variant` token at **15% opacity**. This creates a "glint" on the edge rather than a heavy frame.
*   **The Kinetic Glow:** High-priority elements (like active states) can emit a subtle outer glow using the `primary_container` (#FF7A00) at 10% opacity.

---

## 5. Components

### Buttons: The Action Primitives
*   **Primary:** Gradient fill (Primary to Primary-Container). No border. Label in `on_primary_fixed` (Deepest Amber-Black).
*   **Secondary:** `surface-container-high` fill with a "Ghost Border." 
*   **Tertiary/Ghost:** No fill. `primary` text. Only appears on hover or focus.

### Input Fields & Workstations
*   **Structure:** Use `surface-container-low` with a bottom-only "Ghost Border" for a sleeker, terminal-like feel.
*   **Focus State:** Transition the border to `primary` (#FFB68B) and add a 2px inner-glow. 

### Cards & Lists: The Separation Rule
*   **Forbid Divider Lines.** Separate list items using 12px – 16px of vertical white space or a subtle `surface-container` hover state.
*   **Grid Layouts:** Use a rigid 8pt grid, but break it intentionally with "Overhangs"—let a graphic or an icon bleed outside the container's padding to create a sense of raw, uncontained energy.

### Command Palette (Specialty Component)
Inspired by Raycast, this component uses `surface-container-highest` with a 40% opacity backdrop-blur. Use `label-sm` to display keyboard shortcuts (e.g., ⌘K) in a `surface-variant` box with 2px rounding.

---

## 6. Do’s and Don’ts

### Do
*   **Do** use "Odonto Amber" sparingly. It is a high-frequency signal; if used everywhere, it loses its "warning/action" authority.
*   **Do** use `display-lg` typography for empty states to make them feel like intentional design moments rather than "missing" content.
*   **Do** maintain high contrast. Ensure text on dark backgrounds always hits a minimum of 7:1 ratio for accessibility.

### Don’t
*   **Don’t** use pure white (#FFFFFF) for body text. Use `on_surface` (#E5E2E1) to reduce eye strain in dark mode.
*   **Don’t** use standard "Rounded" corners. Stick to the `md` (0.375rem) or `sm` (0.125rem) scale to keep the "Technical Workstation" aesthetic sharp.
*   **Don’t** add shadows to elements that are not floating. If it’s part of the page flow, use tonal shifts only.