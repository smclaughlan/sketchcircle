import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { Button } from '@material-ui/core';
import { getPostsReq } from '../redux/sketchbook';
import Timeline from '@material-ui/lab/Timeline';
import TimelineItem from '@material-ui/lab/TimelineItem';
import TimelineSeparator from '@material-ui/lab/TimelineSeparator';
import TimelineConnector from '@material-ui/lab/TimelineConnector';
import TimelineContent from '@material-ui/lab/TimelineContent';
import TimelineDot from '@material-ui/lab/TimelineDot';
import TimelineOppositeContent from '@material-ui/lab/TimelineOppositeContent';
import Typography from '@material-ui/core/Typography';
import moment from 'moment';

const SketchTimeline = (props) => {

  const sketchbookId = window.location.href.split('/')[4];

  React.useEffect(() => {
    props.getPostsReq(sketchbookId);
  }, []);

  const imgUrls = {}; //key will be date, value will be array of urls
  if (props.posts && props.posts[sketchbookId]) {
    const allSkbPosts = props.posts[sketchbookId];
    const skbPosts = [];
    Object.keys(allSkbPosts).forEach(k => {
      if (allSkbPosts[k].user_id === parseInt(sketchbookId)) {
        skbPosts.push(allSkbPosts[k]);
      }
    })
    const imgRe = /(((https:\/\/www)|(https:\/\/)|(www)|(http:\/\/www)|(http:\/\/))[-a-zA-Z0-9@:%+.~#?&//=_]+)[.](jpg|jpeg|gif|png|bmp|tiff|tga|svg)/;
    Object.keys(skbPosts).forEach(k => {
      const currPost = skbPosts[k];
      const postSplitOnReturns = currPost.body.split('\n').join(' ');
      const sectionsBody = postSplitOnReturns.split(' ');
      let currImgUrls = [];

      sectionsBody.forEach(section => { //for each section, check
        let matches = imgRe.exec(section); //if it's a url

        if (matches) { //if it is
          currImgUrls.push(matches[0]); //push the url here
        }
      });

      if (currImgUrls.length > 0) { //if currImgUrls has anything
        let currDate = moment(currPost.timestamp)
          .toDate()
          .toLocaleString()
          .split(',')[0]; //will use timestamp for key
        if (imgUrls[currDate]) {
          let currDateImgUrls = imgUrls[currDate];
          currDateImgUrls.push(...currImgUrls); //spread to prevent nested arrays
          imgUrls[currDate] = currDateImgUrls;
        } else {
          imgUrls[currDate] = currImgUrls; //add it to imgUrls
        }
      }
    });
  }


  return (
    <div>
      <Timeline align="alternate" style={{ marginTop: "5%" }}>
        <NavLink to={`/sketchbook/${sketchbookId}`}>
          <Button color="primary">Back to sketchbook</Button>
        </NavLink>
        {imgUrls ?
          Object.keys(imgUrls).map(imgKeyDate => {
            const dateForPost = imgKeyDate;
            return (
              <TimelineItem key={dateForPost}>
                <TimelineOppositeContent>
                  <Typography color="textSecondary">{dateForPost}</Typography>
                </TimelineOppositeContent>
                <TimelineSeparator>
                  <TimelineDot />
                  <TimelineConnector />
                </TimelineSeparator>
                <TimelineContent>
                  {imgUrls[dateForPost].map(url => {
                    return (
                      <img key={url} style={{ maxWidth: "500px" }} src={`${url}`} alt="Timeline art" />
                    )
                  })}
                </TimelineContent>
              </TimelineItem>
            )
          })
          :
          <div>
            No images found.
        </div>
        }
        <NavLink to={`/sketchbook/${sketchbookId}`}>
          <Button color="primary">Back to sketchbook</Button>
        </NavLink>
      </Timeline>
    </div>
  )
}


const mapStateToProps = state => {
  return {
    posts: state.sketchbook.posts,
    currentUserId: state.user.currentUserId,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getPostsReq: (...args) => dispatch(getPostsReq(...args)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  SketchTimeline
);
