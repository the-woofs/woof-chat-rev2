import { Avatar, Divider, Menu } from "antd";
import { getFirestore, collection, query } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { useEffect } from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { PlusOutlined } from "@ant-design/icons";
import SubMenu from "antd/lib/menu/SubMenu";

const db = getFirestore();
const auth = getAuth();

function ChatMenu(props) {
  const chatRoomsRef = collection(db, "u", auth.currentUser.uid, "chats");
  const [chatRooms] = useCollectionData(chatRoomsRef);

  useEffect(() => {
    if (chatRooms) {
      console.log(chatRooms);
    }
  }, [chatRooms]);

  return (
    <>
      <Menu theme="dark" mode="inline">
        {chatRooms &&
          chatRooms.map((chatRoom) => (
            <Menu.Item
              key={chatRoom.id}
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
              <a href={`/${chatRoom.id}`}>{chatRoom.name}</a>
            </Menu.Item>
          ))}
        <Divider />
        <Menu.Item icon={<PlusOutlined />}>
          <a href="/new">Add Server</a>
        </Menu.Item>
      </Menu>
    </>
  );
}

export default ChatMenu;
