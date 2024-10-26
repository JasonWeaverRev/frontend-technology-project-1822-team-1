import React, { useEffect, useState } from "react";
import "./Post.css";
import { Link } from "react-router-dom";
import likeUnselectedIcon from "./PostImages/upvote-unselected-arrows.png";
import likeSelectedIcon from "./PostImages/upvote-selected-arrows.png";
import dislikeUnselectedIcon from "./PostImages/downvote-unselected-arrows.png";
import dislikeSelectedIcon from "./PostImages/downvote-selected-arrows.png";
import deleteIcon from "./PostImages/redXformatted.png";
import axios from "axios";

interface PostItem {
  post_id: string;
  title: string;
  username: string;
  content: string;
  time: string;
  likedby: string[];
  dislikedby: string[];
  onDelete: (postid: string) => void;
  encounterId: string | null;
}

function Post({
  title,
  username,
  post_id,
  content,
  time,
  likedby,
  dislikedby,
  onDelete,
  encounterId
}: PostItem) {
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [isDisliked, setIsDisliked] = useState<boolean>(false);
  const [likes, setLikes] = useState<any>(0);
  const [deletingPostId, setDeletingCommentId] = useState<string | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const [isClickable, setIsClickable] = useState<boolean>(true);

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
        `http://3.81.216.218:4000/api/forums/like`,
        {
          post_id: post_id,
        }
      );

      await getLikes();
    } catch (error) {
      console.log(error);
    }
  };

  /**
   * Dislikes a post
   */
  const handleDownvote = async () => {
    try {
      const response = await axios.post(
        `http://3.81.216.218:4000/api/forums/dislike`,
        {
          post_id: post_id,
        }
      );

      await getLikes();
    } catch (error) {
      console.log(error);
    }
  };

  /**
   * Retrieves likes from a specific post
   */
  const getLikes = async () => {
    await axios
      .get(`http://3.81.216.218:4000/api/forums/posts/likes/${post_id}`)
      .then((response) => {
        setLikes(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  /**
   * ADMIN POST DELETION
   *
   * @param id
   * @param delTime
   */
  const handleDeleteOpen = (id: string) => {
    console.log(id);

    setDeletingCommentId(id);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteClick = async () => {
    if (localStorage.getItem("role") === "admin") {
      try {
        console.log("Deleting Post ID in Delete Click:", deletingPostId);

        const response = await axios.delete(
          `http://3.81.216.218:4000/api/forums/${deletingPostId}`
        );

        if (response.status === 200) {
          console.log("Post deleted");
          onDelete(deletingPostId!); // ! = non-null assertion
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  /**
   * DATE FORMATTING
   */
  const formatDate = () => {
    const date = new Date(time);
    const formattedDate = date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "numeric",
      day: "numeric",
    });

    return formattedDate;
  };

  useEffect(() => {
    getLikes();

    const activeUsername = localStorage.getItem("username");

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
  };

  return (
    <>
      <div className="post-bg row">
        <div className="col-1 d-flex flex-column align-items-center">
          <button
            type="button"
            className="btn btn-outline-secondary btn-sm button-format border-0"
            disabled={!isClickable}
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
            disabled={!isClickable}
            onClick={() => handleButtonClick("dislike")}
          >
            <img
              src={isDisliked ? dislikeSelectedIcon : dislikeUnselectedIcon}
              alt="Dislike Icon"
              style={{ width: "24px", height: "23px" }}
            />
          </button>
        </div>
        <div className="col-10 d-flex flex-column text-start text-post-format justify-content-between landing-page-text-format">
          <h4>
            <Link
              to={`/posts/${post_id}`}
              state={{ title, username, content, time, encounterId }}
              className="text-decoration-none text-dark"
            >
              {title}
            </Link>
          </h4>
          <div className="flex-grow-1 d-flex align-items-center mb-0 mt-2">
            {content.length > 40 ? (
              <div
                dangerouslySetInnerHTML={{
                  __html: stripHtml(content).substring(0, 40) + " . . .",
                }}
              />
            ) : stripHtml(content).trim() !== "" ? (
              <div dangerouslySetInnerHTML={{ __html: content }} />
            ) : (
              <div className="fst-italic">[No content to display]</div>
            )}
          </div>

          <div className="d-flex justify-content-start mt-3">
            <Link
              to={`/profile/${username}`}
              className="text-decoration-none text-dark"
            >
              {username}
            </Link>
            <p className="ms-4">{formatDate()}</p>
            {encounterId && (
              <p className="ms-4">Encounter ID: {encounterId}</p>
            )}
          </div>
        </div>
        <div className="col-1 d-flex flex-column align-items-center justify-content-center">
          {localStorage.getItem("role") === "admin" && (
            <button
              type="button"
              className="btn btn-light btn-sm button-format"
              onClick={() => handleDeleteOpen(post_id)}
              data-toggle="modal"
              data-target="#deleteModal"
            >
              <img
                src={deleteIcon}
                alt="Delete Icon"
                style={{ width: "24px", height: "24px" }}
              />
            </button>
          )}
        </div>

        {isDeleteModalOpen && (
          <div
            className="modal landing-page-text-format"
            id="deleteModal"
            tabIndex={-1}
            role="dialog"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalLabel">
                    Delete Post Confirmation
                  </h5>
                </div>
                <div className="modal-body">
                  <p>Are you sure you want to delete this post?</p>

                  <p>This process cannot be reverted</p>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-dismiss="modal"
                    onClick={() => setIsDeleteModalOpen(false)}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="btn btn-danger"
                    data-dismiss="modal"
                    onClick={() => {
                      handleDeleteClick();
                      setIsDeleteModalOpen(false);
                    }}
                  >
                    Confirm
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Post;
