import { Button, Divider, Form, Input, Modal } from "antd";
import { useState } from "react";

function AddServer(props) {
  const { visible, setMenuVisible } = props;
  const [name, setName] = useState("");
  const [pfp, setPfp] = useState("");

  const [invite, setInvite] = useState("");

  const [current, setCurrent] = useState(null);

  return (
    <>
      <Modal
        centered
        title="Add Server"
        visible={visible}
        footer={null}
      ></Modal>
    </>
  );
}

export default AddServer;
