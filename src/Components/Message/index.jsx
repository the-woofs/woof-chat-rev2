import { Comment } from "antd";

import { grey } from "@ant-design/colors";

function Message(props) {
  const { author, message, timestamp, authorPfp, authorId } = props;
  return (
    <Comment
      author={
        <h1
          style={{
            color: grey[0],
          }}
        >
          {author}
        </h1>
      }
      avatar={authorPfp}
      content={message}
      datetime={timestamp}
    />
  );
}

export default Message;
