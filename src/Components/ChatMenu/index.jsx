import { Avatar, Button, Divider, Menu } from "antd";
import { getFirestore, collection, doc, getDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { useEffect, useState } from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { PlusOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

import AddServer from "../AddServer";

const db = getFirestore();
const auth = getAuth();

function ChatMenu(props) {
  const chatRoomsRef = collection(db, "u", auth.currentUser.uid, "chats");
  const [chatRoomsProf] = useCollectionData(chatRoomsRef);

  const [chatRooms, setChatRooms] = useState([]);
  const [menuVisible, setMenuVisible] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (chatRoomsProf) {
      console.log(chatRoomsProf);
      for (let chatRoomProf of chatRoomsProf) {
        const chatRoomId = chatRoomProf.id;
        const chatRoomDocRef = doc(collection(db, "chat"), chatRoomId);
        getDoc(chatRoomDocRef).then((chatRoomDoc) => {
          if (chatRoomDoc.exists) {
            const chatRoomData = chatRoomDoc.data();
            const chatRoomName = chatRoomData.name;
            const chatRoomPfp = chatRoomData.pfp;
            const chatRoom = {
              id: chatRoomId,
              name: chatRoomName,
              pfp: chatRoomPfp,
            };
            if (!chatRooms.some((chatRoom) => chatRoom.id === chatRoomId)) {
              setChatRooms((chatRooms) => [...chatRooms, chatRoom]);
            }
          }
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chatRoomsProf]);

  return (
    <>
      <AddServer visible={menuVisible} setMenuVisible={setMenuVisible} />
      <Menu
        style={{
          height: "calc(100% - 64px)",
        }}
        theme="light"
        mode="inline"
      >
        <div
          style={{
            textAlign: "center",
            paddingTop: "16px",
          }}
        >
          <Button
            style={{
              margin: "5px",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            icon={<PlusOutlined />}
            onClick={() => setMenuVisible(true)}
          >
            Add Server
          </Button>
        </div>
        <Divider />
        {chatRooms &&
          chatRooms.map((chatRoom) => (
            <Menu.Item
              style={{
                height: "45px",
              }}
              key={chatRoom.id}
              onClick={() => navigate(`/${chatRoom.id}`)}
              icon={
                chatRoom.pfp ? (
                  <Avatar src={chatRoom.pfp} />
                ) : (
                  <Avatar
                    src={`https://avatars.dicebear.com/api/initials/${chatRoom.name}.svg`}
                  />
                )
              }
            >
              {chatRoom.name}
            </Menu.Item>
          ))}
      </Menu>
    </>
  );
}

export default ChatMenu;
