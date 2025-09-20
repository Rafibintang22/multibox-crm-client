import { Modal, Result, Spin } from "antd";
import useAlert, { ALERT_TYPE } from "../../constants/alertStore";
import { useEffect } from "react";

function AlertModal() {
    const { condition, isLoading, handleClose } = useAlert();
    const { result, message, detailMessage } = condition;
    const isOpen = !!result;

    // Auto close hanya untuk SUCCESS
    useEffect(() => {
        if (result === ALERT_TYPE.SUCCESS) {
            const timer = setTimeout(() => {
                handleClose();
            }, 2000);
            return () => clearTimeout(timer);
        }
    }, [result, handleClose]);

    if (isLoading) {
        return (
            <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/30 backdrop-blur-sm">
                <Spin size="large" />
            </div>
        );
    }

    if (!result) return null;

    const modalProps = {
        open: isOpen,
        onOk: handleClose,
        onCancel: handleClose,
        title: message,
        centered: true,
    };

    const modalPropsNoFooter = {
        open: isOpen,
        footer: null,
        closable: false,
        centered: true,
        onCancel: handleClose,
    };

    switch (result) {
        case ALERT_TYPE.SUCCESS:
            return (
                <Modal {...modalPropsNoFooter}>
                    <Result
                        status="success"
                        title={message || "Berhasil!"}
                        subTitle={detailMessage || "Proses berhasil diselesaikan."}
                    />
                </Modal>
            );

        case ALERT_TYPE.FAILED:
            return (
                <Modal {...modalProps} okText="Tutup">
                    <Result
                        status="error"
                        title={message || "Gagal!"}
                        subTitle={detailMessage || "Proses gagal diselesaikan."}
                    />
                </Modal>
            );

        case ALERT_TYPE.SUBMITDIALOG:
            return (
                <Modal {...modalProps} okText="Submit" cancelText="Batal">
                    <p>{detailMessage || "Apakah Anda yakin ingin submit?"}</p>
                </Modal>
            );

        case ALERT_TYPE.VOIDDIALOG:
            return (
                <Modal {...modalProps} okText="Void" cancelText="Batal">
                    <p>{detailMessage || "Apakah Anda yakin ingin void?"}</p>
                </Modal>
            );

        default:
            return null;
    }
}

export default AlertModal;
