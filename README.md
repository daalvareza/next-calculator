### Calculator

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/pages/api-reference/create-next-app), enhanced into a full-featured, responsive, and accessible calculator application.

## Features
- Numpad Layout: Numeric keypad arranged like a typical calculator, including 0–9, ., =, and basic operators (+, -, *, /).
- Calculation History: A slide-up panel that records past expressions and results. Click any entry to reload it into the calculator.
- Copy to Clipboard: Click the copy icon in the result display to copy the latest answer.
- Keyboard Support: 
    - 0–9 . % ( ) + - * / keys map to calculator keys. 
    - Enter → =.
    - Backspace / Escape → C (clear)
    - h or ? → opens Help dialog.
- Theme Switcher & OS Sync:
    - Built-in dropdown to choose Light, Dark, Blue, or System theme.
    - When set to System, syncs with the user's prefers-color-scheme media query.
- Unit Converter: Inline conversion of your result into common units: 
    - Centimeters to inches (cm → in). 
    - Kilograms to pounds (kg → lb). 
    - Celsius to Fahrenheit (°C → °F).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the project.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn-pages-router) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/pages/building-your-application/deploying) for more details.
