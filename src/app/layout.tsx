import type { Metadata } from "next";
import "./globals.css";
import Navbar from "./components/UI/Navbar";
import UserProvider from "./components/globalStates/UserContext";

export const metadata: Metadata = {
  title: "JooP website",
  description: "for job search created by mohammed alkaf & hasan alhaddad",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="grid grid-cols-[10%_90%] md:grid-cols-[30%_70%] lg:grid-cols-[20%_80%] my-container">
        <UserProvider>
          <div>
            <Navbar />
          </div>
          <main className="flex flex-col w-full h-full">{children}</main>
        </UserProvider>
      </body>
    </html>
  );
}
