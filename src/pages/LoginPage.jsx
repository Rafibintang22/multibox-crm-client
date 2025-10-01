import { Button, Checkbox, Form, Input } from "antd";
import { getFunctionApi, useAlert, useAuth } from "../constants";
import { ALERT_TYPE } from "../constants/alertStore";
import { Navigate, useNavigate } from "react-router-dom";
import { Loading } from "../components/modalAlert";

function LoginPage() {
    const [form] = Form.useForm();
    const { setCondition, setIsLoading } = useAlert();
    const navigate = useNavigate();

    const { user, loading } = useAuth();

    if (loading) return <Loading />;
    if (user) return <Navigate to="/" replace />;

    const handleLogin = async () => {
        try {
            setIsLoading(true);
            const values = await form.validateFields();

            // --- Ambil API function ---
            const postLogin = getFunctionApi("auth", "login");
            const response = await postLogin({
                username: values.username,
                password: values.password,
            });
            console.log(response);

            if (response?.user) {
                localStorage.setItem("user", JSON.stringify(response.user));
                setCondition(
                    ALERT_TYPE.SUCCESS,
                    "Berhasil Login",
                    "Proses login berhasil dilakukan"
                );
                window.location.reload();
            }
        } catch (error) {
            setCondition(ALERT_TYPE.FAILED, "Gagal Login", "Proses login gagal dilakukan");
        } finally {
            setIsLoading(false);
        }
    };
    return (
        <div className="h-screen w-screen overflow-hidden  grid grid-cols-1 lg:grid-cols-2">
            <div className="bg-white flex items-center justify-center w-full">
                <div className="flex flex-col rounded-xl max-w-sm w-full md:max-w-lg justify-center items-start">
                    <div className="flex flex-col gap-6  justify-center items-start mb-8">
                        <h1 className="text-5xl font-bold text-[var(--primary)]">Login</h1>
                        <p className="text-gray-400 text-wrap w-3/4">
                            Selamat datang kembali! Silahkan masuk pada akun anda.
                        </p>
                    </div>
                    <Form
                        form={form}
                        name="login-form"
                        layout="vertical"
                        initialValues={{ remember: true }}
                        onFinish={handleLogin}
                        autoComplete="off"
                        className="w-full"
                        size="middle"
                    >
                        <Form.Item
                            label="Username"
                            name="username"
                            rules={[{ required: true, message: "Username tidak boleh kosong!" }]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="Password"
                            name="password"
                            rules={[{ required: true, message: "Password tidak boleh kosong!" }]}
                        >
                            <Input.Password />
                        </Form.Item>

                        <Form.Item name="remember" valuePropName="checked" label={null}>
                            <Checkbox>Ingat saya</Checkbox>
                        </Form.Item>

                        <Form.Item label={null}>
                            <Button
                                type="primary"
                                size="large"
                                htmlType="submit"
                                className="w-full"
                            >
                                Login
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>

            <div className="hidden lg:flex items-center justify-center overflow-hidden rounded-tl-4xl rounded-bl-4xl">
                <img
                    src="/images/img-box.png"
                    alt="img-safety-box"
                    className="object-cover w-full h-full"
                />
            </div>
        </div>
    );
}

export default LoginPage;
