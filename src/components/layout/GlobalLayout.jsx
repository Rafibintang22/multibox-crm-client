import { Header, Sidebar } from "../structure";

function GlobalLayout({ children }) {
    return (
        <section className="flex h-screen w-full">
            {/* Sidebar */}
            <Sidebar />
            {/* Main Content */}
            <main className="flex-1">
                <Header />
                {children}
            </main>
        </section>
    );
}

export default GlobalLayout;
