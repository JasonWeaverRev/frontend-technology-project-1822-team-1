import React, { useState, useEffect } from "react";
import Post from "../../Components/Post/Post"
import axios from "axios";
// import "../../index.css";

// // Simulate getting posts from a backend
const getPosts = async () => {
  return (
    { title: "Post 1", content: "This is the first post's content." }
  );
};

function LandingPage() {
  const [posts, setPosts] = useState([] as any);
  const [page, setPage] = useState(1);
  const [isClickable, setIsClickable] = useState(true);

  const handleLoadMore = () => {
    setPage(page + 1);
  }

/**
 * INTERCEPTORS
 */
axios.interceptors.request.use((config: any): any => {
  return config
}, (error) => {
  return Promise.reject(error);
});

// Response Interceptor
axios.interceptors.response.use((response: any): any => {
  return response;
}, (error) => {
  console.error(error);
  return Promise.reject(error);
})

/**
 * INITIAL LANDING
 */
useEffect(() => {
  axios.get(`http://localhost:4000/api/forums/landing?page=${page}`)
    .then((response) => {
      // Axios will automatically turn the response into a JS object
      setPosts(response.data);
    })
    .catch((error) => {
      console.log(error);
    })
}, [])

/**
 * LOAD MORE
 */
useEffect(() => {
    axios.get(`http://localhost:4000/api/forums/landing?page=${page}`)
    .then((response) => {
      // Axios will automatically turn the response into a JS object
      setPosts(response.data[0]);

      if (response.data[1] <= (4 + ((page-1) * 4))) {
        setIsClickable(false);
      }
    })
    .catch((error) => {
      console.log(error);
    })
}, [page])

  return (
    <div className="landing-page">
      <div className="post-list">
         {posts.map((post: any, ind: number) => (
           <Post key={ind} title={post.title} username={post.written_by} post_id={post.post_id} />
        ))}
       </div>
        <button
          type="button" 
          className="btn btn-outline-secondary load-button-format"
          onClick={() => handleLoadMore()}
          disabled={!isClickable}
        >
        Load more
        </button>
    </div>
  )
};

export default LandingPage;
