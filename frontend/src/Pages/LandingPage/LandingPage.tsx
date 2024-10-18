import React, { useState, useEffect } from "react";
import Post from "../../Components/Post/Post";
import axios from "axios";
import "./LandingPage.css";
<<<<<<< HEAD

function LandingPage() {
  const [posts, setPosts] = useState<any[]>([]); // Initialize as an array
=======


function LandingPage() {
  const [posts, setPosts] = useState([] as any | undefined);
>>>>>>> Merge-Branches
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
        console.log(response.data); // Log the response data for debugging
        if (Array.isArray(response.data)) {
          setPosts(response.data[0]); // Make sure this is an array
        } else {
          console.error("Response is not an array:", response.data);
        }

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
        {Array.isArray(posts) && posts.length > 0 ? (
          posts.map((post: any, ind: number) => (
            <Post
              key={ind}
              title={post.title}
              username={post.written_by}
              post_id={post.post_id}
              content={post.body}
            />
          ))
        ) : (
          <p>No posts available</p>
        )}
      </div>
      <button
        type="button"
        className="btn btn-outline-secondary load-button-format"
        onClick={handleLoadMore}
        disabled={!isClickable}
      >
        {isClickable ? "Load More" : "End of Page"}
      </button>
    </div>
  );
}

export default LandingPage;
