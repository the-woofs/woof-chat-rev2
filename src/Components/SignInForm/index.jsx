import { Form, Input, Button } from "antd";
import { MailOutlined, KeyOutlined } from "@ant-design/icons";

import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const auth = getAuth();

function SignInForm() {
  const onFinish = (values) => {
    console.log("Success:", values);
    const { email, password } = values;

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(`Error: ${errorCode} ${errorMessage}`);
      });
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Form
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 32 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item
        name="email"
        rules={[{ required: true, message: "Please input your email." }]}
      >
        <Input
          placeholder="Email Address"
          prefix={<MailOutlined className="site-form-item-icon" />}
        />
      </Form.Item>

      <Form.Item
        name="password"
        rules={[{ required: true, message: "Please input your password." }]}
      >
        <Input.Password
          placeholder="Password"
          prefix={<KeyOutlined className="site-form-item-icon" />}
        />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 0, span: 32 }}>
        <Button type="primary" htmlType="submit">
          Sign In
        </Button>
      </Form.Item>
    </Form>
  );
}
export default SignInForm;
