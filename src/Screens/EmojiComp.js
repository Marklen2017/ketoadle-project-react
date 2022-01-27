import React, { useState } from 'react';
import { render } from 'react-dom';
import Picker, { SKIN_TONE_NEUTRAL } from 'emoji-picker-react';

const EmojiComp = ({onEmojiSelect}) => {
    const [chosenEmoji, setChosenEmoji] = useState(null);

    const onEmojiClick = (event, emojiObject) => {
        setChosenEmoji(emojiObject);
        emojiObject && onEmojiSelect(emojiObject.emoji)  
    }

    return (
        <div>
            <Picker onEmojiClick={onEmojiClick} skinTone={SKIN_TONE_NEUTRAL} preload={true}/>
            {/* { chosenEmoji && <EmojiData chosenEmoji={chosenEmoji}/>} */}
        </div>
    );
};

export default EmojiComp;