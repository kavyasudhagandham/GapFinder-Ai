import type { Metadata } from 'next';
import './globals.css';
export const metadata: Metadata = { title: 'GapFinder AI', description: 'Find learning gaps and build a personalized revision plan.' };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
