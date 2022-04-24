import "./index.css";

import { Avatar, Button, notification } from "antd";
import { useState, useEffect } from "react";

import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useDocumentOnce } from "react-firebase-hooks/firestore";
import { doc, getFirestore, updateDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { EditOutlined } from "@ant-design/icons";

const auth = getAuth();
const db = getFirestore();
const storage = getStorage();

function AvatarUpload() {
  const [avatar, setAvatar] = useState("");
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [userDoc] = useDocumentOnce(doc(db, "u", auth.currentUser.uid));

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

  const [file, setFile] = useState(null);

  useEffect(() => {
    if (file) {
      const profileRef = ref(
        storage,
        `u/${auth.currentUser.uid}/avatar.${file.name.split(".").pop()}`
      );
      notification["info"]({
        message: "Uploading",
        description: "Uploading avatar...",
      });
      uploadBytes(profileRef, file).then(() => {
        getDownloadURL(profileRef).then((url) => {
          setAvatar(url);
          let data;
          if (desc) {
            data = {
              name: name,
              desc: desc,
              pfp: url,
            };
          } else {
            data = {
              name: name,
              pfp: url,
            };
          }
          const docRef = doc(db, "u", auth.currentUser.uid);
          updateDoc(docRef, data);
          notification["success"]({
            message: "Uploaded",
            description: "Avatar uploaded successfully!",
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
