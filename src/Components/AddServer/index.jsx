import { Button, Divider, Form, Input, Modal } from "antd";
import { useState } from "react";

function AddServer(props) {
  const { visible, setMenuVisible } = props;
  const [name, setName] = useState("");
  const [pfp, setPfp] = useState("");

  const [invite, setInvite] = useState("");

  const [current, setCurrent] = useState(null);

  return (
    <>
      <Modal
        centered
        title="Add Server"
        visible={visible}
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
        <Form>
          <Form.Item label="Server Name">
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Server Name"
            />
          </Form.Item>
          <Form.Item label="Server Invite">
            <Input
              value={invite}
              onChange={(e) => setInvite(e.target.value)}
              placeholder="Server Invite"
            />
          </Form.Item>
          <Form.Item label="Server Icon">
            <Input
              value={pfp}
              onChange={(e) => setPfp(e.target.value)}
              placeholder="Server Icon"
            />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}

export default AddServer;
