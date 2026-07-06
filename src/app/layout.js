import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Providers from "./providers";
import Navbar from "@/components/Navbar";
import { Toaster } from "react-hot-toast";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Shortified",
  description: "Create short URLs, track analytics, generate QR codes, and manage links effortlessly",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">

        <Toaster
          position="top-right"
          toastOptions={{
            duration: 3000,
            style: {
              background: "#18181b",
              color: "#ffffff",
              border: "1px solid #3f3f46",
            },
          }}
        />

        <Providers>
          <Navbar />
          {children}
        </Providers>

      </body>

    </html>
  );
}