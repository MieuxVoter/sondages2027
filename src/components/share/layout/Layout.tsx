import type { ReactNode } from 'react';
import { Header } from './Header';
import { Footer } from './Footer';
import { useLocation } from '@tanstack/react-router';
import './Layout.scss';

export const Layout = ({ children }: { children: ReactNode }) => {
    const location = useLocation();
    const isLandingPage = location.pathname === '/';

    return (
        <div className="layout">
            {!isLandingPage && <Header />}
            <main className="layout__main">
                {children}
            </main>
            <Footer />
        </div>
    );
};
