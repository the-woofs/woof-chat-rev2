import "./index.css";

import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { AutoComplete, Button, Layout } from "antd";

import MessageTextBox from "../../Components/MessageTextBox";
import ChatContent from "../../Components/ChatContent";
import ChatMenu from "../../Components/ChatMenu";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import UserInfo from "../../Components/UserInfo";

const { Header, Footer, Sider, Content } = Layout;

function Chat() {
  const { chatRoom } = useParams();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [width, setWidth] = useState(200);

  useEffect(() => {
    if (isCollapsed) {
      setWidth(0);
    } else setWidth(200);
  }, [isCollapsed]);

  return (
    <>
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
          onBreakpoint={(broken) => {
            console.log(broken);
          }}
          onCollapse={(collapsed, type) => {
            console.log(collapsed, type);
            setIsCollapsed(collapsed);
          }}
          collapsed={isCollapsed}
          trigger={null}
        >
          <Header className="Header">
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
            }}
            className="ResponsivePadding"
          >
            <UserInfo />
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
                  icon={<MenuUnfoldOutlined />}
                />
              )}
            </span>{" "}
            <h3>{chatRoom}</h3>
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
            }}
            className="ResponsivePadding"
          >
            <MessageTextBox chatRoom={chatRoom} />
          </Footer>
        </Layout>
      </Layout>
    </>
  );
}

export default Chat;
