import Header from "@/app/components/header";

export const metadata = {
  title: "SociNex - Feed",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      {children}
    </>
  );
}
