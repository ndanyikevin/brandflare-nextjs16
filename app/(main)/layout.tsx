import { Navbar } from "./navbar";
import "../globals.css"
import { Geist, Geist_Mono } from "next/font/google";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});


export default async function MainLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    // <div className="flex min-h-screen flex-col">
    //   <Navbar />
    //   {children}
    // </div>
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      > <Navbar />
        {children}
      </body>
    </html>
  );
}
