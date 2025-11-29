import "../styles/globals.css";
import { HeroUIProvider } from "@heroui/react"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import { Toaster } from 'react-hot-toast';

export default function App({ Component, pageProps }) {
    return (
        <HeroUIProvider>
            <NextThemesProvider attribute="class" defaultTheme="dark">
                <Toaster toastOptions={{ className: 'toaster' }} />
                <Component {...pageProps} />
            </NextThemesProvider>
        </HeroUIProvider>
    )
}