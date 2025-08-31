// app/layout.jsx
import "./globals.css";
import LayoutWrapper from "./components/LayoutWrapper";

export const metadata = {
  title: "CitizenDesk",
  description: "A platform to share complaints and feedback with the government",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-100 text-gray-900 h-screen flex flex-col">
        
          <main className="flex-1 overflow-auto">{children}</main>
 

        <footer className="bg-gray-800 text-white p-4 text-center text-sm">
          © {new Date().getFullYear()} Quartex Innovations.All rights reserved.
        </footer>
      </body>
    </html>
  );
}
