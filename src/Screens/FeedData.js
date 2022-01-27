import React from "react";
import PropTypes from "prop-types";
import { Comment } from "tabler-react";
import DropzoneContainer from '../components/SharePostDropzone';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import Icon from '@material-ui/core/Icon';
import EmojiComp from './EmojiComp';
import { parseToekJwt } from '../common-methods';
import EditDeleteDropdown from './EditDeleteDropdown';
import UserInfoPopup from './UserInfoPopup';
import moment from "moment";
import LikeCompPopup from './LikeCompPopup';
import ShareComp from './ShareComp';
import Microlink from '@microlink/react';
import Toaster from '../redux/Toaster';
// import styled from 'styled-components';

// const MyCustomCard = styled(Microlink)`
//   max-width: 330;
// `

const emojiSet = ['👍', '❤', '😆', '😮', '😢', '😡'];

class FeedData extends React.Component {
  state = {
    date: new Date(),
    isAdd: false,
    files: [],
    textData: "",
    photoIndex: 0,
    isOpen: false,
    images: [],
    selectedDates: [],
    isModalOpen: false
  }

  onThumbnailChange = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      let files = [];
      files.push({ name: file.name, preview: event.target.result });
      this.setState({
        files: files,
        editCommentId: null,
        readMoreId: null,
        isReadMore: false
      });
    };
  }

  onThumbnailRemove = (files) => {
    this.setState({ files });
  }

  onShareSubmit = (stateName) => {
    let finalImages = "";
    this.state.files && this.state.files.length && this.state.files.map(data => {
      finalImages += data.preview;
    });
    if (!this.state.textData && !finalImages) {
      Toaster('Post text or image is required', 'error');
      return;
    }
    if (stateName === 'isAdd') {
      let request = {
        "text": this.state.textData,
        "image": finalImages
      }
      this.setState({ isAdd: '' }, () => this.props.onShare(request));
    }
    else if (stateName === 'isPost') {
      let request = {
        "text": this.state.textData,
        "image": finalImages
      }
      this.setState({ isPostEdit: '' }, () => this.props.onShare(request, this.state.editPostId));
    }
    else if (stateName === 'isComment') {
      let request = {
        "comment": this.state.textData,
        "feedId": this.state.feedId,
        "image": finalImages
      }
      this.props.onComment(request, this.state.editCommentId);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.shareFeedResponse && nextProps.shareFeedResponse !== this.props.shareFeedResponse) {
      this.setState({ isAdd: false, files: [], textData: '' })
    }
    if (nextProps.feedData && nextProps.feedData !== this.props.feedData) {
      this.setState({ isAdd: false, isComment: false, files: [], textData: '', isModalOpen: false })
    }
  }

  onImageClick = (images, photoIndex) => {
    this.setState({ isOpen: true, photoIndex, images })
  }

  feedImages = (discussion, urlData) => {
    // let imageArray = discussion.image.split(',');
    // if (imageArray.length > 6)
    //   return <div>
    //     {imageArray.map((data, index) => {
    //       if (data) {
    //         if (index < 5)
    //           return <img className="rounded" src={data} alt="No Image" width="100%" style={{ margin: 5, cursor: 'pointer' }} onClick={() => this.onImageClick(imageArray, index)} />
    //         else
    //           return <span style={{ position: 'absolute', right: '13%' }}><span style={{ fontSize: 40, position: 'relative', left: '50%' }}>+2</span><img className="moreImage" src={data} alt="No Image" width="150px" height="150px" style={{ margin: 5, opacity: 0.2, cursor: 'pointer' }} onClick={() => this.onImageClick(imageArray, index)} /></span>
    //       }
    //     })}
    //   </div>
    // else
    return <div>
      {urlData && <Microlink url={urlData} />}
      {discussion.image && <img className="rounded" src={discussion.image} alt="No Image" width={this.props.screenSize > 500 ? '50%' : '100%'} style={{ margin: 5, cursor: 'pointer' }} onClick={() => this.onImageClick([discussion.image], 0)} />}
    </div>
  }

  handleKeyDown(e) {
    e.target.style.height = 'inherit';
    e.target.style.height = `${e.target.scrollHeight}px`;
    // In case you have a limitation
    e.target.style.height = `${Math.min(e.target.scrollHeight, 300)}px`;
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside);
    document.addEventListener('keydown', this.handleKeyPress);
  }

  handleKeyPress = (e) => {
    if (e.key === 'Enter' && e.currentTarget.getElementById('feed')) {
      if (this.state.isModalOpen) {
        this.onShareFeed(this.state.shareText, this.state.shareId);
      } else {
        const stateName = this.state.isAdd ? 'isAdd' : (this.state.isComment ? 'isComment' : (this.state.isPostEdit ? 'isPost' : null));
        stateName && this.onShareSubmit(stateName);
      }
    }
  }

  setEmojiRef = (node) => {
    this.emojiRef = node;
  }

  setLikeEmojiRef = (node) => {
    this.likeEmojiRef = node;
  }

  handleClickOutside = (event) => {
    if (this.emojiRef && !this.emojiRef.contains(event.target) && this.state.isReaction)
      this.setState({ isReaction: false });
    if (this.likeEmojiRef && !this.likeEmojiRef.contains(event.target) && this.state.isLikeComp)
      this.setState({ isLikeComp: false });
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
  }

  onEditClick = (data) => {
    this.setState({ isEdit: true, textData: data.comment });
    let files = [];
    data.image && files.push({ name: 'EditCommentFile', preview: data.image });
    this.setState({
      files: files,
      editCommentId: data._id
    });
  }

  onEditPostClick = (data) => {
    this.setState({ isPostEdit: true, textData: data.text });
    let files = [];
    data.image && files.push({ name: 'EditPostFile', preview: data.image });
    this.setState({
      files: files,
      editPostId: data._id
    });
  }

  CommentPostShare = (stateName, discussion) => {
    if (discussion && stateName !== 'isPost') {
      const commentId = discussion._id;
      let commentData = [];
      if (this.state.readMoreId && this.state.isReadMore === commentId && discussion.comments.length > 3) {
        commentData = discussion.comments;
      }
      else if (!this.state.readMoreId && discussion.comments.length > 3) {
        commentData = discussion.comments.slice(0, 3);
      }
      else {
        commentData = discussion.comments;
      }
      // const commentData = this.state.readMoreId ? (this.state.isReadMore === commentId ? discussion.comments : (discussion.comments.length > 3 ? discussion.comments.splice(0, 3) : discussion.comments)) : discussion.comments;
      return <div style={{ width: '100%', backgroundColor: 'white', padding: 10 }}>
        {commentData.map((commentItem, idx) => {
          let commentDate = new Date(commentItem.updatedAt);
          const isOwner = commentItem.commentBy && parseToekJwt() && parseToekJwt()._id === commentItem.commentBy._id;
          return <Comment.List key={idx}>
            <Comment
              avatarURL={commentItem.commentBy && commentItem.commentBy.image ? commentItem.commentBy.image : "demo/faces/female/user.png"}
              date={isOwner ? <EditDeleteDropdown onEditPostClick={() => this.onEditClick(commentItem)} onDeletePostClick={() => this.props.deleteComment(commentItem._id)} /> : <Icon style={{ color: '#ff0000',cursor:'pointer',fontSize:18 }} title="Report this comment" onClick={() => this.reportPost(commentItem._id)}>flag</Icon>}
              name={<div style={{ display: 'flex', flexDirection: 'column' }}>
                <UserInfoPopup info={commentItem.commentBy} status={commentItem.friendRequestStatus} userInfo={commentItem.user} />
                <div style={{ fontSize: 12, color: 'grey' }}>{moment(commentDate).fromNow()}</div>
              </div>
              }
              text={commentItem.comment ? commentItem.comment : ''}
              replies={commentItem.image ? this.feedImages(commentItem) : ""}
            />
          </Comment.List>
        })}
        {discussion.comments.length > 3 && (this.state.readMoreId ? <div onClick={() => this.setState({ readMoreId: null })} style={{ cursor: 'pointer', textAlign: 'right', paddingRight: 15 }}>Read Less...</div> : <div onClick={() => this.setState({ readMoreId: commentId })} style={{ cursor: 'pointer', color: '#4267b2', textAlign: 'right', paddingRight: 15 }}>Read More...</div>)}
        <textarea rows="1" placeholder="Comment Here..." style={{ marginTop: 5 }} onKeyDown={this.handleKeyDown} className="postInput" type="text" value={this.state.textData} onChange={(e) => this.setState({ textData: e.target.value })} />
        <div ref={this.setEmojiRef} style={!this.state.isReaction ? { display: 'none' } : { position: 'absolute', zIndex: 100000 }}><EmojiComp onEmojiSelect={this.onEmojiSelect} /></div>
        <DropzoneContainer onReaction={this.onReaction} value={this.state.textData} files={this.state.files} onThumbnailChange={this.onThumbnailChange} onThumbnailRemove={this.onThumbnailRemove} onCancelClick={() => this.setState({ [stateName]: false, files: [], textData: '', isEdit: false, isPostEdit: false })} onSubmit={() => this.onShareSubmit(stateName)} />
      </div>
    }
    else if (discussion && stateName === 'isPost') {
      return <div style={{ width: '100%', backgroundColor: 'white', padding: 10 }}>
        <textarea rows="1" placeholder="Post career questions, help each other, add video links…" style={{ marginTop: 5 }} onKeyDown={this.handleKeyDown} className="postInput" type="text" value={this.state.textData} onChange={(e) => this.setState({ textData: e.target.value })} />
        <div ref={this.setEmojiRef} style={!this.state.isReaction ? { display: 'none' } : { position: 'absolute', zIndex: 100000 }}><EmojiComp onEmojiSelect={this.onEmojiSelect} /></div>
        <DropzoneContainer isShared={discussion.sharedOrigin ? true : false} onReaction={this.onReaction} value={this.state.textData} files={this.state.files} onThumbnailChange={this.onThumbnailChange} onThumbnailRemove={this.onThumbnailRemove} onCancelClick={() => this.setState({ [stateName]: false, files: [], textData: '', isEdit: false, isPostEdit: false })} onSubmit={() => this.onShareSubmit(stateName)} />
      </div>
    }
    return <div style={{ width: '100%', backgroundColor: 'white', padding: 10 }}>
      <textarea rows="1" placeholder="Post career questions, help each other, add video links…" onKeyDown={this.handleKeyDown} className="postInput" type="text" value={this.state.textData} onChange={(e) => this.setState({ textData: e.target.value })} />
      <div ref={this.setEmojiRef} style={!this.state.isReaction ? { display: 'none' } : { position: 'absolute', zIndex: 100000 }}><EmojiComp onEmojiSelect={this.onEmojiSelect} /></div>
      <DropzoneContainer onReaction={this.onReaction} files={this.state.files} onThumbnailChange={this.onThumbnailChange} onThumbnailRemove={this.onThumbnailRemove} onCancelClick={() => this.setState({ [stateName]: false, files: [], textData: '', isEdit: false, isPostEdit: false })} onSubmit={() => this.onShareSubmit(stateName)} />
    </div>
  }

  onReaction = () => {
    this.setState({ isReaction: true });
  }

  onEmojiSelect = (symbol) => {
    this.setState({ textData: this.state.textData + ' ' + symbol });
  }

  onSelectEmoji = (emoji) => {
    this.setState({ isLikeComp: false });
    this.props.onLike(this.state.likeId, { "emoji": emoji })
  }

  likeComp = () => {
    return <div ref={this.setLikeEmojiRef} style={{
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',
      width: this.props.screenSize > 500 ? '50%' : '100%',
      alignSelf: 'center',
      backgroundColor: 'white',
      border: '1px solid #f1f1f1',
      borderRadius: 20,
      position: 'absolute',
      bottom: 0,
      boxShadow: '0 0 10px #404040'
    }}>
      {emojiSet.map((data, index) => {
        return <div style={{ fontSize: 24, padding: 5, cursor: 'pointer', color: 'red' }} onClick={() => this.onSelectEmoji(data)}>{data}</div>
      })}
    </div>
  }

  getSharedPost = (discussion) => {
    const date = new Date(discussion.updatedAt);
    const urlData = this.urlify(discussion.text);
    const textData = discussion.text && discussion.text.replace(/(?:https?|ftp):\/\/[\n\S]+/g, '');
    return <div style={{ border: '1px solid #f1f1f1' }}><Comment
      avatarURL={discussion.user && discussion.user.image ? discussion.user.image : "demo/faces/female/user.png"}
      // date={isOwner && <EditDeleteDropdown onEditPostClick={() => this.onEditPostClick(discussion)} onDeletePostClick={() => this.props.deletePost(discussion._id)} />}
      name={<div style={{ display: 'flex', flexDirection: 'column', width: 'fit-content' }}>
        <UserInfoPopup info={discussion.user} status={discussion.friendRequestStatus} userInfo={discussion.user} />
        <div style={{ fontSize: 12, color: 'grey' }}>{moment(date).fromNow()}</div>
      </div>
      }
      text={textData}
      replies={discussion.image ? this.feedImages(discussion, urlData) : (urlData ? <Microlink url={urlData} /> : '')}
    /></div>
  }

  urlify = (text) => {
    var urlRegex = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
    let urlValue = "";
    if (text) {
      text.replace(urlRegex, function (url) {
        urlValue = url;
      })
    } else {
      urlValue = text;
    };
    return urlValue;
  }

  onShareFeed = (text, id) => {
    this.props.onShareFeed(text, id);
  }

  reportPost = (id, isPost) => {
    if (isPost) {
      var r = window.confirm("Are you sure , you want to report this post!");
      if (r == true) {
        this.props.reportPost(id,isPost)
      }
    } else {
      var r = window.confirm("Are you sure , you want to report this comment!");
      if (r == true) {
        this.props.reportPost(id)
      }
    }
  }

  render() {
    const { title, feedData, loading, screenSize } = this.props;
    const { photoIndex, isOpen, images, isModalOpen, shareItem, isReaction } = this.state;
    return (
      <div className="p-0" id="feed">
        {isModalOpen && <ShareComp onTextChange={(text, id) => this.setState({ shareText: text, shareId: id })} setEmojiRef={this.setEmojiRef} isReaction={isReaction} isModalOpen={isModalOpen} shareItem={shareItem} onShare={this.onShareFeed} onCancelShare={() => this.setState({ isModalOpen: false, shareItem: null })} />}
        {isOpen && (
          <Lightbox
            mainSrc={images[photoIndex]}
            onCloseRequest={() => this.setState({ isOpen: false })}
          />
        )}
        {!this.state.isAdd ? <div onClick={() => this.setState({ isAdd: true, isComment: false, textData: '' })} className="postInput">
          <span style={{ color: '#EAEAEA' }}>Click here to share something ...</span>
          <Icon style={{ color: '#4267b2', marginRight: 5 }}>camera</Icon>
        </div> : this.CommentPostShare('isAdd')}
        {/* Small Stats Blocks */}
        {feedData && feedData.data && feedData.data.map((discussion, idx) => {
          const isOwner = parseToekJwt() && parseToekJwt()._id === discussion.user._id;
          const date = new Date(discussion.updatedAt);
          const emoji = discussion.likedByYou ? discussion.likedByYou.emoji : '';
          // const name = discussion && discussion.user && (discussion.user.name && discussion.user.name !== " " ? discussion.user.name : (discussion.user.email ? discussion.user.email : 'User'));
          let likeEmojis = '';
          discussion.likes && discussion.likes.map(data => {
            if (data.emoji && !likeEmojis.includes(data.emoji)) {
              likeEmojis = likeEmojis + '' + data.emoji;
            }
          });
          const urlData = this.urlify(discussion.text);
          const textData = discussion.text && discussion.text.replace(/(?:https?|ftp):\/\/[\n\S]+/g, '');
          return <div className="dashboard-feed-card"><Comment.List key={idx}>
            <Comment
              avatarURL={discussion.user && discussion.user.image ? discussion.user.image : "demo/faces/female/user.png"}
              date={isOwner ? <EditDeleteDropdown onEditPostClick={() => this.onEditPostClick(discussion)} onDeletePostClick={() => this.props.deletePost(discussion._id)} />:<Icon style={{ color: '#ff0000',cursor:'pointer',fontSize:18 }} title="Report this post" onClick={() => this.reportPost(discussion._id,true)}>flag</Icon>}
              name={<div style={{ display: 'flex', flexDirection: 'column', width: 'fit-content' }}>
                <UserInfoPopup info={discussion.user} isOwner={isOwner} status={discussion.friendRequestStatus} userInfo={discussion.user} />
                <div style={{ fontSize: 12, color: 'grey' }}>{moment(date).fromNow()}</div>
              </div>
              }
              text={textData}
              replies={discussion.sharedOrigin ? this.getSharedPost(discussion.sharedOrigin) : discussion.image ? this.feedImages(discussion, urlData) : (urlData ? <Microlink url={urlData} /> : '')}
            />
            <div style={{ padding: 5, display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
              <span style={{ cursor: 'pointer', width: '25%', textAlign: 'right', fontSize: 12 }}>{discussion.comments && discussion.comments.length ? discussion.comments.length : ''}</span>
              <span style={{ cursor: 'pointer', width: '50%', textAlign: 'center', fontSize: 12 }}>{discussion.likes && discussion.likes.length ? <LikeCompPopup info={discussion.likes} likeEmojis={likeEmojis} /> : null}</span>
              <span style={{ cursor: 'pointer', width: '25%', textAlign: 'left', fontSize: 12 }}> {discussion.shareCount ? discussion.shareCount : ''}</span>
            </div>
            <div style={{ padding: 5, display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center' }}>
              <span style={{ cursor: 'pointer', alignItems: 'center', display: 'flex' }} onClick={() => this.setState({ isAdd: false, isComment: discussion._id === this.state.feedId ? false : true, feedId: discussion._id === this.state.feedId ? null : discussion._id, textData: '' })}><Icon style={{ fontSize: 15 }}>comment</Icon> Comment</span>
              <span style={emoji ? { cursor: 'pointer', color: '#4267b2', alignItems: 'center', display: 'flex' } : { cursor: 'pointer', alignItems: 'center', display: 'flex' }} onClick={() => this.setState({ feedId: discussion._id, isLikeComp: !this.state.isLikeComp, likeId: discussion._id })}>{emoji ? <span style={{ color: 'red' }}>{emoji}</span> : <Icon style={{ fontSize: 15 }}>thumb_up_alt</Icon>} Like</span>
              <span style={{ cursor: 'pointer', alignItems: 'center', display: 'flex' }} disabled={this.props.isProfileView} onClick={() => this.setState({ isModalOpen: true, shareItem: discussion })}><Icon style={{ fontSize: 15 }}>share</Icon> Share</span>
            </div>
            {this.state.isLikeComp && discussion._id === this.state.feedId && this.likeComp()}
            {this.state.isComment && discussion._id === this.state.feedId && this.CommentPostShare('isComment', discussion)}
            {this.state.isPostEdit && discussion._id === this.state.editPostId && this.CommentPostShare('isPost', discussion)}
          </Comment.List>
          </div>
        })}
      </div>
    );
  }
}

FeedData.propTypes = {
  title: PropTypes.string
};

FeedData.defaultProps = {
  title: "Calender Interview Schedules"
};

export default FeedData;
