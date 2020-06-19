import * as React from "react";
import ReactMde from "react-mde";
import * as Showdown from "showdown";
import { Button } from '@material-ui/core';
import "react-mde/lib/styles/css/react-mde-all.css";
import { connect } from 'react-redux';
import { sendPostReq } from '../redux/sketchbook';

const converter = new Showdown.Converter({
  tables: true,
  simplifiedAutoLink: true,
  strikethrough: true,
  tasklists: true
});

export function MDE(props) {
  const [value, setValue] = React.useState("**Hello world!!!**");
  const [selectedTab, setSelectedTab] = React.useState("write");

  const newPost = () => {
    // console.log(value);
    // console.log(props.currentUserId);
    // console.log(props.sketchbook_id);
    props.sendPostReq(props.token, props.sketchbook_id, value);
  }

  return (
    <div className="container">
      <ReactMde
        value={value}
        onChange={setValue}
        selectedTab={selectedTab}
        onTabChange={setSelectedTab}
        generateMarkdownPreview={markdown =>
          Promise.resolve(converter.makeHtml(markdown))
        }
      />
      <Button color="primary" onClick={newPost}>Post</Button>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    currentUserId: state.user.currentUserId,
    token: state.user.token,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    sendPostReq: (...args) => dispatch(sendPostReq(...args)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  MDE
);
