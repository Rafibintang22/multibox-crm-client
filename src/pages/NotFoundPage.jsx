import { useNavigate } from "react-router-dom";
import { layoutStyle } from "../assets/styles";
import { Button, Result } from "antd";

function NotFoundPage() {
    const navigate = useNavigate();
    return (
        <>
            <div className={`${layoutStyle.flexCenter} mt-7`}>
                {/* <img src={srusun} className={` w-1/6`} alt="" /> */}
            </div>
            <Result
                style={{ fontFamily: "Montserrat, sans-serif" }}
                status="404"
                title="Halaman Tidak di Temukan"
                subTitle="Maaf, halaman yang anda cari tidak ditemukan"
                extra={
                    <Button type="primary" onClick={() => navigate("/")}>
                        Kembali Ke Beranda
                    </Button>
                }
            />
        </>
    );
}

export default NotFoundPage;
