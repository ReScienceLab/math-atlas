---
name: Math Atlas
description: An interactive visual encyclopedia of mathematical problems
colors:
  observatory-ink: "#050505"
  observatory-paper: "#f5f5f5"
  panel-deep: "#080808"
  panel: "#101010"
  panel-soft: "#161616"
  signal-blue: "#3b82f6"
  warm-amber: "#d4a056"
  gray-100: "#f5f5f5"
  gray-200: "#e5e5e5"
  gray-300: "#d4d4d4"
  gray-400: "#a3a3a3"
  gray-500: "#737373"
  gray-600: "#525252"
  gray-700: "#404040"
  gray-800: "#262626"
  gray-900: "#171717"
  gray-950: "#0a0a0a"
  status-proved: "#3b82f6"
  status-disproved: "#ef4444"
  status-resolved: "#22c55e"
  status-partial: "#eab308"
  status-watch: "#f97316"
typography:
  display:
    fontFamily: "Geist, -apple-system, system-ui, sans-serif"
    fontSize: "clamp(30px, 5vw, 60px)"
    fontWeight: 700
    lineHeight: 1
  body:
    fontFamily: "Geist, -apple-system, system-ui, sans-serif"
    fontSize: "14px"
    fontWeight: 400
    lineHeight: 1.5
  label:
    fontFamily: "Geist Mono, ui-monospace, SFMono-Regular, monospace"
    fontSize: "11px"
    fontWeight: 500
    lineHeight: 1.2
    letterSpacing: "0"
    textTransform: "uppercase"
  kicker:
    fontFamily: "Geist Mono, ui-monospace, SFMono-Regular, monospace"
    fontSize: "8px"
    fontWeight: 500
    lineHeight: 1.2
    textTransform: "uppercase"
rounded:
  none: "0px"
  full: "9999px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "16px"
  lg: "24px"
  xl: "32px"
  section: "48px"
components:
  badge-open:
    backgroundColor: "rgba(255,255,255,0.04)"
    textColor: "{colors.gray-400}"
    rounded: "{rounded.none}"
    padding: "2px 8px"
  badge-proved:
    backgroundColor: "rgba(59,130,246,0.06)"
    textColor: "#60a5fa"
    rounded: "{rounded.none}"
    padding: "2px 8px"
  button-nav:
    backgroundColor: "rgba(255,255,255,0.02)"
    textColor: "{colors.gray-500}"
    rounded: "{rounded.none}"
    padding: "4px 6px"
  button-nav-hover:
    backgroundColor: "rgba(255,255,255,0.04)"
    textColor: "{colors.observatory-paper}"
    rounded: "{rounded.none}"
    padding: "4px 6px"
---

# Design System: Math Atlas

## 1. Overview

**Creative North Star: "The Observatory Catalog"**

Math Atlas is a systematic, precise interface with a hushed reverence for its subject. The design acts as an astronomical observatory's reference catalog: dark, minimal chrome, monospaced indexing, and the subject matter (mathematical visualizations) displayed as the sole spectacle. The UI never competes with what it frames.

The system rejects generic SaaS aesthetics (card grids with gradient accents), flashy crypto/Web3 dark themes (neon, glow, glassmorphism), textbook-dry academic layouts, and overdesigned portfolio sites where style overshadows content. The current observatory-like aesthetic is intentional and should be preserved; changes refine, never reinvent.

**Key Characteristics:**
- Dark, gridded surfaces with near-zero radius
- Monospaced uppercase chrome for all indexing and metadata
- Single blue accent at less than 10% surface area
- Visualizations are the emotional center; UI recedes
- Flat elevation; depth expressed through background tints and border opacity
- Sharp, rectilinear geometry throughout

## 2. Colors

A restrained palette of tinted near-blacks and neutral grays, punctuated by a single signal-blue accent. Status colors serve data roles only and do not appear decoratively. A warm amber is reserved for editorial moments (timeline highlights, breakthrough markers).

