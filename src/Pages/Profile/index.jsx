import "./index.css";
import { Avatar, Card, Form, Input } from "antd";

import { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import { doc, getFirestore } from "firebase/firestore";
import { useDocument } from "react-firebase-hooks/firestore";
import AvatarUpload from "../../Components/AvatarUpload";

const db = getFirestore();
const auth = getAuth();

function Profile() {
  const [avatar, setAvatar] = useState("");
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [userDoc] = useDocument(doc(db, "u", auth.currentUser.uid));

  useEffect(() => {
    if (userDoc) {
      setName(userDoc.data().name);
      setDesc(userDoc.data().desc);
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
    <>
      <div className="Profile">
        <Card title="Edit Profile" bordered={false} className="CardEdit">
          <Form layout="vertical">
            <Form.Item label="Avatar">
              <AvatarUpload />
            </Form.Item>
            <Form.Item label="Name">
              <Input value={name} onChange={(e) => setName(e.target.value)} />
            </Form.Item>
            <Form.Item label="Description">
              <Input.TextArea
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
              />
            </Form.Item>
          </Form>
        </Card>
        <div className="Preview">
          <Card style={{ width: "50%" }}>
            <div className="PreviewCard">
              <Avatar src={avatar} className="Avatar" />
              <div>
                <h2>{name}</h2>
                <p>{desc}</p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </>
  );
}

export default Profile;
