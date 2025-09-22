import { Route, BrowserRouter, Routes } from "react-router-dom";
import {
    KontenLayarPage,
    DashboardPage,
    DataUnitPage,
    LokasiPemasanganPage,
    NotFoundPage,
    JadwalKontenPage,
    LoginPage,
} from "./pages";
import { ConfigProvider } from "antd";
import { themeColor } from "./assets/styles";
import AlertModal from "./components/modalAlert/ModalAlert";
import { useEffect } from "react";
import { useAuth } from "./constants";
import { Loading } from "./components/modalAlert";

function App() {
    const primary = themeColor.primary;

    const { verifySession, loading } = useAuth();

    useEffect(() => {
        verifySession();
    }, [verifySession]);

    if (loading) return <Loading />;
    return (
        <ConfigProvider
            theme={{
                token: {
                    colorPrimary: primary,
                    colorBorder: "#E0E0E0",
                    fontFamily: "'Poppins', sans-serif",
                },

                components: {
                    Select: {
                        colorText: "#000000",
                    },
                    Menu: {
                        itemSelectedBg: primary,
                        itemSelectedColor: "#ffffff",
                    },
                },
            }}
        >
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<DashboardPage />}></Route>
                    <Route path="/login" element={<LoginPage />}></Route>
                    <Route path="/box-unit/data" element={<DataUnitPage />}></Route>
                    <Route path="/box-unit/location" element={<LokasiPemasanganPage />}></Route>
                    <Route path="/content/manage" element={<KontenLayarPage />}></Route>
                    <Route path="/content/schedule" element={<JadwalKontenPage />}></Route>
                    <Route path="*" element={<NotFoundPage />}></Route>
                </Routes>
                <AlertModal />
            </BrowserRouter>
        </ConfigProvider>
    );
}

export default App;
