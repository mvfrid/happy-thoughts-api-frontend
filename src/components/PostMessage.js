import React, { useState, useEffect } from 'react';

const PostMessage = ({ newMessage, fetchPosts }) => {
  const [newPost, setNewPost] = useState(''); // Initial state is an empty string
  const [errorMessage, setErrorMessage] = useState(''); // Initial state is an empty string

  useEffect(() => {
    if (newPost.length >= 141) {
      setErrorMessage('Your message is too long 😔');
    } else {
      setErrorMessage('');
    }
  }, [newPost])

  // This function handles the API with method POST
  // It is called when the user submits the form below, clicking the submit button
  const handleFormSubmit = (event) => {
    event.preventDefault();
    console.log('newPost onformsubmit:', newPost);
    if (newPost.length <= 4) {
      setErrorMessage('Your message is too short, it needs at least 5 letters 😔');
    } else {
      const options = {
        method: 'POST',
        body: JSON.stringify({
          message: `${newPost}`
        }),
        headers: { 'Content-Type': 'application/json' }
      };

      // console.log('options:', options);
      fetch('https://happy-thoughts-ux7hkzgmwa-uc.a.run.app/thoughts', options)
        .then((response) => response.json())
        .then((data) => {
          newMessage(data)
          setNewPost('')
          fetchPosts()
        })
        .catch((error) => console.log(error));
    }
  }

  return (
    <div className="post-wrapper">
      <h2>What is making you happy right now?</h2>
      <form onSubmit={handleFormSubmit}>
        <textarea
          rows="3"
          placeholder="Kittens?"
          value={newPost}
          onChange={(e) => setNewPost(e.target.value)} />
        <div className="post-length">
          <p className="error">{errorMessage}</p>
          <p className={`length ${newPost.length >= 140 ? 'red' : ''}`}>{newPost.length}/140</p>
        </div>
        <button type="submit" id="submitPostBtn" aria-label="button for submiting your post">
          <span className="emoji" aria-label="heart emoji">❤️</span> Send Happy Thought <span className="emoji" aria-label="heart emoji">❤️</span>
        </button>
      </form>
    </div>
  );
};

export default PostMessage;
