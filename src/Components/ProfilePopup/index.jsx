import { Avatar, Card, Dropdown, Skeleton } from "antd";
import Meta from "antd/lib/card/Meta";
import { collection, doc, getFirestore } from "firebase/firestore";
import { useDocumentData } from "react-firebase-hooks/firestore";

import ReactMarkdown from "react-markdown";

const db = getFirestore();

function ProfilePopup(props) {
  const { children, userId } = props;
  const [user, loading] = useDocumentData(doc(collection(db, "u"), userId));

  return (
    <>
      <Dropdown
        trigger={["click"]}
        placement="rightTop"
        overlay={
          <>
            {loading && (
              <Skeleton loading={loading}>
                <Card
                  style={{ width: 300 }}
                  cover={
                    <img
                      alt="eee"
                      style={{
                        crop: "cover",
                        objectFit: "cover",
                        width: "100%",
                        height: "100px",
                      }}
                      src={`https://picsum.photos/seed/skeleton/500/300`}
                    />
                  }
                >
                  <Meta
                    avatar={
                      <Avatar size={50} src="https://picsum.photos/200" />
                    }
                    title="eee"
                    description="eee"
                  />
                </Card>
              </Skeleton>
            )}
            {user && (
              <Card
                style={{ width: 300 }}
                cover={
                  <>
                    {!user.cover && user.pfp && (
                      <img
                        alt={user.name}
                        style={{
                          crop: "cover",
                          objectFit: "cover",
                          width: "100%",
                          height: "100px",
                        }}
                        src={user.pfp}
                      />
                    )}
                    {user.cover && (
                      <img
                        alt={user.name}
                        style={{
                          crop: "cover",
                          objectFit: "cover",
                          width: "100%",
                          height: "100px",
                        }}
                        src={user.cover}
                      />
                    )}
                    {!user.pfp && !user.cover && (
                      <img
                        alt={user.name}
                        style={{
                          crop: "cover",
                          objectFit: "cover",
                          width: "100%",
                          height: "100px",
                        }}
                        src={`https://picsum.photos/seed/${user.name}/500/300`}
                      />
                    )}
                  </>
                }
              >
                <Meta
                  avatar={
                    <>
                      {user.pfp && <Avatar size={50} src={user.pfp} />}

                      {!user.pfp && (
                        <Avatar
                          size={50}
                          src={`https://avatars.dicebear.com/api/jdenticon/${userId}.svg`}
                        />
                      )}
                    </>
                  }
                  title={user.name}
                  description={<ReactMarkdown>{user.desc}</ReactMarkdown>}
                />
              </Card>
            )}
          </>
        }
      >
        {children}
      </Dropdown>
    </>
  );
}

export default ProfilePopup;
