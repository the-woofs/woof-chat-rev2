import { EditOutlined } from "@ant-design/icons";
import { Button, notification } from "antd";
import { useEffect, useState } from "react";
import "./index.css";

import { useDocumentDataOnce } from "react-firebase-hooks/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { doc, getFirestore, updateDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const db = getFirestore();
const auth = getAuth();
const storage = getStorage();

function UserCoverUpload() {
  const [file, setFile] = useState(null);
  const [cover, setCover] = useState("");

  const [userDoc] = useDocumentDataOnce(doc(db, "u", auth.currentUser.uid));

  useEffect(() => {
    if (userDoc) {
      if (userDoc.cover) {
        setCover(userDoc.cover);
      } else {
        setCover(userDoc.pfp);
      }
    }
  }, [userDoc]);

  useEffect(() => {
    if (file) {
      const profileRef = ref(
        storage,
        `u/${auth.currentUser.uid}/cover.${file.name.split(".").pop()}`
      );
      notification["info"]({
        message: "Uploading",
        description: "Uploading cover...",
      });
      uploadBytes(profileRef, file).then(() => {
        getDownloadURL(profileRef).then((url) => {
          setCover(url);
          updateDoc(doc(db, "u", auth.currentUser.uid), { cover: url });
          notification["success"]({
            message: "Uploaded",
            description: "Cover uploaded",
          });
        });
      });
    }
  }, [file]);

  const onClick = (e) => {
    const file = e.target.files[0];
    setFile(file);
  };

  return (
    <>
      <div className="CoverContainer">
        <div className="CoverOverlay">
          <input
            onClick={onClick}
            onChange={onClick}
            style={{ display: "none" }}
            type="file"
            id="infileC"
          />
          <Button
            icon={<EditOutlined />}
            type="text"
            style={{ width: "100%", height: 100 }}
            shape="square"
            onClick={() => {
              document.getElementById("infileC").click();
            }}
          />
        </div>

        <img
          alt="eee"
          style={{
            crop: "cover",
            objectFit: "cover",
            width: "100%",
            height: "100px",
          }}
          src={cover}
        />
      </div>
    </>
  );
}

export default UserCoverUpload;
