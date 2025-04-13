import React from "react";
import Link from "next/link";
import { Inter } from "next/font/google";
import "../globals.css";
import Header from "../../components/Header";
import { AuthProvider } from "../../context/AuthContext";
import Image from "next/image";
const inter = Inter({ subsets: ["latin"] });
export const metadata = {
  title: "Shopie | Create Account or Sign In",
  description: "Shopie is a fake shopping website",
};
export default function Layout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <main>
            <header className="flex flex-col items-center justify-center bg-white shadow-md p-4 h-fit">
              <Link href="/">
                <Image src="/logo.png" alt="logo" width={100} height={100} />
              </Link>
            </header>
            {children}
          </main>
        </AuthProvider>
      </body>
    </html>
  );
}
