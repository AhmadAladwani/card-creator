import Link from "next/link"
import StoreProvider from "./StoreProvider"
import "./styles.css"
import { AR_One_Sans } from "next/font/google"
import type { Metadata } from "next"

export const metadata: Metadata = {
    title: 'Card Creator',
}

const font = AR_One_Sans({ subsets: ['latin'] })

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body className={font.className}>
                <nav className="navbar">
                    <Link className="nav-title" href="/" replace>Card Creator</Link>
                </nav>
                <StoreProvider>
                    {children}
                </StoreProvider>
            </body>
        </html>
    )
}