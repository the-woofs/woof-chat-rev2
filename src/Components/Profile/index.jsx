import "./index.css";
import { Button, Col, Divider, Form, Input, notification, Row } from "antd";

import { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import { doc, getFirestore, updateDoc } from "firebase/firestore";
import { useDocument } from "react-firebase-hooks/firestore";
import AvatarUpload from "../AvatarUpload";
import Modal from "antd/lib/modal/Modal";
import UserCoverUpload from "../UserCoverUpload";
// import { useNavigate } from "react-router-dom";

const db = getFirestore();
const auth = getAuth();

function Profile(props) {
  const { visible, setVisible } = props;
  const [avatar, setAvatar] = useState("");
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [userDoc] = useDocument(doc(db, "u", auth.currentUser.uid));

  const [logOutPopup, setLogOutPopup] = useState(false);

  //const navigate = useNavigate();

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

  useEffect(() => {
    if (logOutPopup) {
      setVisible(false);
    }
  }, [logOutPopup, setVisible]);

  const onSaveClick = () => {
    let data;
    if (desc) {
      data = {
        name: name,
        desc: desc,
        pfp: avatar,
      };
    } else {
      data = {
        name: name,
        pfp: avatar,
      };
    }
    const docRef = doc(db, "u", auth.currentUser.uid);
    updateDoc(docRef, data);
    notification["success"]({
      message: "Saved",
      description: "Updated profile.",
    });
  };

  return (
    <>
      <Modal
        visible={visible}
        title="Account"
        centered
        onOk={async () => {
          await onSaveClick();
        }}
        onCancel={() => {
          setVisible(false);
        }}
        okText="Save"
        cancelText="Exit"
      >
        <Form layout="vertical">
          <Row>
            <Col flex="150px">
              <Form.Item label="Avatar">
                <AvatarUpload />
              </Form.Item>
            </Col>
            <Col flex="auto">
              <Form.Item label="Cover Art">
                <UserCoverUpload />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item label="Name">
            <Input
              maxLength={16}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Item>
          <Form.Item label="Description">
            <Input.TextArea
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
            />
          </Form.Item>
        </Form>
        <Divider />

        <Button
          style={{
            marginRight: "5px",
          }}
          onClick={() => setLogOutPopup(true)}
          danger
          type="primary"
        >
          Logout
        </Button>

        {/* <Button
          danger
          type="primary"
          onClick={() => {
            navigate("/del");
            setVisible(false);
          }}
        >
          Delete Account
        </Button> */}
      </Modal>
      <Modal
        centered
        visible={logOutPopup}
        okButtonProps={{
          danger: true,
        }}
        okText="Logout"
        cancelText="Cancel"
        onOk={() => {
          auth.signOut();
          setLogOutPopup(false);
        }}
        onCancel={() => {
          setLogOutPopup(false);
          setVisible(true);
        }}
      >
        Are you sure you want to logout?
      </Modal>
    </>
  );
}

export default Profile;
