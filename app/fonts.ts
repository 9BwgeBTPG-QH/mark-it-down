import { Lora, Raleway, Space_Mono } from 'next/font/google';

const lora = Lora({
  subsets: ['latin'],
  variable: '--font-lora',
  display: 'swap',
});

const raleway = Raleway({
  subsets: ['latin'],
  variable: '--font-raleway',
  display: 'swap',
});

const spaceMono = Space_Mono({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-space-mono',
  display: 'swap',
  // Mono is intentionally limited to metadata/code surfaces. Avoid forcing
  // both weights onto pages such as the index that do not render those roles.
  preload: false,
});

export const fontVariables = `${lora.variable} ${raleway.variable} ${spaceMono.variable}`;
