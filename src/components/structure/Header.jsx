import { Button, Avatar, Dropdown, Modal } from "antd";
import { Menu, User, LogOut, Settings } from "lucide-react";
import { toogleSidebar } from "../../utils";
import { getFunctionApi, useAlert, useAuth } from "../../constants";
import { ALERT_TYPE } from "../../constants/alertStore";

const { confirm } = Modal;

function Header() {
    const { isSidebarOpen, setIsSidebarOpen } = toogleSidebar();
    const { setCondition, setIsLoading } = useAlert();
    const { user } = useAuth();

    const toggleisSidebarOpen = () => {
        setIsSidebarOpen(isSidebarOpen);
    };

    const handleLogout = async () => {
        try {
            setIsLoading(true);
            const logout = getFunctionApi("auth", "logout");
            await logout();
            window.location.reload();
        } catch (error) {
            setCondition(ALERT_TYPE.FAILED, "Gagal Logout", "Proses logout gagal dilakukan");
        } finally {
            setIsLoading(false);
        }
    };

    const showLogoutConfirm = () => {
        confirm({
            centered: true,
            title: "Konfirmasi Logout",
            content: "Apakah Anda yakin ingin keluar?",
            okText: "Ya",
            cancelText: "Batal",
            onOk: () => handleLogout(),
        });
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
            <Dropdown
                menu={{
                    items: profileMenu,
                    onClick: ({ key }) => {
                        if (key === "logout") showLogoutConfirm();
                    },
                }}
                placement="bottomRight"
                trigger={["click"]}
            >
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
