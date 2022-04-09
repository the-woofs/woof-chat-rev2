import React, { useEffect, useState } from "react";
import { doc, getFirestore } from "firebase/firestore";
import { useDocumentOnce } from "react-firebase-hooks/firestore";

import { Comment } from "antd";

import { grey } from "@ant-design/colors";

const db = getFirestore();
function Message(props) {
  const { message, timestamp, authorId } = props;
  const [userDoc] = useDocumentOnce(doc(db, "u", authorId));
  const [userName, setUserName] = useState("");
  const [avatar, setAvatar] = useState("");
  const [isVisible, setIsVisible] = useState(0);

  useEffect(() => {
    if (userDoc) {
      setUserName(userDoc.data().name);
      setAvatar(`https://avatars.dicebear.com/api/jdenticon/${authorId}.svg`);
      console.log(userDoc.data());
      if (userDoc.data().pfp) {
        setAvatar(userDoc.data().pfp);
      }
      setIsVisible(1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userDoc]);

  return (
    <>
      <Comment
        style={{
          opacity: isVisible,
        }}
        author={
          <h1
            style={{
              color: grey[0],
            }}
          >
            {userName}
          </h1>
        }
        avatar={avatar}
        content={message}
        datetime={timestamp}
      />
    </>
  );
}

export default Message;
