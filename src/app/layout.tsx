// "use client"
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { usePathname, useRouter } from 'next/navigation';
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
// import WixClientContextProvider from "@/context/wixContext"
const inter = Inter({ subsets: ["latin"] });
import { WixClientContextProvider } from "@/context/wixContext";
export const metadata: Metadata = {
  title: "Parvez Alam E-Commerce Application",
  description: "A complete e-commerce application with Next.js and Wix",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  //   let router = useRouter();
  // console.log("usePatname",pathName)
  // let pathName = usePathname();
  return (
    <html lang="en">
      <body className={inter.className}>
        
<WixClientContextProvider>

        <Navbar />
        {children}
        <Footer />
</WixClientContextProvider>
        </body>
    </html>
  );
}
