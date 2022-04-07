import { Form, Input, Button } from "antd";

import { initializeApp } from "firebase/app";
import { setDoc, doc, getFirestore } from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBGRAK-EfOOggku6WKGxcddXrezCx4qO_0",
  authDomain: "woof-chat-r2.firebaseapp.com",
  projectId: "woof-chat-r2",
  storageBucket: "woof-chat-r2.appspot.com",
  messagingSenderId: "416651921911",
  appId: "1:416651921911:web:5f272c3687a4ae03adc6f2",
};

initializeApp(firebaseConfig);

const auth = getAuth();
const db = getFirestore();

function SignUpForm() {
  const [form] = Form.useForm();

  const checkPasswords = (pass1, pass2) => {
    if (pass1 !== pass2) {
      return false;
    }
    return true;
  };

  const onFinish = (values) => {
    if (checkPasswords(values.password, values.confirm)) {
      console.log(values);

      createUserWithEmailAndPassword(auth, values.email, values.password)
        .then((userCredential) => {
          const user = userCredential.user;
          setDoc(
            doc(db, "u", user.uid),
            {
              name: values.username,
            },
            { merge: true }
          );
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(`Error: ${errorCode} - ${errorMessage}`);
          // ..
        });
    } else {
      form.setFieldsValue({
        password: "",
        confirm: "",
      });
      console.log("Passwords do not match");
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Form
      form={form}
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item
        label="Username"
        name="username"
        rules={[{ required: true, message: "Please provide a username!" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Email Address"
        name="email"
        rules={[
          { required: true, message: "Please provide your email address!" },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: "Please provide a password!" }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        label="Repeat Password"
        name="confirm"
        rules={[{ required: true, message: "Please repeat your password!" }]}
      >
        <Input.Password />
      </Form.Item>

      <br />
      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          Sign Up
        </Button>
      </Form.Item>
    </Form>
  );
}

export default SignUpForm;
