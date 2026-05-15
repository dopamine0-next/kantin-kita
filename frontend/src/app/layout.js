import "./globals.css";

export const metadata = {
  title: "Kantin UNPAM",
  description: "Pesan makanan kampus online",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
