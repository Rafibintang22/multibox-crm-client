import { Button } from "antd";
import { textStyle } from "../../assets/styles";
import { Plus } from "lucide-react";

function HeadMain({ title = "", isBtnAdd = false, funcBtnAdd, isFilter = false }) {
    return (
        <div className="w-full flex flex-col items-start justify-between mb-4 md:flex-row md:items-center">
            <h1 className={`${textStyle.primaryHeader}`}>{title}</h1>
            {isBtnAdd && (
                <Button
                    className="w-full md:w-max"
                    type="primary"
                    icon={<Plus size={16} />}
                    onClick={funcBtnAdd}
                >
                    {isBtnAdd}
                </Button>
            )}
        </div>
    );
}

export default HeadMain;
