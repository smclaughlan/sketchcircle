import * as React from "react";
import ReactMde from "react-mde";
import * as Showdown from "showdown";
import { Button } from '@material-ui/core';
import "react-mde/lib/styles/css/react-mde-all.css";
import { connect } from 'react-redux';
import { sendPostReq, sendUpdatePostReq } from '../redux/sketchbook';

const converter = new Showdown.Converter({
  tables: true,
  simplifiedAutoLink: true,
  strikethrough: true,
  tasklists: true
});

export function MDE(props) {
  const [value, setValue] = React.useState("");
  const [postLoaded, setPostLoaded] = React.useState(false);
  const [selectedTab, setSelectedTab] = React.useState("write");

  const newPost = () => {
    props.sendPostReq(props.token, props.sketchbook_id, value);
  }

  const updatePost = () => {
    props.sendUpdatePostReq(props.token, props.editPost, value, props.sketchbookId);
  }


  if (props.posts && props.posts[props.sketchbookId] && props.posts[props.sketchbookId][props.editPost] && postLoaded == false) {
    setValue(props.posts[props.sketchbookId][props.editPost].body);
    setPostLoaded(true);
    console.log(props.posts[props.sketchbookId]);
    console.log(props.posts[props.sketchbookId][props.editPost]);
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
      {props.editPost ?
        <Button color="primary" onClick={updatePost}>Update Post</Button>
        :
        <Button color="primary" onClick={newPost}>Post</Button>
      }
    </div>
  );
}

const mapStateToProps = state => {
  return {
    currentUserId: state.user.currentUserId,
    token: state.user.token,
    posts: state.sketchbook.posts,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    sendPostReq: (...args) => dispatch(sendPostReq(...args)),
    sendUpdatePostReq: (...args) => dispatch(sendUpdatePostReq(...args)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  MDE
);
