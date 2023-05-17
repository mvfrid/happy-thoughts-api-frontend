/* eslint-disable max-len */
/* eslint-disable no-underscore-dangle */

import React from 'react';
import SingleMessage from './SingleMessage';

const MessageList = ({ messageList, fetchPosts }) => {
  return (
    <div className="list-wrapper">
      {messageList.map((singleMessage) => (
        <SingleMessage key={singleMessage._id} singleMessage={singleMessage} fetchPosts={fetchPosts} />
      ))}
    </div>
  );
};

export default MessageList;