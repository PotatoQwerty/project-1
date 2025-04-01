import React from "react";
import { Inter } from "next/font/google";
import "../globals.css";
import Header from "../../components/Header";
import { AuthProvider } from "../../context/AuthContext";
import Footer from "../../components/Footer";
const inter = Inter({ subsets: ["latin"] });
export const metadata = {
  title: "Shopie",
  description: "Shopie is a fake shopping website",
};
export default function Layout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <Header />
          <main>{children}</main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
