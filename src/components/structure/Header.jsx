import { Button, Avatar, Dropdown } from "antd";
import { Menu, User, LogOut, Settings } from "lucide-react";
import { toogleSidebar } from "../../utils";
import { useAuth } from "../../constants";

function Header() {
    const { isSidebarOpen, setIsSidebarOpen } = toogleSidebar();
    const toggleisSidebarOpen = () => {
        setIsSidebarOpen(isSidebarOpen);
    };

    const profileMenu = [
        {
            key: "profile",
            label: "Profil Saya",
            icon: <User size={16} />,
        },
        {
            key: "settings",
            label: "Pengaturan",
            icon: <Settings size={16} />,
        },
        {
            type: "divider",
        },
        {
            key: "logout",
            label: "Keluar",
            icon: <LogOut size={16} />,
        },
    ];

    const { user } = useAuth();

    return (
        <header className="header flex w-full h-18 bg-white justify-between lg:justify-end items-center px-4">
            {/* Sidebar Toggle */}
            <Button
                className="lg:!hidden"
                icon={<Menu size={16} />}
                type="primary"
                onClick={toggleisSidebarOpen}
            />

            {/* Profile Section */}
            <Dropdown menu={{ items: profileMenu }} placement="bottomRight" trigger={["click"]}>
                <div className="flex items-center gap-2 cursor-pointer">
                    <Avatar size={"large"} src="https://i.pravatar.cc/40" alt="User" />
                    <div className="hidden sm:flex flex-col leading-tight">
                        <span className="font-medium">{user?.username}</span>
                        <span className="text-gray-600">{user?.role}</span>
                    </div>
                </div>
            </Dropdown>
        </header>
    );
}

export default Header;
