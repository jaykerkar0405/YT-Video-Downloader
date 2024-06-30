// App's Internal Imports
import "./globals.css";

// App's External Imports
import { Poppins } from "next/font/google";

const poppins = Poppins({
  display: "swap",
  style: ["normal"],
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata = {
  title: "YouTube Video Downloader",
  description:
    "Download YouTube videos in high quality with our simple and fast video downloader. Start downloading with just a click!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body className={poppins.className}>{children}</body>
    </html>
  );
}
