# Sola-Fi App Theme

A modern, vibrant theme for a crypto wallet app, inspired by glassmorphism and DeFi color trends.

---

## 🎨 Color Palette

**Backgrounds:**

- Main: `#000` (Black)
- Gradient: `#667eea` → `#764ba2` → `#f093fb` (Blue-violet → Purple → Light pink)
- Orb 1: `rgba(255, 255, 255, 0.1)`
- Orb 2: `rgba(79, 172, 254, 0.2)`
- Orb 3: `rgba(245, 158, 11, 0.15)`

**Feature Icons:**

- Secure Wallet: `#4ade80` (Emerald Green)
- DeFi Trading: `#f59e0b` (Amber/Orange)
- Instant Swaps: `#ef4444` (Red)

**Buttons:**
s

- Primary Gradient: `#4facfe` → `#00f2fe` (Light Blue → Cyan)
- Secondary: `rgba(255, 255, 255, 0.1)`
- Secondary Border: `rgba(255, 255, 255, 0.3)`

**Text:**

- Main: `#fff` (White)
- Tagline: `rgba(255, 255, 255, 0.8)`
- Bottom Info: `rgba(255, 255, 255, 0.6)`

**Other UI:**

- Feature Icon Container: `rgba(255, 255, 255, 0.15)`
- Feature Icon Border: `rgba(255, 255, 255, 0.2)`
- Indicator: `rgba(255, 255, 255, 0.3)`
- Active Indicator: `#fff`

---

## 🖋️ Typography

- App Name: 42px, Extra Bold, Uppercase, Letter Spacing 2
- Tagline: 18px, Light, Centered
- Feature Text: 14px, Medium, Centered
- Button Text: 18px (primary), 16px (secondary), Bold
- Bottom Info: 12px, Italic, Muted

---

## 🧩 UI Elements

- **Glassmorphism:** BlurView for logo background
- **Animated Gradient:** LinearGradient for backgrounds and buttons
- **Floating Orbs:** Subtle, blurred, colored shapes for depth
- **Feature Highlights:** Icon + label, spaced evenly
- **Buttons:**
  - Primary: Gradient, rounded, shadow, icon
  - Secondary: Glass, border, rounded
- **Indicators:** 3 dots, center bottom, active dot wider

---

## ✨ Effects & Animations

- Fade-in, slide-up, and scale for main content
- Continuous rotation for logo icon
- Subtle shadows and glass borders

---

## Example Usage

```js
// Example: Gradient background
<LinearGradient
  colors={["#667eea", "#764ba2", "#f093fb"]}
  style={styles.gradientBackground}
/>

// Example: Feature icon
<Ionicons name="shield-checkmark" size={24} color="#4ade80" />
```

---

This theme is designed for a premium, modern, and welcoming DeFi experience.
