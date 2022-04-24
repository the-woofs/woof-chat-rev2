import { Form, Input, Modal, notification } from "antd";
import { collection, doc, getDoc, getFirestore, setDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import ServerPfpEdit from "../ServerPfpEdit";

const db = getFirestore();

function EditServer(props) {
    const { serverId, visible, setVisible } = props;
    const [pfp, setPfp] = useState("");
    const [name, setName] = useState("");

    useEffect(() => {
        const docRef = doc(collection(db, "chat"), serverId);
        getDoc(docRef).then((docu) => {
            if (docu.exists) {
                const data = docu.data();
                setName(data.name);
                setPfp(data.pfp);
            }
        });
    }, [serverId]);

    return <>
        <Modal
            title="Edit Server" 
            visible={visible}
            onOk={async () => {
                const docRef = doc(collection(db, "chat"), serverId);
                const document = await getDoc(docRef);
                if (!document.exists) {
                    notification["error"]({
                        message: "Error",
                        description: "Server does not exist!",
                    });
                }
                else {
                    setDoc(docRef, {
                        name: name,
                        pfp: pfp,
                    });
                }
                setVisible(false);
            }}
            onCancel={() => setVisible(false)}
            okText="Save"
            cancelText="Cancel"
        >
            <Form layout="vertical">
                <Form.Item label="Avatar">
                    <ServerPfpEdit serverId={serverId} setPfp={setPfp} pfp={pfp} />
                </Form.Item>
                <Form.Item label="Name">
                    <Input value={name} defaultValue={name} onChange={(e) => setName(e.target.value)} />
                </Form.Item>
            </Form>
            </Modal>
    </>
}

export default EditServer;