import { layoutStyle } from "../../assets/styles";
import { Header, Sidebar } from "../structure";

function GlobalLayout({ children }) {
    return (
        <section className="flex h-screen w-full overflow-hidden">
            {/* Sidebar */}
            <Sidebar />
            {/* Main area */}
            <div className="flex flex-col flex-1 w-full">
                {/* Header (fixed di atas) */}
                <Header />

                {/* Main container) */}
                <main className="flex-1 overflow-y-auto p-4">
                    <div className={`${layoutStyle.maincontainer}`}>{children}</div>
                </main>
            </div>
        </section>
    );
}

export default GlobalLayout;
