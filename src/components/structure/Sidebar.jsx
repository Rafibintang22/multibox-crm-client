import { Button, Menu } from "antd";
import {
    ArrowRight,
    FileText,
    LayoutDashboard,
    MonitorCog,
    MonitorPlay,
    ShieldCheck,
    TvMinimal,
    Users,
} from "lucide-react";
import { useState } from "react";
import { textStyle } from "../../assets/styles";
import { toogleSidebar } from "../../utils";
import { useNavigate } from "react-router-dom";

function Sidebar() {
    const navigate = useNavigate();
    const iconSize = 16;
    const menu = [
        { key: "/", icon: <LayoutDashboard size={iconSize} />, label: "Dashboard" },
        {
            key: "unit-box",
            icon: <TvMinimal size={iconSize} />,
            label: "Manajemen Unit",
            children: [
                { key: "/unit-box/data", label: "Data Unit Box" },
                { key: "/unit-box/location", label: "Lokasi Pemasangan" },
            ],
        },
        {
            key: "content",
            icon: <MonitorPlay size={iconSize} />,
            label: "Konten Layar",
            children: [
                { key: "/content/manage", label: "Atur Konten" },
                { key: "/content/schedule", label: "Jadwal Konten" },
            ],
        },
        {
            key: "health-tools",
            icon: <ShieldCheck size={iconSize} />,
            label: "Alat Keselamatan",
            children: [
                { key: "/health-tools/status", label: "Status Alat" },
                { key: "/health-tools/validity", label: "Masa Berlaku" },
            ],
        },
        {
            key: "report",
            icon: <FileText size={iconSize} />,
            label: "Laporan & Log",
            children: [
                { key: "/report/status", label: "Laporan Status Alat" },
                { key: "/report/history", label: "Riwayat Penggunaan" },
                { key: "/report/log", label: "Log Aktivitas" },
            ],
        },
        {
            key: "user-management",
            icon: <Users size={iconSize} />,
            label: "Pengguna",
            children: [
                { key: "/user-management/roles", label: "Peran & Akses" },
                { key: "/user-management/teams", label: "Tim / Departemen" },
            ],
        },
    ];
    const getLevelKeys = (items1) => {
        const key = {};
        const func = (items2, level = 1) => {
            items2.forEach((item) => {
                if (item.key) {
                    key[item.key] = level;
                }
                if (item.children) {
                    func(item.children, level + 1);
                }
            });
        };
        func(items1);
        return key;
    };
    const levelKeys = getLevelKeys(menu);

    const [stateOpenKeys, setStateOpenKeys] = useState([]);
    const onOpenChange = (openKeys) => {
        const currentOpenKey = openKeys.find((key) => stateOpenKeys.indexOf(key) === -1);
        // open
        if (currentOpenKey !== undefined) {
            const repeatIndex = openKeys
                .filter((key) => key !== currentOpenKey)
                .findIndex((key) => levelKeys[key] === levelKeys[currentOpenKey]);
            setStateOpenKeys(
                openKeys
                    // remove repeat key
                    .filter((_, index) => index !== repeatIndex)
                    // remove current level all child
                    .filter((key) => levelKeys[key] <= levelKeys[currentOpenKey])
            );
        } else {
            // close
            setStateOpenKeys(openKeys);
        }
    };

    const { isSidebarOpen, setIsSidebarOpen } = toogleSidebar();
    const toggleisSidebarOpen = () => {
        setIsSidebarOpen(isSidebarOpen);
    };

    return (
        <>
            <div className="sidebar hidden lg:flex flex-col min-w-max h-full bg-white py-6 border-r border-gray-100">
                {/* Header (fixed) */}
                <div className="head-sidebar flex items-center gap-2 px-4 pb-4 border-b-[0.5px] border-gray-200">
                    <MonitorCog color="#00aaad" />
                    <h1 className={`${textStyle.boldText} text-(--primary)`}>
                        Safety Multibox Systems
                    </h1>
                </div>

                {/* Body (scrollable menu only) */}
                <div className="body-sidebar flex-1 overflow-y-auto mt-4">
                    <Menu
                        mode="inline"
                        items={menu}
                        openKeys={stateOpenKeys}
                        onOpenChange={onOpenChange}
                        defaultSelectedKeys={[window.location.pathname]}
                        onClick={({ key }) => {
                            navigate(key);
                        }}
                    />
                </div>
            </div>

            {isSidebarOpen && (
                <div className="sidebar-mobile absolute flex lg:hidden flex-col w-screen h-full bg-white py-6">
                    {/* Header (fixed) */}
                    <div className="head-sidebar flex justify-between items-center gap-2 px-4 pb-4 border-b-[0.5px] border-gray-200">
                        <div className="flex gap-2">
                            <MonitorCog color="#00aaad" />
                            <h1 className={`${textStyle.boldText} text-(--primary)`}>
                                Safety Multibox Systems
                            </h1>
                        </div>
                        <Button
                            className="lg:!hidden"
                            icon={<ArrowRight size={iconSize} />}
                            type="primary"
                            onClick={toggleisSidebarOpen}
                        />
                    </div>

                    {/* Body (scrollable menu only) */}
                    <div className="body-sidebar flex-1 overflow-y-auto mt-4">
                        <Menu
                            mode="inline"
                            items={menu}
                            openKeys={stateOpenKeys}
                            onOpenChange={onOpenChange}
                            defaultSelectedKeys={[window.location.pathname]}
                            onClick={({ key }) => {
                                navigate(key);
                                toggleisSidebarOpen();
                            }}
                        />
                    </div>
                </div>
            )}
        </>
    );
}

export default Sidebar;
