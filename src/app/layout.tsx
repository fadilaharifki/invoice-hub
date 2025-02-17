import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import { Box, CssBaseline, ThemeProvider } from "@mui/material";
import { Inter } from "next/font/google";
import Sidebar from "@/components/sidebar";
import Header from "@/components/header";
import { Toaster } from "react-hot-toast";
import "./globals.css";
import { theme } from "@/lib/schemas/theme";
import ClientWrapper from "@/components/client-wrapper";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
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
        <ClientWrapper>
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
                    <Toaster />
                  </Box>
                </Box>
              </Box>
            </ThemeProvider>
          </AppRouterCacheProvider>
        </ClientWrapper>
      </body>
    </html>
  );
}
