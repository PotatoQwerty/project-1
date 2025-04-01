import React from "react";
import Link from "next/link";
import { Inter } from "next/font/google";
import "../globals.css";
import Header from "../../components/Header";
import { AuthProvider } from "../../context/AuthContext";
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
            <Link
              className="text-3xl font-bold text-primary m-3 items-center flex justify-center"
              href="/"
            >
              Shopie.
            </Link>
            {children}
          </main>
        </AuthProvider>
      </body>
    </html>
  );
}
