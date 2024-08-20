

import React, { useState } from "react";
import Picker from "emoji-picker-react";

export default function Emoji({onAddEmoji}) {
    // const [chosenEmoji, setChosenEmoji] = useState("");

    const onEmojiClick = (emojiData, event) => {
        onAddEmoji(prev=> prev + emojiData.emoji);
        console.log(emojiData.emoji);
    };

    return (
        <div>
            {/* <h3 className="text-amber-500 font-semibold"> Emoji Picker</h3>
            {chosenEmoji && (                
                    <span>
                        {chosenEmoji}
                    </span>                
            ) } */}
            <Picker onEmojiClick={onEmojiClick} />
        </div>
    );
}
