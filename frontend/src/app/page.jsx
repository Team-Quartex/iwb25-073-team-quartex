import "./globals.css";
import ClientLayout from "./components/ClientLayout";

export const metadata = {
  title: "Citizen Desk",
  description: "A platform to share complaints and feedback with the government",
};

export default function RootLayout({ children }) {
  return (
    
      <main className="bg-gray-100 text-gray-900 h-screen flex flex-col">
        <ClientLayout>{children}</ClientLayout>
      </main>
    
  );
}
