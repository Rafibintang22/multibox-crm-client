import { Route, BrowserRouter, Routes } from "react-router-dom";
import { DashboardPage, NotFoundPage } from "./pages";
import { ConfigProvider } from "antd";
import { themeColor } from "./assets/styles";

function App() {
    const primary = themeColor.primary;
    return (
        <ConfigProvider
            theme={{
                token: {
                    colorPrimary: primary,
                    colorBorder: "#E0E0E0",
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
                    <Route path="*" element={<NotFoundPage />}></Route>
                </Routes>
            </BrowserRouter>
        </ConfigProvider>
    );
}

export default App;
