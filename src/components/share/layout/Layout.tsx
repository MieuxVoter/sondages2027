import { type ReactNode } from 'react'
import { Header } from './Header'
import { Footer } from './Footer'
import './Layout.scss'

interface LayoutProps {
    children: ReactNode
}

export const Layout = ({ children }: LayoutProps) => {
    return (
        <div className="mv-layout">
            <Header />
            <main className="mv-main mv-container">
                {children}
            </main>
            <Footer />
        </div>
    )
}
