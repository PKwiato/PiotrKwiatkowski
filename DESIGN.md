# Design System Document: Elevated Brutalism & Machine Experience (MX)

## 1. Overview & Creative North Star: "The Kinetic Monolith"
The Creative North Star for this design system is **"The Kinetic Monolith."** It represents a synthesis of raw, structural power and hyper-precise digital sophistication. Unlike standard "flat" brutalism, this system uses high-contrast grids and retro-futurist accents to create a "Machine Experience" (MX)—a UI that feels like an advanced terminal from a high-budget sci-fi noir.

We break the "template" look by leaning into **intentional asymmetry**. Layouts should feel like a technical blueprint; elements are often offset, overlapping, or anchored to a rigid, high-contrast grid that acts as the skeletal structure of the interface. This is not just a UI; it is an instrument.

---

## 2. Colors: High-Voltage Noir
The palette is dominated by `background` (#0e0e0e) to create a void-like depth, punctuated by `primary` (#ff8f73)—a vibrant, energetic orange that signals action and technical priority.

### The "No-Line" Rule
Explicitly prohibit 1px solid borders for general sectioning. Boundaries must be defined solely through background color shifts. For example, a `surface-container-low` section sitting on a `surface` background provides all the separation required. 

### Surface Hierarchy & Nesting
Treat the UI as a series of physical layers. Use the surface tiers to create "nested" depth:
- **Level 0 (Base):** `surface` (#0e0e0e)
- **Level 1 (Sections):** `surface-container-low` (#131313)
- **Level 2 (Cards/Modules):** `surface-container` (#1a1919)
- **Level 3 (Interactive/Floating):** `surface-bright` (#2c2c2c)

### The "Glass & Gradient" Rule
To elevate beyond flat brutalism, use **Glassmorphism 2.0**. For floating modules or navigation overlays, use `surface-container` with a 60-80% opacity and a heavy `backdrop-blur` (20px+). 
**Signature Textures:** Apply subtle linear gradients (from `primary` to `primary-container`) on high-value CTAs to give them a "glowing filament" quality that feels alive.

---

## 3. Typography: The Editorial Tech-Stack
We utilize a high-contrast pairing to balance human sophistication with machine precision.

- **Display & Headlines (`newsreader`):** A sophisticated serif. Used for high-level storytelling and editorial impact. It introduces a "human" element into the cold machine environment.
- **Titles, Body, & Labels (`spaceGrotesk`):** A clean, monospaced-leaning font. This is the "Data Layer." It conveys technical accuracy and fits the MX aesthetic perfectly.

**Hierarchy as Identity:**
- **Display-LG (3.5rem):** Reserved for hero moments. Tight tracking (-2%).
- **Label-SM (0.6875rem):** Use for technical metadata, coordinates, or system timestamps. Always Uppercase with +10% letter spacing.

---

## 4. Elevation & Depth: Tonal Layering
Traditional drop shadows are largely forbidden. Depth is achieved through the **Layering Principle**.

- **Ambient Shadows:** When a floating effect is mandatory (e.g., a modal), use an ultra-diffused shadow. 
  - *Shadow Color:* `on-surface` at 5% opacity.
  - *Blur:* 40px - 60px.
- **The "Ghost Border" Fallback:** If accessibility requires a border, it must be a **Ghost Border**. Use `outline-variant` (#494847) at 20% opacity. This defines the edge without breaking the "monolith" feel.
- **Retro-Futurist Grids:** Use 1px lines of `outline-variant` at 10% opacity to create background grid-lines, reinforcing the "Machine Experience" and providing a structural guide for the eye.

---

## 5. Components: Precision Instruments

### Buttons
- **Primary:** Background `primary` (#ff8f73), Text `on-primary` (#5e1000). **Shape:** Strictly 0px radius. Hover state should involve a subtle scale-up (1.02x) and a `primary-fixed-dim` glow.
- **Tertiary:** Transparent background, `primary` text, Ghost Border.

### Input Fields
- **Style:** Underline only or Ghost Border containers. 
- **States:** Focus state triggers a `primary` glow on the label and a subtle "haptic" flicker animation.

### Chips (MX Tags)
- Small, rectangular blocks using `surface-container-highest`. Text in `label-sm` (Space Grotesk). No rounded corners (`0px`).

### Cards & Lists
- **Rule:** No divider lines. Separate content using `surface-container-low` backgrounds and consistent vertical spacing (e.g., 32px or 64px gaps).
- **Hover:** Cards should transition from `surface-container` to `surface-bright` on hover, accompanied by a sharp, "clicky" audio cue.

### Machine Tokens (New)
- **Haptic Feedback:** Interactive elements should trigger a short, sharp vibration (on mobile) or a 10ms translate shift (on desktop) to mimic physical machinery.
- **Audio Cues:** Use low-frequency "thuds" for navigation transitions and high-frequency "blips" for successful data entries.

---

## 6. Do’s and Don’ts

### Do:
- **DO** use 0px border-radius everywhere. Brutalism is about raw edges.
- **DO** lean into high-contrast "Red/Orange on Black" for critical paths.
- **DO** use the grid as a design element. Let the lines show occasionally.
- **DO** treat white space as a structural component, not just "emptiness."

### Don't:
- **DON'T** use soft, rounded corners. It breaks the machine aesthetic.
- **DON'T** use 100% opaque, high-contrast borders for layouts. Stick to background shifts.
- **DON'T** use "generic" blue or green for success/info states. Map them to `tertiary` (Purples) or `secondary` (Soft Reds) to keep the palette sophisticated.
- **DON'T** use standard easing. Use "Mechanical Easing" (e.g., `cubic-bezier(0.2, 1, 0.3, 1)`) for snappy, high-precision movement.