import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import { Box, CssBaseline, ThemeProvider } from "@mui/material";
import "./globals.css";

import { theme } from "@/lib/schemas/theme";
import Sidebar from "@/components/sidebar";
import Header from "@/components/header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "InvoiceHub",
  description: "Manage your invoices easily",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AppRouterCacheProvider>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <Box sx={{ display: "flex", minHeight: "100vh" }}>
              <Sidebar />
              <Box
                sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}
              >
                <Header />
                <Box
                  component="main"
                  sx={{
                    flexGrow: 1,
                    bgcolor: "#F1F5F9",
                    p: 3,
                  }}
                >
                  {children}
                </Box>
              </Box>
            </Box>
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
