import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/layout/Sidebar";
import Navbar from "@/components/layout/Navbar";

const poppins = Poppins({ subsets: ["latin"], weight: "400" })

export const metadata: Metadata = {
  title: "Socio Meidum",
  description: "Admin Panel for Socio Medium",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <div className="flex">
          <Sidebar />
          <main className="flex-1 md:ml-[250px]">
            <Navbar />
            <div className="pt-16 px-4">
              {children}
            </div>
          </main>
        </div>
      </body>
    </html>
  );
}
