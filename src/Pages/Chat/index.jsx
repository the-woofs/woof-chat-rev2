import React from "react";
import { useParams } from "react-router-dom";
import "./index.css";
import { Layout } from "antd";

import Message from "../../Components/Message";
import MessageTextBox from "../../Components/MessageTextBox";

const { Header, Footer, Sider, Content } = Layout;

function Chat() {
  const { chatRoom } = useParams();

  return (
    <>
      <Layout hasSider>
        <Sider
          style={{
            overflow: "auto",
            minHeight: "100vh",
            backgroundColor: "#262626",
          }}
          breakpoint="lg"
          collapsedWidth="0"
          onBreakpoint={(broken) => {
            console.log(broken);
          }}
          onCollapse={(collapsed, type) => {
            console.log(collapsed, type);
          }}
        >
          <Header
            style={{ position: "sticky", top: 0, backgroundColor: "#262626" }}
          />
        </Sider>
        <Layout>
          <Header style={{ position: "sticky", top: 0 }}>
            <h3>{chatRoom}</h3>
          </Header>
          <Content
            style={{
              backgroundColor: "#141414",
              padding: "24px 50px",
            }}
          >
            <Message
              author="ACuteWoof"
              message="Hiii"
              timestamp="Today at 23:09"
              authorPfp="https://images-ext-2.discordapp.net/external/VVi1Aq8lH-BMI5wHzniBv78QlDjhXoWkAXxqjriULMk/%3Fsize%3D1024/https/cdn.discordapp.com/avatars/618114750827462660/7c8e61ce3c2019cabc761e2e86446717.png"
              authorId="1"
            />
            <Message
              author="Lazlo"
              message="Sup Woof"
              timestamp="Today at 23:10"
              authorPfp="https://images-ext-2.discordapp.net/external/WOWcNzUcUsctB1JTMxd98gdWAjOixCSKjbPNB-RvCkQ/%3Fsize%3D1024/https/cdn.discordapp.com/avatars/853162603098537985/63f372f86e2bd2bb9a0a268e88d3cb98.png"
              authorId="1"
            />
            <Message
              author="Husky"
              message="Hey wanna play Hypixel?"
              timestamp="Today at 23:10"
              authorPfp="https://images-ext-1.discordapp.net/external/ReG7ydrs5vuQTTU70QWBEVhQQSAPqw1uKeNFesc7gzU/%3Fsize%3D1024/https/cdn.discordapp.com/avatars/749833732042653708/08a59ff07ef02d847ffcc3cd53b6482a.gif"
              authorId="1"
            />
          </Content>
          <Footer
            className="Footer"
            style={{
              position: "sticky",
              bottom: 0,
              backgroundColor: "#141414",
            }}
          >
            <MessageTextBox />
          </Footer>
        </Layout>
      </Layout>
    </>
  );
}

export default Chat;
