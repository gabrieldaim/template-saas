import "./globals.css";
import { Poppins } from "next/font/google";

const poppins = Poppins({
   weight: ["400", "500", "600", "700"],
   subsets: ["latin"],
})

export const metadata = {
  title: "Meu Site",
  description: "Descrição do meu site",
  openGraph: {
    title: "Meu Site",
    description: "Descrição quando compartilhar",
    url: "https://seusite.com",
    siteName: "Meu Site",
    images: [
      {
        url: "/opengraph-image.jpg",
        width: 1200,
        height: 630,
        alt: "Minha imagem de destaque",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Meu Site",
    description: "Descrição no Twitter",
    images: ["/opengraph-image.jpg"],
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${poppins.className} bg-gray-100 antialiased`}>
        {children}
      </body>
    </html>
  );
}
