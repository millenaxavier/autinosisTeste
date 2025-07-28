import "./globals.css";
import { AuthProvider } from "@/components/AuthProvider";
import Nav from "@/components/Nav";

export const metadata = {
  title: "Autinosis",
  description: "Exames de autismo com inteligência artificial.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body>
        <AuthProvider>
          <Nav />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
