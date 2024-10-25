// LandingPage.tsx
import React, { useState, useEffect } from "react";
import Post from "../../Components/Post/Post";
import axios from "axios";
import "./LandingPage.css";

function LandingPage() {
  const [posts, setPosts] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [isClickable, setIsClickable] = useState(true);

  const handleLoadMore = () => {
    setPage(page + 1);
  };

  const getPosts = async () => {
    await axios
      .get(`http://3.81.216.218:4000/api/forums/landing?page=${page}`)
      .then((response) => {
        if (Array.isArray(response.data)) {
          setPosts(response.data[0]);
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
              time={post.creation_time}
              likedby={post.liked_by}
              dislikedby={post.disliked_by}
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
