import { Tooltip } from "antd";

function Test() {
    return <>
        <Tooltip
            title="This is a tooltip"
        >
            <span>Tooltip will show when mouse enter.</span>
        </Tooltip>
    </>
}

export default Test;