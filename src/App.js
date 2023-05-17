/* eslint-disable max-len */
import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import PostMessage from './components/PostMessage';
import MessageList from './components/MessageList';
import Footer from './components/Footer';

export const App = () => {
  const [loading, setLoading] = useState(false);
  const [messageList, setMessageList] = useState([]);

  // When fetchPosts sets the loading or messageList state, it triggers a re-render of the App component.
  // We call the messages in the API, by GET method:
  const fetchPosts = () => {
    const page = 1;
    const limit = 20;

    setLoading(true);
    fetch(`https://project-happy-thoughts-api-xac4iwz3fa-lz.a.run.app/thoughts?page=${page}&limit=${limit}`)
    // thoughts?page=1&limit=20
      .then((res) => res.json())
      .then((data) => setMessageList(data.response))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  };

  // The useEffect hook is used to call the fetchPosts function and update the messageList state with the data retrieved from the API.
  useEffect(() => {
    fetchPosts();
  }, []);

  // This updates the message list, adding the new submitted message
  const addNewPost = (newMessage) => {
    setMessageList([newMessage, ...messageList]);
  };

  return (
    <div className="main-wrapper">
      <Header />
      <PostMessage newMessage={addNewPost} fetchPosts={fetchPosts} />
      <MessageList loading={loading} messageList={messageList} setMessageList={setMessageList} fetchPosts={fetchPosts} />
      <Footer />
    </div>
  );
}