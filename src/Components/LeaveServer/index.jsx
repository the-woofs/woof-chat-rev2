import { CloseOutlined } from "@ant-design/icons";
import { Menu, Modal } from "antd";
import { getAuth } from "firebase/auth";
import { collection, deleteDoc, doc, getFirestore } from "firebase/firestore";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const db = getFirestore();
const auth = getAuth();

function LeaveServer(props) {
  const { serverId } = props;
  const [visible, setVisible] = useState(false);

  const nav = useNavigate();

  return (
    <>
      <Modal
        centered
        title="Leave Server"
        visible={visible}
        onCancel={() => {
          setVisible(false);
        }}
        okText="Leave Server"
        onOk={async () => {
          const docRef = doc(
            collection(db, "chat", serverId, "members"),
            auth.currentUser.uid
          );
          const uDocRef = doc(
            collection(db, "u", auth.currentUser.uid, "chats"),
            serverId
          );
          await deleteDoc(docRef);
          await deleteDoc(uDocRef);
          nav("/");
          setVisible(false);
        }}
        okButtonProps={{
          type: "danger",
        }}
      >
        Are you sure you want to leave this server?
      </Modal>
      <Menu.Item
        icon={<CloseOutlined />}
        onClick={() => {
          setVisible(true);
        }}
      >
        Leave Server
      </Menu.Item>
    </>
  );
}

export default LeaveServer;
