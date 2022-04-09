import React, { useState } from "react";
import { Input, Button, Form } from "antd";
import { SendOutlined } from "@ant-design/icons";

import { getAuth } from "firebase/auth";
import {
  setDoc,
  doc,
  getFirestore,
  collection,
  serverTimestamp,
} from "firebase/firestore";


import "./index.css";

const db = getFirestore();
const auth = getAuth();

function SendTextBox(props) {
  const { chatRoom } = props;
  const [message, setMessage] = useState("");
  const [form] = Form.useForm();

  const sendMessage = () => {
    if (message.length > 0) {
      const messageRef = doc(collection(db, "chat", chatRoom, "messages"));
      const textbox = document.getElementById("textbox");
      setDoc(messageRef, {
        content: message,
        authorId: auth.currentUser.uid,
        createdAt: serverTimestamp(),
        id: messageRef.id,
      });
      form.setFieldsValue({
        message: "",
      });
      setMessage("");
      textbox.focus();
    }
  };

  const onKeyDownFunction = (e) => {
    if (e.key === "Enter") {
      console.log(0);
      sendMessage();
    }
  };

  const onChangeFunction = (e) => {
    if (e.target.value.length > 0) {
      setMessage(e.target.value.trim());
    } else {
      setMessage("");
    }
  };
  return (
    <>
      <div className="FlexRow">
        <Form
          form={form}
          style={{
            width: "100%",
            marginRight: "1rem",
          }}
        >
          <Form.Item name="message" style={{ marginBottom: 3 }}>
            <Input
              placeholder="Message"
              onChange={onChangeFunction}
              onKeyDown={onKeyDownFunction}
              allowClear
            />
          </Form.Item>
        </Form>
        <Button
          type="primary"
          icon={<SendOutlined style={{ marginBottom: 3 }} />}
          style={{ marginBottom: 3 }}
          onClick={sendMessage}
        >
          Send
        </Button>
      </div>
    </>
  );
}

export default SendTextBox;
