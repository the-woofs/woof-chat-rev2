import { Avatar } from "antd";
import { doc, getFirestore } from "firebase/firestore";
import { useDocument } from "react-firebase-hooks/firestore";

const db = getFirestore();

function ChatRoomName(props) {
  const { chatRoom } = props;

  const [chatRoomDoc] = useDocument(doc(db, "chat", chatRoom));

  return (
    <>
      {chatRoomDoc && chatRoomDoc.data() && (
        <>
          {" "}
          <Avatar
            src={chatRoomDoc.data().pfp}
            style={{
              marginRight: "10px",
            }}
          />{" "}
          {chatRoomDoc.data().name}
        </>
      )}
    </>
  );
}

export default ChatRoomName;
