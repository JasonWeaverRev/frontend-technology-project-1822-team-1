import React, { useState, useEffect } from "react";
import Post from "../../Components/Post/Post";
import axios from "axios";
import "./LandingPage.css";


function LandingPage() {
  const [posts, setPosts] = useState([] as any | undefined);
  const [page, setPage] = useState(1);
  const [isClickable, setIsClickable] = useState(true);

  const handleLoadMore = () => {
    setPage(page + 1);
  };

  /**
   * INTERCEPTORS
   */
  // Request Interceptor
  axios.interceptors.request.use(
    (config: any): any => {
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  // Response Interceptor
  axios.interceptors.response.use(
    (response: any): any => {
      return response;
    },
    (error) => {
      console.error(error);
      return Promise.reject(error);
    }
  );

  const getPosts = async () => {
    await axios
      .get(`http://localhost:4000/api/forums/landing?page=${page}`)
      .then((response) => {
        // Axios will automatically turn the response into a JS object
        setPosts(response.data[0]);

        if (response.data[1] <= 4 + (page - 1) * 4) {
          setIsClickable(false);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  /**
   * LOAD MORE
   */
  useEffect(() => {
    getPosts();
  }, [page]);

  return (
    <div className="landing-page">
      <div>
        {posts.map((post: any, ind: number) => (
          <Post
            key={ind}
            title={post.title}
            username={post.written_by}
            post_id={post.post_id}
            content={post.body}
          />
        ))}
      </div>
      <button
        type="button"
        className="btn btn-outline-secondary load-button-format"
        onClick={() => handleLoadMore()}
        disabled={!isClickable}
      >
        {isClickable ? "Load More" : "End of Page"}
      </button>
    </div>
  );
}

export default LandingPage;
