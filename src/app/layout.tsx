import localFont from "next/font/local";
import "./globals.css";
import { ThemeProvider } from "@mui/material/styles";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import theme from "../theme";
import { Grid, Container, Stack } from "@/components/ui";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <AppRouterCacheProvider>
          <ThemeProvider theme={theme}>
            <Container fixed>
              <Grid container justifyContent="center">
                <Stack
                  spacing={2}
                  justifyContent="center"
                  alignItems="center"
                  minHeight="100vh"
                  sx={{
                    width: 1,
                  }}
                >
                  {children}
                </Stack>
              </Grid>
            </Container>
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
