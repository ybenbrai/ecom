import NavBar from "@src/components/layout/Navbar";
import NewsBar from "@src/components/layout/NewsBar";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@css/globals.css";
import { DarkModeProvider } from "@src/context/DarkModeContext";
import { AuthProvider } from "../context/AuthContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "My Next.js App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <DarkModeProvider>
        <AuthProvider>
          <body className={inter.className}>
            {/* Common components */}
            <NewsBar />
            <NavBar />

            {/* Container for page content */}
            <div className="pt-28 flex min-h-screen w-full shadow-lg flex-col dark:bg-[rgb(2,0,36)]">
              {children}
            </div>
          </body>
        </AuthProvider>
      </DarkModeProvider>
    </html>
  );
}
