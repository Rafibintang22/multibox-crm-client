import { Button } from "antd";
import { Menu } from "lucide-react";
import { toogleSidebar } from "../../utils";

function Header() {
    const { isSidebarOpen, setIsSidebarOpen } = toogleSidebar();
    const toggleisSidebarOpen = () => {
        setIsSidebarOpen(isSidebarOpen);
    };
    return (
        <div className="header flex w-full h-18 bg-white items-center px-4">
            {!isSidebarOpen && (
                <Button
                    className="lg:!hidden"
                    icon={<Menu size={16} />}
                    type="primary"
                    onClick={toggleisSidebarOpen}
                />
            )}
        </div>
    );
}

export default Header;
