import "./index.css";

import Message from "../Message";

import React, { useEffect, useState, useRef } from "react";
import {
  getFirestore,
  collection,
  limit,
  query,
  orderBy,
} from "firebase/firestore";
import { useCollectionData } from "react-firebase-hooks/firestore";

const db = getFirestore();

const AlwaysScrollToBottom = () => {
  const elementRef = useRef();
  useEffect(() => elementRef.current.scrollIntoView());
  return <div ref={elementRef} />;
};

function ChatContent(props) {
  const { chatRoom } = props;
  const messagesRef = collection(db, "chat", chatRoom, "messages");
  const q = query(messagesRef, orderBy("createdAt", "desc"), limit(50));
  const [messages] = useCollectionData(q);
  const [existMsgs, setExistMsgs] = useState([]);
  const [reverseMessages, setReverseMessages] = useState([]);

  useEffect(() => {
    console.log(document.hasFocus());
    if (existMsgs.length === 0 && messages) {
      setExistMsgs(messages.slice());
      console.log(existMsgs);
    }
    if (messages) {
      try {
        setReverseMessages(messages.reverse());
      } catch (err) {
        console.log(err);
      }
    }
  }, [messages, chatRoom, existMsgs, reverseMessages]);

  return (
    <div>
      {reverseMessages &&
        reverseMessages.map((message) => (
          <Message
            key={message.id}
            message={message.content}
            author={message.authorName}
            authorPfp={message.authorAvatar}
            timestamp={
              message.createdAt &&
              message.createdAt.toDate().toLocaleString(undefined, {
                hour: "numeric",
                minute: "numeric",
                year: "numeric",
                month: "short",
                day: "numeric",
              })
            }
            authorId={message.authorId}
            id={message.id}
            chatRoom={chatRoom}
          />
        ))}
      <AlwaysScrollToBottom />
    </div>
  );
}

export default ChatContent;
