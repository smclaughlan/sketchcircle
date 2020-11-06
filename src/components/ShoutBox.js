import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { Card, CardContent, Divider, Typography } from '@material-ui/core';
import { apiBaseUrl } from '../config';

const ShoutBox = props => {
  const [chatMessages, setChatMessages] = React.useState();
  const [sendMsg, setSendMsg] = React.useState();

  React.useEffect(() => {
    getChats();
    console.log(chatMessages);
  }, []);

  async function getChats() {
    const res = await fetch(`${apiBaseUrl}/chatmessages`);
    if (res.ok) {
      let chats = await res.json()
      setChatMessages(chats);
    }
  }

  async function sendChat() {
    const res = await fetch(`${apiBaseUrl}/chatmessages`, {
      method: 'post',
      body: JSON.stringify(sendMsg),
      headers: {
        "x-access-token": `${props.token}`,
        "Content-Type": "application/json"
      }
    });

    if (res.ok) {
      const newPost = await res.json();
      getChats();
    }
  }

  function inputChange(event) {
    setSendMsg({
      body: event.target.value,
    });
  }

  function inputCheck(event) {
    if (event.keyCode === 13) sendChat();
  }

  return (
    <Card style={{ margin: "5px auto", maxWidth: "300px" }} variant="outlined">
      <CardContent>
        <ul id="chatMessages" style={{ listStyleType: "none" }}>
          {chatMessages ?
            Object.keys(chatMessages).map((chId) => {
              return (
                <li>{chatMessages[chId]["username"]}: {chatMessages[chId]["body"]}</li>
              )
            })
            :
            <li>Loading...</li>}
        </ul>
        {props.token ?
          <form action="#">
            <input id="send" autoComplete="off" onChange={inputChange} onKeyUp={inputCheck} />
            <button type="button" onClick={sendChat}>Send</button>
          </form>
          :
          <>
          </>}
      </CardContent>
    </Card>
  )
}

const mapStateToProps = state => {
  return {
    token: state.user.token,
    currentUserId: state.user.currentUserId,
  };
};

const mapDispatchToProps = dispatch => {
  return {

  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  ShoutBox
);
