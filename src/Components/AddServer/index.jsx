import { Card, Modal, Steps } from "antd";
import { useState } from "react";

function AddServer(props) {
  const { visible, setMenuVisible } = props;
  const [name, setName] = useState("");
  const [pfp, setPfp] = useState("");

  const [invite, setInvite] = useState("");

  const [current, setCurrent] = useState(null);

  return (
    <>
      <Modal visible={visible} onCancel={() => setMenuVisible(false)}></Modal>
    </>
  );
}

export default AddServer;
