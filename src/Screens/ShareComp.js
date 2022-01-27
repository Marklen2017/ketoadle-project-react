import React, { useState } from 'react';
import { Comment, Button } from 'tabler-react';
import EmojiComp from './EmojiComp';
import moment from "moment";
import Modal from 'react-modal';
import UserInfoPopup from './UserInfoPopup';

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: '60%',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)'
    }
};

const ShareComp = ({ shareItem, onShare, onCancelShare, isModalOpen, setEmojiRef, isReaction, onTextChange }) => {
    const [text, setText] = useState(null);
    const [isOpen, setIsOpen] = useState(isModalOpen);
    const date = new Date(shareItem.updatedAt);

    const closeModal = () => {
        onCancelShare();
        setIsOpen(false);
    }

    const onEmojiSelect = (symbol) => {
        setText(text + ' ' + symbol);
      }

    const onTextChangeMethod=(e,id)=>{
        onTextChange(e.target.value,id)
        setText(e.target.value);
    }  

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={closeModal}
            style={customStyles}
            contentLabel="Schedule Interview"
        >
            <div>
                <textarea rows="1" placeholder="Write Something..." style={{ marginTop: 5 }} className="postInput" type="text" value={text} onChange={(e) => onTextChangeMethod(e,shareItem._id)} />
                <Comment.List>
                    <Comment
                        avatarURL={shareItem.user && shareItem.user.image ? shareItem.user.image : "demo/faces/female/user.png"}
                        name={<div style={{ display: 'flex', flexDirection: 'column' }}>
                            <UserInfoPopup info={shareItem.user} />
                            <div style={{ fontSize: 12, color: 'grey' }}>{moment(date).fromNow()}</div>
                        </div>
                        }
                        text={shareItem.text ? shareItem.text : ''}
                        replies={shareItem.image ? shareItem.image : ""}
                    />
                </Comment.List>
                <div>
                    <div ref={setEmojiRef} style={!isReaction ? { display: 'none' } : { position: 'absolute', zIndex: 100000 }}>
                        <EmojiComp onEmojiSelect={onEmojiSelect} />
                    </div>
                    <div>
                        <Button outline color="danger" size="sm" onClick={onCancelShare}>Cancel</Button>
                        <Button outline color="primary" style={{backgroundColor:'#4267b2',borderColor:'#4267b2'}} size="sm" onClick={() => onShare(text, shareItem._id)}>Share</Button>
                    </div>
                </div>
            </div>
        </Modal>
    );
}

export default ShareComp;