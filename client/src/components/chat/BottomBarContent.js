import {
  Avatar,
  Tooltip,
  IconButton,
  Box,
  Button,
  styled,
  InputBase,
  useTheme,
} from "@mui/material";
// import AttachFileTwoToneIcon from "@mui/icons-material/AttachFileTwoTone";
import SendTwoToneIcon from "@mui/icons-material/SendTwoTone";
import { connect } from "react-redux";
import { useEffect, useState } from "react";

import { socket, sendMessage } from "../../utils/socketService";
import { saveChatContent } from "../../actions/chatAction";

const MessageInputWrapper = styled(InputBase)(
  ({ theme }) => `
    font-size: ${theme.typography.pxToRem(18)};
    padding: ${theme.spacing(1)};
    width: 100%;
`
);

const Input = styled("input")({
  display: "none",
});

function BottomBarContent(props) {
  const theme = useTheme();
  const name = props.user.name;
  const [text, setText] = useState("");
  const selectedUserName = props.selectedUserName;
  const saveChatContent = props.saveChatContent;

  const user = {
    name: name,
    avatar: "/static/images/avatars/1.jpg",
  };

  let isSending = false;

  const handleEnterKeyPress = (event) => {
    if (event.key === "Enter" && !isSending) {
      isSending = true;
      // Call your function here or perform any action
      onSend();
    }
  };

  useEffect(() => {
    socket.on("message", (data) => {
      console.log(data);
      saveChatContent(data);
    });

    return () => {
      socket.off("message");
    };
  }, [saveChatContent]);

  const onSend = () => {
    if (text === "") {
      return;
    }

    const data = {
      sender: user.name,
      receiver: selectedUserName,
      text: text,
    };

    saveChatContent(data);
    sendMessage(data);
    setText("");
    isSending = false
  };

  return (
    <Box
      sx={{
        background: theme.colors.alpha.white[50],
        display: "flex",
        alignItems: "center",
        p: 2,
      }}
    >
      <Box flexGrow={1} display="flex" alignItems="center">
        <Avatar
          sx={{ display: { xs: "none", sm: "flex" }, mr: 1 }}
          alt={user.name}
          src={user.avatar}
        />
        <MessageInputWrapper
          autoFocus
          placeholder="Write your message here..."
          fullWidth
          onChange={(event) => setText(event.target.value)}
          value={text}
          onKeyDownCapture={handleEnterKeyPress}
        />
      </Box>
      <Box>
        <Tooltip arrow placement="top" title="Choose an emoji">
          <IconButton
            sx={{ fontSize: theme.typography.pxToRem(16) }}
            color="primary"
          >
            😀
          </IconButton>
        </Tooltip>
        <Input accept="image/*" id="messenger-upload-file" type="file" />
        {/* <Tooltip arrow placement="top" title="Attach a file">
          <label htmlFor="messenger-upload-file">
            <IconButton sx={{ mx: 1 }} color="primary" component="span">
              <AttachFileTwoToneIcon fontSize="small" />
            </IconButton>
          </label>
        </Tooltip> */}
        <Button
          startIcon={<SendTwoToneIcon />}
          variant="contained"
          onClick={onSend}
        >
          Send
        </Button>
      </Box>
    </Box>
  );
}

const mapStateToProps = (state) => ({
  user: state.auth.user,
  selectedUserName: state.chat.selectedUserName,
});

const mapDispatchToProps = (dispatch) => ({
  saveChatContent: (data) => dispatch(saveChatContent(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(BottomBarContent);
