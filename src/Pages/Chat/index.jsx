import "./index.css";

import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Button, Dropdown, Layout, Menu, notification } from "antd";

import MessageTextBox from "../../Components/MessageTextBox";
import ChatContent from "../../Components/ChatContent";
import ChatMenu from "../../Components/ChatMenu";
import ChatRoomName from "../../Components/ChatRoomName";
import EditServer from "../../Components/EditServer";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  DownOutlined,
  UserAddOutlined,
  EditOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import UserInfo from "../../Components/UserInfo";
import Profile from "../../Components/Profile";

const { Header, Footer, Sider, Content } = Layout;

function Chat() {
  const { chatRoom } = useParams();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [width, setWidth] = useState(200);
  const [profile, setProfile] = useState(false);
  
  const [editSrv, setEditSrv] = useState(false);

  useEffect(() => {
    if (isCollapsed) {
      setWidth(0);
    } else setWidth(200);
  }, [isCollapsed]);

  return (
    <div className="Chat">
      {
        editSrv && <EditServer visible={editSrv} setVisible={setEditSrv} serverId={ chatRoom } /> 
      }
      <Profile visible={profile} setVisible={setProfile} />
      <Layout hasSider>
        <Sider
          style={{
            height: "100vh",
            overflow: "auto",
            position: "absolute",
            zIndex: 1,
            top: 0,
            left: 0,
            bottom: 0,
          }}
          breakpoint="lg"
          collapsedWidth="0"
          onCollapse={(collapsed, type) => {
            setIsCollapsed(collapsed);
          }}
          collapsed={isCollapsed}
          trigger={null}
        >
          <Header
            style={{
              borderRight: width === 200 ? "1px solid #434343" : "none",
              backgroundColor: "#141414",
            }}
            className="Header"
          >
            {isOpen && (
              <Button
                onClick={() => {
                  setIsCollapsed(true);
                }}
                icon={<MenuFoldOutlined />}
              />
            )}
          </Header>
          <ChatMenu />
          <Footer
            style={{
              position: "fixed",
              bottom: 0,
              zIndex: 1,
              height: 80,
              padding: "1rem",
              width: width,
              overflow: "hidden",
              backgroundColor: "#141414",
              borderRight: width === 200 ? "1px solid #434343" : "none",
              borderTop: "1px solid #434343",
            }}
            className="ResponsivePadding"
          >
            <UserInfo setVisible={setProfile} />
          </Footer>
        </Sider>
        <Layout>
          <Header
            className="Header"
            style={{
              position: "fixed",
              top: 0,
              left: width,
              right: 0,
              zIndex: 1,
              overflow: "hidden",
              backgroundColor: "#262626",
            }}
          >
            <span>
              {isCollapsed && (
                <Button
                  onClick={() => {
                    setIsCollapsed(false);
                    setIsOpen(true);
                  }}
                  style={{
                    marginRight: "1rem",
                  }}
                  icon={<MenuUnfoldOutlined />}
                />
              )}

              <Dropdown
                overlay={
                  <Menu>
                    <Menu.Item
                      onClick={() => {
                        notification["info"]({
                          message: "Server Invite",
                          description: `The invitation code of this server is "${chatRoom}".`,
                        });
                      }}
                      icon={<UserAddOutlined />}
                    >
                      Get Invite
                    </Menu.Item>
                    <Menu.Item icon={<EditOutlined />} onClick={
                      () => {
                        setEditSrv(true);
                      }
                    }>Edit Server</Menu.Item>
                    <Menu.Item icon={<CloseOutlined />}>Leave Server</Menu.Item>
                  </Menu>
                }
              >
                <span>
                  <strong>
                    <ChatRoomName chatRoom={chatRoom} />
                    {"  "}
                    <DownOutlined />
                  </strong>
                </span>
              </Dropdown>
            </span>
          </Header>
          <Content
            style={{
              backgroundColor: "#141414",
              position: "fixed",
              top: 64,
              bottom: 80,
              left: width,
              right: 0,
              overflow: "auto",
            }}
            className="ResponsivePadding Content"
          >
            <ChatContent chatRoom={chatRoom} />
          </Content>
          <Footer
            style={{
              position: "fixed",
              bottom: 0,
              zIndex: 1,
              right: 0,
              left: width,
              height: 80,
              overflow: "hidden",
              backgroundColor: "#141414",
              borderTop: "1px solid #434343",
            }}
            className="ResponsivePadding"
          >
            <MessageTextBox chatRoom={chatRoom} />
          </Footer>
        </Layout>
      </Layout>
    </div>
  );
}

export default Chat;
