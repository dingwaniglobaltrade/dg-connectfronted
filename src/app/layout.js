import { Poppins } from "next/font/google";
import "./globals.css";
import ReduxProvider from "./ReduxProvider";
import ClientWrapper from "./ClientWrapper"; // new wrapper

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata = {
  title: "Dingwani Connect",
  description: "Together With Every Trade Partner",
  
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={poppins.className} suppressHydrationWarning>
        <ReduxProvider>
          <ClientWrapper>{children}</ClientWrapper>
        </ReduxProvider>
      </body>
    </html>
  );
}
