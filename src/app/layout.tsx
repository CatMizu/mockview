import { Inter } from "next/font/google";
import "./globals.css";

import { AuthProvider } from "@/hooks/useAuth";
import { ModalProvider } from "@/hooks/useModal";
import { HeaderProvider } from "@/hooks/useHeader";
import { RightDrawerProvider } from "@/hooks/useRightDrawer";
import { UserProvider } from "@/hooks/useUser";
import initializeApp from "@/lib/init-app";

const inter = Inter({ subsets: ["latin"] });

// Initialize different libraries
initializeApp()
console.log("root layout...")

export default function RootLayout({ children }: { children: React.ReactNode }) {
console.log("root layout...")

  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <UserProvider>
            <HeaderProvider>
              <RightDrawerProvider>
                <ModalProvider>
                  {children}
                </ModalProvider>
              </RightDrawerProvider>
            </HeaderProvider>
          </UserProvider>
        </AuthProvider>
      </body>
    </html>
  );
}