// app/layout.tsx
import "./globals.css";
import Chatbot from "../components/Chatbot";
import Navbar from "../components/Navbar";
import PagePreloader from "../components/PagePreloader";

export const metadata = {
  title: "YoucefCodes | Portfolio",
  description: "Full-stack Developer Portfolio",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="relative min-h-screen bg-white text-gray-900">
        <Navbar />
        {children}
        <Chatbot />
        <PagePreloader />
      </body>
    </html>
  );
}

