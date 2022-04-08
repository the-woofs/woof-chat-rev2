import { Input, Button } from "antd";
import { SendOutlined } from "@ant-design/icons";
import "./index.css";

function SendTextBox() {
  return (
    <>
      <div className="FlexRow">
        <Input placeholder="Message" style={{ marginRight: "1rem" }} />
        <Button type="primary" icon={<SendOutlined />}>
          Send
        </Button>
      </div>
    </>
  );
}

export default SendTextBox;
