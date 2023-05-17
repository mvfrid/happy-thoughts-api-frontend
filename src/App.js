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
    setLoading(true);
    fetch('https://happy-thoughts-ux7hkzgmwa-uc.a.run.app/thoughts')
      .then((res) => res.json())
      .then((data) => setMessageList(data))
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