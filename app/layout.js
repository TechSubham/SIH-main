import { Plus_Jakarta_Sans } from "next/font/google";
import "@/app/globals.css";

const inter = Plus_Jakarta_Sans({ subsets: ["latin"] });

export const metadata = {
  title: "Real Time Vulnerability Reporting System | Qubit",
  description: "Real Time Vulnerability Reporting System | Qubit",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
