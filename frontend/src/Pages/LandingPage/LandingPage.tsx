// LandingPage.tsx
import React, { useState, useEffect } from "react";
import Post from "../../Components/Post/Post";
import axios from "axios";
import "./LandingPage.css";
import { useEncounter } from "../../Context/EncounterContext";


function LandingPage() {
 
  const { setEncounter } = useEncounter();

  const [posts, setPosts] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [isClickable, setIsClickable] = useState(true);

  const handleLoadMore = () => {
    setPage(page + 1);
  };

  const getPosts = async () => {
    await axios
      .get(`http://localhost:4000/api/forums/landing?page=${page}`)
      .then((response) => {
        if (Array.isArray(response.data)) {
          const newPosts = response.data[0];
          setPosts(newPosts);

        } else {
          console.error("Response is not an array:", response.data);
        }

        if (response.data[1] <= 6 + (page - 1) * 6) {
          setIsClickable(false);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const removePost = (postId: string) => {
    setPosts((prevPosts) =>
      prevPosts.filter((post) => post.post_id !== postId)
    );

    getPosts();
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
              onDelete={removePost}
              encounterId={post.encounter} // Pass encounterId to Post component
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