import Provider from "./components/provider";
import "./globals.css";

export const metadata = {
  title: { default: "SociNex", template: "SociNex - %s" },
  description: "A rede social criada por um brasileiro.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-br">
      <body>
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