### Primary
- **Signal Blue** (#3b82f6): The sole accent. Used on breakthrough timeline markers, active visualization highlights, proved-status badges, selection states, and hover accents. Its rarity is the point.

### Secondary
- **Warm Amber** (#d4a056): Reserved for editorial warmth. Timeline breakthrough rings, featured problem indicators, and moments where the interface celebrates a result. Never used on chrome or navigation.

### Neutral
- **Observatory Ink** (#050505): The ground. Body background, canvas backdrop.
- **Panel Deep** (#080808): Recessed surfaces (formula blocks, card backgrounds at rest).
- **Panel** (#101010): Standard card/section background.
- **Panel Soft** (#161616): Elevated surfaces on hover.
- **Observatory Paper** (#f5f5f5): Primary text, headings, bold labels.
- **Gray 400** (#a3a3a3): Secondary text, descriptions, metadata.
- **Gray 500** (#737373): Tertiary text, timestamps, subtle labels.
- **Gray 600** (#525252): Disabled text, placeholder.
- **Line** (rgba(255,255,255,0.09)): Borders, dividers, grid lines.

### Status (data-only, never decorative)
- Proved: #3b82f6 (shares Signal Blue)
- Disproved: #ef4444
- Resolved: #22c55e
- Partial: #eab308
- Watch: #f97316

### Named Rules
**The One-Accent Rule.** Signal Blue occupies no more than 10% of any screen. Its restraint creates meaning; overuse would make it invisible. Status colors are exempt because they carry data, not decoration.

**The Warm Exception Rule.** Warm Amber appears only at editorial moments: breakthrough events, award highlights. It is never structural (no amber buttons, no amber borders). Maximum two instances per viewport.

## 3. Typography

**Display Font:** Geist (with -apple-system, system-ui, sans-serif fallbacks)
**Body Font:** Geist (same stack)
**Label/Chrome Font:** Geist Mono (with ui-monospace, SFMono-Regular, monospace fallbacks)

**Character:** The pairing is technical without being cold. Geist provides a clean, neutral canvas for problem titles and descriptions. Geist Mono does the heavy lifting of the observatory metaphor: all navigation labels, status badges, metadata, kickers, and filter chrome are monospaced and uppercase. This creates the systematic, catalog-index feel without resorting to decorative type.

### Hierarchy
- **Display** (700, clamp(30px, 5vw, 60px), line-height 1): Problem titles on detail pages. Bold, tight, impactful.
- **Body** (400, 14px, line-height 1.5): Descriptions, long-form text, paper titles. Max line length 65-75ch.
- **Label** (500, 11px, uppercase, Geist Mono): Section headings ("Formula", "Sources", "Researchers"), filter labels, navigation breadcrumbs.
- **Kicker** (500, 8-10px, uppercase, Geist Mono): Status badges, field tags, stat labels, filter buttons. The smallest text in the system.

### Named Rules
**The Mono-Chrome Rule.** Every piece of navigational or indexing text is Geist Mono, uppercase. Sans-serif (Geist) is reserved for content: titles, descriptions, and prose. Never mix them within one role.

**The No-Serif Rule.** Georgia is defined but prohibited from use. The observatory catalog does not employ decorative serifs. If editorial warmth is needed, express it through Warm Amber color, not typeface change.

## 4. Elevation

Intentionally flat. Math Atlas uses zero box-shadows. Depth is expressed exclusively through background tint differentiation and border opacity shifts.

The surface hierarchy is:
1. **Ground** (Observatory Ink, #050505): the base canvas
2. **Recessed** (Panel Deep, #080808): formula blocks, nested content
3. **Resting** (Panel, #101010 or #0b0b0b): cards, table rows at rest
4. **Hover** (Panel Soft, #161616 or #111): interactive surfaces on pointer hover

Borders at rgba(255,255,255, 0.06-0.09) separate regions without implying lift. The grid-line background texture (56px grid at 0.025 opacity) provides spatial context without creating layers.

### Named Rules
**The No-Shadow Rule.** Shadows are prohibited. If an element needs to appear elevated, shift its background one step lighter in the tint hierarchy. If it needs focus attention, use border opacity increase, not shadow.

**The Tint-Step Rule.** Each elevation step is exactly one tint darker or lighter. Never skip steps (don't jump from Ground to Hover without passing through Resting). The gradient is subtle and sequential.

## 5. Components

### Badges
- **Shape:** Sharp rectangle, zero radius, 1px border
- **Primary (status):** Background at 4-10% opacity of the status color, text at 60-100% lightened variant of the status color, border at 20% opacity of the status color
- **States:** Static. Badges do not have hover/focus states.
- **Typography:** Kicker (8px mono uppercase)

### Navigation Buttons (ESC, arrows, view toggles)
- **Shape:** Sharp rectangle, zero radius, 1px border at white/12%
- **Background:** rgba(255,255,255, 0.02-0.04)
- **Hover:** Border brightens to white/22%, text shifts to full white
- **Typography:** Kicker or Label (mono uppercase)
- **Size:** Minimum 24px height for keyboard nav buttons

### Filter Dropdowns
- **Trigger:** Same as nav button style, with chevron indicator
- **Panel:** Sharp rectangle, solid #0a0a0a background, 1px border, shadow-free
- **Items:** Full-width buttons with mono uppercase text, hover via background tint shift
- **Active state:** Border brightens, background at white/8%, text turns white

### Problem Cards (grid catalog)
- **Shape:** No visible border or radius. Defined by the gap-pixel grid pattern (1px colored gaps between cards)
- **Background:** #0b0b0b at rest, #111 on hover
- **Structure:** Visualization area (aspect-square, border-bottom) + metadata area (px-3 py-3)
- **Metadata:** Status badge + field tag row, then title (12px semibold white), then author avatars + year
- **Zen variant:** Visualization only, no metadata, full bleed

### Search Dialog
- **Shape:** Sharp rectangle, zero radius, 1px border, solid #0a0a0a
- **Overlay:** black/60% with backdrop-blur-sm
- **Position:** Centered, top 15vh
- **Input:** No visible border, transparent background, mono placeholder
- **Results:** Full-width items with hover tint, active item at white/6%

### Author Cards
- **Layout:** 40px avatar (rounded-full, sole exception to no-radius rule) + name/institution
- **Links:** Icon buttons (GraduationCap, ExternalLink) with gray-to-blue hover transition
- **Dividers:** 1px white/6% between items

### Timeline
- **Structure:** Vertical line (1px) with dot markers (8px rounded-full)
- **Breakthrough markers:** Signal Blue dot with blue/30% ring (ring-2 ring-offset-1 ring-offset-black)
- **Typography:** Year in mono, event title in body, breakthrough events are bold

### Expandable Text
- **Collapsed:** 3 lines with "... More" control
- **Control:** Inline mono uppercase "More"/"Less" button in gray-500, hover to white
- **No animation:** Instant expand/collapse

## 6. Do's and Don'ts

### Do:
- **Do** use Geist Mono uppercase for all navigational chrome, metadata labels, and status indicators.
- **Do** express depth through background tint steps (#080808 -> #101010 -> #161616), never through shadows.
- **Do** keep Signal Blue below 10% of any viewport. Its power comes from scarcity.
- **Do** use sharp corners (0px radius) on all rectangular UI elements. The only exception is avatars and timeline dots (fully round).
- **Do** let visualizations be the largest, most colorful element on any page. UI recedes.
- **Do** use 1px borders at white/6-9% opacity for dividers and region boundaries.
- **Do** respect prefers-reduced-motion by stopping canvas animations.

### Don't:
- **Don't** use box-shadows anywhere. Not on cards, not on hover, not on dialogs. Flat is the doctrine.
- **Don't** use border-radius between 1px and 9998px. It's either sharp (0) or fully round (avatar/dot). No "rounded-md" compromise.
- **Don't** use Georgia or any serif typeface in rendered UI. The serif is legacy dead code.
- **Don't** apply status colors decoratively. Blue/red/green/yellow/orange are data indicators only.
- **Don't** use gradient text, glassmorphism, bounce easing, or side-stripe colored borders. (Anti-references from PRODUCT.md: these are hallmarks of "generic SaaS dashboards with card grids and gradient accents.")
- **Don't** use neon glows, high-chroma backgrounds, or animated gradients. (Anti-reference: "Flashy Web3/crypto dark themes with neon and glow.")
- **Don't** allow the design to feel "textbook-dry" through lack of craft. Every divider, every tint step, every badge is considered.
- **Don't** let style overshadow content. The visualization is always the hero. (Anti-reference: "Overdesigned portfolio sites where style overshadows content.")
- **Don't** use em dashes in UI copy. Use commas, colons, semicolons, or periods.
- **Don't** nest cards inside cards. Problem cards in the grid are the sole card pattern; they don't contain sub-cards.
