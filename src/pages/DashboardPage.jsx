import { Card, Col, Row, Statistic, List, Avatar } from "antd";
import { ShieldCheck, MonitorPlay, TvMinimal, FileText, Users, AlertCircle } from "lucide-react";
import {
    PieChart,
    Pie,
    Cell,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";

import { textStyle } from "../assets/styles";
import { GlobalLayout } from "../components/layout";
import { HeadMain } from "../components/atom";

function DashboardPage() {
    // Dummy data bisa diganti API
    const alatKeselamatan = {
        total: 120,
        aktif: 100,
        warning: 15,
        expired: 5,
    };

    const lokasiUnit = {
        total: 35,
        online: 30,
        offline: 5,
    };

    const laporanTerbaru = [
        { title: "APAR Tower A kadaluarsa", time: "2 jam lalu" },
        { title: "Konten baru di Unit Lantai 3", time: "5 jam lalu" },
        { title: "Pemeriksaan rutin selesai", time: "1 hari lalu" },
    ];

    // Chart data
    const alatPieData = [
        { name: "Aktif", value: alatKeselamatan.aktif, color: "#00aaad" },
        { name: "Warning", value: alatKeselamatan.warning, color: "#ffcc00" },
        { name: "Expired", value: alatKeselamatan.expired, color: "#cc3300" },
    ];

    const unitBarData = [
        { name: "Online", value: lokasiUnit.online },
        { name: "Offline", value: lokasiUnit.offline },
    ];

    const konten = {
        aktif: "Video Edukasi APAR",
        jadwalBerikut: "10:00 - Sosialisasi K3",
        totalHariIni: 8,
    };

    return (
        <GlobalLayout>
            <HeadMain title={"Dashboard"} />

            {/* Ringkasan Utama */}
            <Row gutter={[16, 16]} className="mt-4">
                <Col xs={24} sm={12} lg={6}>
                    <Card>
                        <Statistic
                            title="Alat Keselamatan"
                            value={alatKeselamatan.total}
                            prefix={<ShieldCheck size={18} />}
                        />
                        <div className="mt-2 text-sm">
                            <span className="text-(--secondary)">
                                Aktif: {alatKeselamatan.aktif}
                            </span>{" "}
                            |{" "}
                            <span className="text-yellow-600">
                                Warning: {alatKeselamatan.warning}
                            </span>{" "}
                            |{" "}
                            <span className="text-red-600">Expired: {alatKeselamatan.expired}</span>
                        </div>
                    </Card>
                </Col>

                <Col xs={24} sm={12} lg={6}>
                    <Card>
                        <Statistic
                            title="Konten Hari Ini"
                            value={konten.totalHariIni}
                            prefix={<MonitorPlay size={18} />}
                        />
                        <div className="mt-2 text-sm">
                            <span className="text-(--secondary)">Aktif: {konten.aktif}</span>
                            <br />
                            <span>Berikutnya: {konten.jadwalBerikut}</span>
                        </div>
                    </Card>
                </Col>

                <Col xs={24} sm={12} lg={6}>
                    <Card>
                        <Statistic
                            title="Unit Terpasang"
                            value={lokasiUnit.total}
                            prefix={<TvMinimal size={18} />}
                        />
                        <div className="mt-2 text-sm">
                            <span className="text-(--secondary)">Online: {lokasiUnit.online}</span>{" "}
                            | <span className="text-red-600">Offline: {lokasiUnit.offline}</span>
                        </div>
                    </Card>
                </Col>

                <Col xs={24} sm={12} lg={6}>
                    <Card>
                        <Statistic
                            title="Pengguna Sistem"
                            value={28}
                            prefix={<Users size={18} />}
                        />
                        <div className="mt-2 text-sm">
                            <span>Admin: 3</span> | <span>Teknisi: 15</span> |{" "}
                            <span>Manajemen: 10</span>
                        </div>
                    </Card>
                </Col>
            </Row>

            {/* Chart Section */}
            <Row gutter={[16, 16]} className="mt-6">
                <Col xs={24} lg={12}>
                    <Card title="Status Alat Keselamatan (Pie Chart)">
                        <ResponsiveContainer width="100%" height={250}>
                            <PieChart>
                                <Pie
                                    data={alatPieData}
                                    dataKey="value"
                                    nameKey="name"
                                    cx="50%"
                                    cy="50%"
                                    outerRadius={80}
                                    label
                                >
                                    {alatPieData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Pie>
                                <Tooltip />
                            </PieChart>
                        </ResponsiveContainer>
                    </Card>
                </Col>

                <Col xs={24} lg={12}>
                    <Card title="Status Unit (Bar Chart)">
                        <ResponsiveContainer width="100%" height={250}>
                            <BarChart data={unitBarData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Bar dataKey="value" fill="#20a879" />
                            </BarChart>
                        </ResponsiveContainer>
                    </Card>
                </Col>
            </Row>

            {/* Laporan & Notifikasi */}
            <Row gutter={[16, 16]} className="mt-6">
                <Col xs={24} lg={12}>
                    <Card title="Laporan Terbaru" bordered={false}>
                        <List
                            itemLayout="horizontal"
                            dataSource={laporanTerbaru}
                            renderItem={(item) => (
                                <List.Item>
                                    <List.Item.Meta
                                        avatar={
                                            <Avatar
                                                size={32}
                                                className="bg-blue-100 text-blue-600"
                                                icon={<FileText size={18} />}
                                            />
                                        }
                                        title={item.title}
                                        description={item.time}
                                    />
                                </List.Item>
                            )}
                        />
                    </Card>
                </Col>

                <Col xs={24} lg={12}>
                    <Card title="Notifikasi Penting" bordered={false}>
                        <List
                            dataSource={[
                                "APAR Tower B expired 3 hari lagi",
                                "Unit Lantai 5 offline",
                                "Konten belum diunggah untuk besok",
                            ]}
                            renderItem={(notif) => (
                                <List.Item>
                                    <span className="flex items-center">
                                        <AlertCircle size={16} className="text-red-500 mr-2" />
                                        {notif}
                                    </span>
                                </List.Item>
                            )}
                        />
                    </Card>
                </Col>
            </Row>
        </GlobalLayout>
    );
}

export default DashboardPage;
