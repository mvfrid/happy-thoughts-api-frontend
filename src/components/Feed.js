/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable max-len */
import React, { useState, useEffect } from 'react';
import PostMessage from './PostMessage';
import MessageList from './MessageList';

export const Feed = () => {
  const [loading, setLoading] = useState(false);
  const [messageList, setMessageList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  // When fetchPosts sets the loading or messageList state, it triggers a re-render of the App component.
  // We call the messages in the API, by GET method:
  const fetchPosts = () => {
    const limit = 20;

    setLoading(true);
    fetch(`https://project-happy-thoughts-api-xac4iwz3fa-lz.a.run.app/thoughts?page=${currentPage}&limit=${limit}`)
    // thoughts?page=1&limit=20
      .then((res) => res.json())
      .then((data) => {
        setMessageList(data.response);
        setTotalPages(data.totalPages)
      })
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  };

  // The useEffect hook is used to call the fetchPosts function and update the messageList state with the data retrieved from the API.
  useEffect(() => {
    fetchPosts();
  }, [currentPage]);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const isNextPageDisabled = currentPage === totalPages;
  const isPreviousPageDisabled = currentPage === 1;

  // This updates the message list, adding the new submitted message
  const addNewPost = (newMessage) => {
    setMessageList([newMessage, ...messageList]);
  };

  return (
    <div className="main-wrapper-feed">
      <PostMessage newMessage={addNewPost} fetchPosts={fetchPosts} />
      <MessageList loading={loading} messageList={messageList} setMessageList={setMessageList} fetchPosts={fetchPosts} />
      <div className="pagination">
        <p>Currently showing page {currentPage}/{totalPages}</p>
        <div className="pagination-buttons">
          <button type="button" onClick={handlePreviousPage} disabled={isPreviousPageDisabled}>Previous page</button>
          <button type="button" onClick={handleNextPage} disabled={isNextPageDisabled} title="Go to next page">Next page</button>
        </div>
      </div>
    </div>
  );
}