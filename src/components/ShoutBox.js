import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { Card, CardContent, Divider, Typography } from '@material-ui/core';
import { apiBaseUrl } from '../config';

const ShoutBox = props => {
  const [chatMessages, setChatMessages] = React.useState();

  React.useEffect(() => {
    getChats();
  }, []);

  async function getChats() {
    const res = await fetch(`${apiBaseUrl}/chatmessages`);
    if (res.ok) {
      let chats = await res.json()
      setChatMessages(chats);
      console.log(chatMessages);
    }
  }

  // async function sendChat()

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
        <form action="">
          <input autoComplete="off" />
          <button type="button">Send</button>
        </form>
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
