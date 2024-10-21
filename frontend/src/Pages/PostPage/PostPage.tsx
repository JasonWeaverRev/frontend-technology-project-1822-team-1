import React, { useEffect, useState } from "react";
import "./PostPage.css";
import { useLocation, useParams } from "react-router-dom";
import Comments from "../../Components/Comments/Comments";

import likeUnselectedIcon from "./PostPageImages/upvote-unselected-arrows.png";
import likeSelectedIcon from "./PostPageImages/upvote-selected-arrows.png";
import dislikeUnselectedIcon from "./PostPageImages/downvote-unselected-arrows.png";
import dislikeSelectedIcon from "./PostPageImages/downvote-selected-arrows.png";
import axios from "axios";
import CommentForm from "../../Components/CommentForm/CommentForm";

function PostPage() {
  /**
   * Imported properties from the landing page
   */
  const { postId } = useParams();
  const location = useLocation();
  const title = location.state?.title;
  const username = location.state?.username;
  const content = location.state?.content;

  /**
   * State variable declarations
   */
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [isDisliked, setIsDisliked] = useState<boolean>(false);
  const [likes, setLikes] = useState<number>(0);
  const [comments, setComments] = useState<any[]>([]);
  const [commentNumber, setCommentNumber] = useState<number>(0);
  const [page, setPage] = useState(1);
  const [isClickable, setIsClickable] = useState<boolean>(true);
  const [alert, setAlert] = useState<{ message: string; type: string } | null>(
    null
  );

  // #region request/response interceptors
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
  // #endregion

  /**
   * COMMENT FETCHES
   */
  // Get list of all comments to the main post
  const getComments = async () => {
    await axios
      .get(
        `http://localhost:4000/api/forums/comments/post?id=${postId}&page=${page}`
      )
      .then((response) => {
        setComments(response.data[0]);
        setCommentNumber(response.data[1]);

        if (response.data[1] <= 8 + (page - 1) * 8) {
          setIsClickable(false);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  /**
   * Comment loading
   */
  useEffect(() => {
    getComments();
  }, [page]);

  /**
   * HANDLERS
   */
  /**
   * Handles like events
   *
   * @param type 'like' or 'dislike', depending on type of like option selected
   */
  const handleLikeButtonClick = (type: "like" | "dislike") => {
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

  /**
   * Handles comment reply events
   */
  const fetchReplies = async (parentId: string | undefined): Promise<any[]> => {
    try {
      const response = await axios.get(
        `http://localhost:4000/api/forums/comments/post?id=${parentId}&page=1`
      );

      console.log("Full response:", response);
      const replies = response.data[0];
      console.log("Replies:", replies);

      return Array.isArray(replies) ? replies : [];
    } catch (err) {
      console.log(err);
      return [];
    }
  };

  /**
   * Handles comment events for the main post
   */
  const handleSubmitClick = async (
    commentText: string,
    parentId?: string | undefined
  ) => {
    let token = localStorage.getItem("token");

    // Validate incoming text
    if (!token) {
      setAlert({
        message: "You must be logged in to submit a comment",
        type: "danger",
      });
      return;
    }

    if (!commentText.trim()) {
      setAlert({
        message: "Comments should not be empty",
        type: "danger",
      });
      return;
    }

    // Check if response to main post or a comment
    const responseId = !parentId ? postId : parentId;

    try {
      const response = await axios.post(
        `http://localhost:4000/api/forums/${responseId}`,
        {
          body: commentText,
        }
      );

      // Alerts when successful or errors occur
      if (response.status === 201) {
        setAlert({
          message: "Comment succesfully submitted!",
          type: "success",
        });
      } else {
        setAlert({
          message: "Failed to submit the comment",
          type: "danger",
        });
      }
    } catch (err) {
      console.error("Error submitting comment:", err);
      setAlert({
        message:
          "An error occurred while submitting your comment. Please try again.",
        type: "danger",
      });
    }
  };

  /**
   * Sets page tracker
   */
  const handleLoadMore = () => {
    setPage(page + 1);
  };

  /**
   * Resets the alert
   */
  const clearAlert = () => {
    setAlert(null);
  };

  /**
   * Automatically refreshes the alert after 5 seconds
   */
  if (alert) {
    setTimeout(clearAlert, 5000);
  }

  console.log(content); // Log content before rendering

  return (
    <div className="post-page">
      <div className="post-page-padding">
        <div className="row">
          {" "}
          {/* TOP POST BODY */}
          <div className="post-page-button-cont col-1 d-flex flex-column align-items-center justify-content-center">
            {" "}
            {/* Buttons */}
            <button
              type="button"
              className="btn btn-outline-secondary btn-sm button-format border-0"
              onClick={() => handleLikeButtonClick("like")}
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
              onClick={() => handleLikeButtonClick("dislike")}
            >
              <img
                src={isDisliked ? dislikeSelectedIcon : dislikeUnselectedIcon}
                alt="Dislike Icon"
                style={{ width: "24px", height: "23px" }}
              />
            </button>
          </div>
          <div className="post-body-bg col-11 d-flex flex-column align-items-center">
            {/* Post Text */}
            <h3 className="text-post-page-format">{title}</h3>
            <p className="text-post-page-format">{username}</p>
            {/* Render the content as HTML */}
            <div
              className="text-post-page-format"
              dangerouslySetInnerHTML={{ __html: content }}
            ></div>
          </div>
        </div>

        <div>
          <CommentForm
            commentNumber={commentNumber}
            alert={alert}
            handleSubmitClick={handleSubmitClick}
          />
        </div>

        <div>
          {" "}
          {/* COMMENTS */}
          {comments.map((comment: any, ind: number) => (
            <Comments
              key={ind}
              username={comment.written_by}
              body={comment.body}
              time={comment.creation_time}
              commentId={comment.post_id}
              alert={alert}
              handleSubmitClick={handleSubmitClick}
              fetchReplies={fetchReplies}
            />
          ))}
        </div>
        <div>
          {" "}
          {/* LOAD MORE */}
          <button
            type="button"
            className="btn btn-outline-secondary load-comment-button-format"
            onClick={() => handleLoadMore()}
            disabled={!isClickable}
          >
            {isClickable ? "Show More" : "No more comments"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default PostPage;
