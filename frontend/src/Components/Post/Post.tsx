import React, { useEffect, useState } from "react";
import "./Post.css";
import { Link } from "react-router-dom";
import likeUnselectedIcon from "./PostImages/upvote-unselected-arrows.png";
import likeSelectedIcon from "./PostImages/upvote-selected-arrows.png";
import dislikeUnselectedIcon from "./PostImages/downvote-unselected-arrows.png";
import dislikeSelectedIcon from "./PostImages/downvote-selected-arrows.png";
import axios from "axios";

interface PostItem {
  post_id: string;
  title: string;
  username: string;
  content: string;
  time: string;
  likedby: string[];
  dislikedby: string[];
}

function Post({ title, username, post_id, content, time, likedby, dislikedby }: PostItem) {
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [isDisliked, setIsDisliked] = useState<boolean>(false);
  const [likes, setLikes] = useState<any>(0);

  // Request Interceptor
  axios.interceptors.request.use(
    (config: any): any => {
      const token = localStorage.getItem("token");

      if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
      }

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

  /**
   * Handles 'like' or 'dislike' button events
   * 
   * @param type 
   */
  const handleButtonClick = async (type: "like" | "dislike") => {
    if (type === "like") {
      setIsLiked((state) => !state);
      if (isDisliked) {
        setIsDisliked(false);
      }

      await handleUpvote();

    } else if (type === "dislike") {
      setIsDisliked((state) => !state);
      if (isLiked) {
        setIsLiked(false);
      }

      await handleDownvote();
    }
  };

  /**
   * Likes a post
   */
  const handleUpvote = async () => {
    try {
      const response = await axios.post(
      `http://35.175.254.24:4000/api/forums/like`,
      {
        post_id: post_id,
      }
    );

    await getLikes();
    
    } catch (error) {
      console.log(error);
    }
  }

  /**
   * Dislikes a post
   */
  const handleDownvote = async () => {
    try {
      const response = await axios.post(
      `http://35.175.254.24:4000/api/forums/dislike`,
      {
        post_id: post_id,
      }
    );

    await getLikes();
    
    } catch (error) {
      console.log(error);
    }
  }

  /**
   * Retrieves likes from a specific post
   */
  const getLikes = async () => {
    await axios
    .get(`http://35.175.254.24:4000/api/forums/posts/likes/${post_id}`)
    .then((response) => {
      
      setLikes(response.data);

    })
    .catch((error) => {
      console.log(error);
    });
  }

  useEffect(() => {
    getLikes();

    const activeUsername = localStorage.getItem("username")

    if (activeUsername && likedby.includes(activeUsername)) {

      setIsLiked(true);
    } else if (activeUsername && dislikedby.includes(activeUsername)) {
      setIsDisliked(true);
    }
  }, []);

  /**
   * Trims a post body's html tags, replacing them with an empty div 
   * 
   * @param html 
   * @returns 
   */
  const stripHtml = (html: string) => {
    const div = document.createElement("div");
    div.innerHTML = html;
    return div.innerText;
  }

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
              state={{ title, username, content, likedby, dislikedby }}
              className="text-decoration-none text-dark"
            >
              {title}
            </Link>
          </h4>
          <div className="flex-grow-1 d-flex align-items-center mb-0 mt-2">
            {content.length > 25 ? (
              <div
                dangerouslySetInnerHTML={{
                  __html: content.substring(0, 25) + " . . .",
                }}
              />
            ) : (stripHtml(content).trim() !== '' ? (
              <div dangerouslySetInnerHTML={{ __html: content }} />
              ) : (
                <div className="fst-italic"> 
                  [No content to display]
                </div>
              )
            )}
          </div>
          
          <div className="d-flex justify-content-start mt-3">
            <Link 
              to={`/profile/${username}`}
              className="text-decoration-none text-dark"
            >
              {username}
            </Link>
            <p className="ms-4">
              {time}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Post;
