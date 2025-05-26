import "@/styles/globals.css";
import { HeroUIProvider } from "@heroui/react"
import { ThemeProvider as NextThemesProvider } from "next-themes"

export default function App({ Component, pageProps }) {
    return (
        <HeroUIProvider>
            <NextThemesProvider attribute="class" defaultTheme="dark">
                <Component {...pageProps} />
            </NextThemesProvider>
        </HeroUIProvider>
    )
}
