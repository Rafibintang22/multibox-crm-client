import { Spin } from "antd";

function Loading() {
    return (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/30 backdrop-blur-sm">
            <Spin size="large" />
        </div>
    );
}

export default Loading;
