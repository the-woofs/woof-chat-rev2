import { Button, Form, Input, Modal } from "antd";
import { useEffect, useState } from "react";

import { collection, doc, getFirestore, setDoc } from "firebase/firestore";
import ServerPfpUpload from "../ServerPfpUpload";
import { useNavigate } from "react-router-dom";
import { getAuth } from "firebase/auth";

const db = getFirestore();
const auth = getAuth()

function AddServer(props) {
  const { visible, setMenuVisible } = props;
  const [name, setName] = useState("");
  const [pfp, setPfp] = useState("");
  const [invite, setInvite] = useState("");

  const [docId, setDocId] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    if (visible) {
      const docRef = doc(collection(db, "chat"));
      const docId = docRef.id;
      setDocId(docId);
      console.log(docId);
    }
  }, [visible]);

  useEffect(() => {
    if (!visible) {
      setName("");
      setPfp("");
      setInvite("");
    }
  }, [visible]);

  return (
    <>
      <Modal
        centered
        title="Add Server"
        visible={visible}
        onCancel={() => setMenuVisible(false)}
        footer={
          <>
            <p
              style={{
                textAlign: "center",
              }}
            >
              Already have an invite?{" "}
            </p>
            <Button block>Join Server</Button>
          </>
        }
      >
        <Form layout="vertical">
          <Form.Item label="Avatar">
            {docId && <ServerPfpUpload serverId={docId} />}
          </Form.Item>
          <Form.Item label="Server Name">
            <Input
              value={name}
              required
              onChange={(e) => setName(e.target.value)}
              placeholder="Server Name"
            />
          </Form.Item>
          {
            //submit form
          }
          <Form.Item>
            <Button
              type="primary"
              onClick={async () => {
                const docRef = doc(collection(db, "chat"), docId);
                const data = {
                  name: name,
                  pfp: pfp,
                  invite: docId,
                  id: docId,
                };
                await setDoc(docRef, data);
                await setDoc(doc(db, "u", auth.currentUser.uid, "chats", docId), { id: docId, name: name, pfp: pfp});
                await setDoc(
                  doc(
                    db,
                    "chat",
                    docId,
                    "members",
                    auth.currentUser.uid
                  ), {id: auth.currentUser.uid }
                )
                navigate(`/${docId}`);
                setMenuVisible(false);
              }
              }
            >
              Create Server
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}

export default AddServer;
