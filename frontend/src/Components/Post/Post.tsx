import React, { useState } from "react";
import "./Post.css";
import { Link } from "react-router-dom";
import likeUnselectedIcon from "./PostImages/upvote-unselected-arrows.png";
import likeSelectedIcon from "./PostImages/upvote-selected-arrows.png";
import dislikeUnselectedIcon from "./PostImages/downvote-unselected-arrows.png";
import dislikeSelectedIcon from "./PostImages/downvote-selected-arrows.png";

interface PostItem {
  post_id: string;
  title: string;
  username: string;
  content: string;
}

function Post({ title, username, post_id, content }: PostItem) {
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [isDisliked, setIsDisliked] = useState<boolean>(false);
  const [likes, setLikes] = useState<number>(0);

  const handleButtonClick = (type: "like" | "dislike") => {
    if (type === "like") {
      setIsLiked((state) => !state);
      if (isDisliked) {
        setIsDisliked(false);
      }
    } else if (type === "dislike") {
      setIsDisliked((state) => !state);
      if (isLiked) {
        setIsLiked(false);
      }
    }
  };

  return (
    <>
      <div className="post-bg row">
        <div className="col-1 d-flex flex-column align-items-center">
          <button
            type="button"
            className="btn btn-outline-secondary btn-sm button-format border-0"
            onClick={() => handleButtonClick("like")}
          >
            <img
              src={isLiked ? likeSelectedIcon : likeUnselectedIcon}
              alt="Like Icon"
              style={{ width: "24px", height: "24px" }}
            />
          </button>
          <div className="likes-text">{likes}</div>
          <button
            type="button"
            className="btn btn-outline-secondary btn-sm button-format border-0"
            onClick={() => handleButtonClick("dislike")}
          >
            <img
              src={isDisliked ? dislikeSelectedIcon : dislikeUnselectedIcon}
              alt="Dislike Icon"
              style={{ width: "24px", height: "23px" }}
            />
          </button>
        </div>
        <div className="col-11 d-flex flex-column text-start text-post-format justify-content-between landing-page-text-format">
          <h4>
            <Link
              to={`/posts/${post_id}`}
              state={{ title, username, content }}
              className="text-decoration-none text-dark"
            >
              {title}
            </Link>
          </h4>
          <div className="flex-grow-1 d-flex align-items-center mb-0">
            {content.length > 25 ? (
              <div
                dangerouslySetInnerHTML={{
                  __html: content.substring(0, 25) + " . . .",
                }}
              />
            ) : (
              <div dangerouslySetInnerHTML={{ __html: content }} />
            )}
          </div>
          <Link to={`/profile/${username}`}>{username}</Link>
        </div>
      </div>
    </>
  );
}

export default Post;
