import { useNavigate } from "react-router-dom";
import { Button, Result } from "antd";

function NotFoundPage() {
    const navigate = useNavigate();
    return (
        <Result
            status="404"
            title="Halaman Tidak di Temukan"
            subTitle="Maaf, halaman yang anda cari tidak ditemukan"
            extra={
                <Button type="primary" onClick={() => navigate("/")}>
                    Kembali Ke Beranda
                </Button>
            }
        />
    );
}

export default NotFoundPage;
