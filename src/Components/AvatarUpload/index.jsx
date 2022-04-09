import "./index.css";

import { Avatar, Button } from "antd";
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
  const [previewUrl, setPreviewUrl] = useState(null);

  const upload = () => {
    console.log("upppp");
  };

  useEffect(() => {
    if (file) {
      console.log("fileeee");
      const profileRef = ref(
        storage,
        `u/${auth.currentUser.uid}/avatar.${file.name.split(".").pop()}`
      );
      uploadBytes(profileRef, file).then(() => {
        getDownloadURL(profileRef).then((url) => {
          console.log(url);
          setPreviewUrl(url);
          setAvatar(url);
          console.log(previewUrl);
          let data;
          if (desc) {
            data = {
              name: name,
              desc: desc,
              pfp: previewUrl,
            };
          } else {
            data = {
              name: name,
              pfp: previewUrl,
            };
          }
          const docRef = doc(db, "u", auth.currentUser.uid);
          updateDoc(docRef, data);
        });
      });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [file]);

  const onClick = (e) => {
    const file = e.target.files[0];
    setFile(file);
    upload();
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
