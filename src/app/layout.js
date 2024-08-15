import { Inter } from "next/font/google";
import "../styles/globals.css";
import "@uploadthing/react/styles.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "slackoid",
  description: "A slack clone",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
