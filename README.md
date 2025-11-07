# dyln

Design experiments

## Agent Spinner Loading Animation

A beautiful React component featuring a morphing SVG agent spinner with animated gradient mesh effects.

## Features

- Smooth SVG path morphing using the `flubber` library
- Light and dark mode side-by-side comparison
- Animated gradient stroke when "thinking"
- Gentle rotation animation
- Soft yellowish glow effect
- Idle and thinking states
- Fully typed with TypeScript

## Setup

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser to the URL shown in the terminal (usually `http://localhost:5173`)

## Usage

The component includes a demo button to toggle between idle and thinking states. Click "Start thinking" to see the animation in action!

## Project Structure

```
├── src/
│   ├── AgentMorphSpinner.tsx  # Main spinner component
│   ├── App.tsx              # Demo app with light/dark mode
│   ├── App.css              # Styles
│   └── main.tsx             # Entry point
├── index.html               # HTML template
├── package.json             # Dependencies
├── tsconfig.json            # TypeScript config
└── vite.config.ts           # Vite config
```

## Customization

You can customize the spinner by passing props:

```tsx
<AgentMorphSpinner 
  size={120}           // Size in pixels (default: 96)
  fillColor="#302D2E"  // Fill color (default: "#302D2E")
  speed={1000}         // Animation speed in ms (default: 1000)
  thinking={false}     // Thinking state (default: false)
/>
```
