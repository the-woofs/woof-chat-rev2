import "./index.css";
import { Avatar, Button } from "antd";
import { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import { doc, getFirestore } from "firebase/firestore";
import { useDocumentOnce } from "react-firebase-hooks/firestore";
import { UserOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const db = getFirestore();
const auth = getAuth();

function UserInfo(props) {
  const { setVisible } = props;
  const [avatar, setAvatar] = useState("");
  const [name, setName] = useState("");
  const [userDoc] = useDocumentOnce(doc(db, "u", auth.currentUser.uid));

  useEffect(() => {
    if (userDoc) {
      setName(userDoc.data().name);
      if (userDoc.data().pfp) {
        setAvatar(userDoc.data().pfp);
      } else {
        setAvatar(
          `https://avatars.dicebear.com/api/jdenticon/${auth.currentUser.uid}.svg`
        );
      }
    }
  }, [userDoc]);

  return (
    <div className="UserInfo">
      <Avatar src={avatar} />
      <strong>{name}</strong>
      <Button
        onClick={() => {
          setVisible(true);
        }}
        icon={<UserOutlined />}
        size="small"
        shape="circle"
      />
    </div>
  );
}

export default UserInfo;
