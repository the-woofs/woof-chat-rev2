import "./index.css";

import { Avatar, Button, notification } from "antd";
import { useState, useEffect } from "react";

import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useDocumentOnce } from "react-firebase-hooks/firestore";
import { doc, getFirestore, setDoc, updateDoc } from "firebase/firestore";
import { EditOutlined } from "@ant-design/icons";

const db = getFirestore();
const storage = getStorage();

function AvatarUpload(props) {
  const { serverId, setPfp } = props;
  console.log(serverId);
  const [avatar, setAvatar] = useState("");
  const [srvDoc] = useDocumentOnce(doc(db, "chat", serverId));

  useEffect(() => {
    if (srvDoc && srvDoc.data) {
      console.log(srvDoc);
      if (srvDoc.data().pfp) {
        setAvatar(srvDoc.data().pfp);
      } else {
        setAvatar(`https://avatars.dicebear.com/api/bottts/${serverId}.svg`);
      }
    } else {
      console.log("no doc");
      setDoc(doc(db, "chat", serverId), {
        pfp: avatar,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [srvDoc]);

  const [file, setFile] = useState(null);

  useEffect(() => {
    if (file) {
      const profileRef = ref(
        storage,
        `c/${serverId}/avatar.${file.name.split(".").pop()}`
      );
      notification["info"]({
        message: "Uploading",
        description: "Uploading avatar...",
      });
      uploadBytes(profileRef, file).then(() => {
        getDownloadURL(profileRef).then((url) => {
          let data = {
            pfp: url,
          };
          setPfp(url)
          const docRef = doc(db, "chat", serverId);
          updateDoc(docRef, data).then(() => {
            setAvatar(url);
            notification["success"]({
              message: "Uploaded",
              description: "Avatar uploaded successfully!",
            });
          });
        });
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [file]);

  const onClick = (e) => {
    const file = e.target.files[0];
    setFile(file);
  };

  return (
    <>
      <div className="AvatarContainer">
        <div className="AvatarOverlay">
          <input
            type="file"
            onChange={onClick}
            onClick={onClick}
            className="infile"
            id="infile"
            style={{
              display: "none",
            }}
          />
          <Button
            icon={<EditOutlined />}
            type="text"
            style={{ width: 100, height: 100 }}
            shape="circle"
            onClick={() => {
              document.getElementById("infile").click();
            }}
          ></Button>
        </div>
        <Avatar src={avatar} style={{ width: 100, height: 100 }} />
      </div>
    </>
  );
}

export default AvatarUpload;
