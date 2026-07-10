import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin", "cyrillic"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin", "cyrillic"],
});

export const metadata: Metadata = {
  title:
    "\u0416\u0430\u043d\u0442\u0430\u0439 \u0428\u0430\u043c\u0431\u0435\u0442\u043e\u0432 | \u0422\u0440\u0430\u0432\u043c\u0430\u0442\u043e\u043b\u043e\u0433-\u043e\u0440\u0442\u043e\u043f\u0435\u0434",
  description:
    "\u041f\u0440\u0435\u043c\u0438\u0430\u043b\u044c\u043d\u0430\u044f digital landing page \u0434\u043b\u044f \u0442\u0440\u0430\u0432\u043c\u0430\u0442\u043e\u043b\u043e\u0433\u0430-\u043e\u0440\u0442\u043e\u043f\u0435\u0434\u0430: \u043a\u043e\u043b\u0435\u043d\u043e, \u043f\u043b\u0435\u0447\u043e, \u0441\u043f\u043e\u0440\u0442\u0438\u0432\u043d\u044b\u0435 \u0442\u0440\u0430\u0432\u043c\u044b \u0438 PRP-\u0442\u0435\u0440\u0430\u043f\u0438\u044f.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ru"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
