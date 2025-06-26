import "./globals.css";

export const metadata = {
  title: "My Social Network site",
  description: "Made by Luke Plechaty",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
