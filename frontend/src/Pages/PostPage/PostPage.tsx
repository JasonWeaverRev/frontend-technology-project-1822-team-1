import React, { useEffect, useState } from "react";
import "./PostPage.css";
import { Link, useLocation, useParams } from "react-router-dom";
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
  // const likedby = location.state?.likedby;
  // const dislikedby = location.state?.dislikedby;


  /**
   * State variable declarations
   */
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [isDisliked, setIsDisliked] = useState<boolean>(false);
  const [likes, setLikes] = useState<number>(0);
  const [likedByList, setLikedByList] = useState<string[]>([]);
  const [dislikedByList, setDislikedByList] = useState<string[]>([]);
  const [comments, setComments] = useState<any[]>([]);
  const [commentNumber, setCommentNumber] = useState<number>(0);
  const [page, setPage] = useState(1);
  const [isClickable, setIsClickable] = useState<boolean>(true);
  const [alert, setAlert] = useState<any>(undefined);

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
        `http://35.175.254.24:4000/api/forums/comments/post?id=${postId}&page=${page}`
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
        post_id: postId,
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
        post_id: postId,
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
    .get(`http://35.175.254.24:4000/api/forums/posts/likes/${postId}`)
    .then((response) => {
      
      setLikes(response.data);

    })
    .catch((error) => {
      console.log(error);
    });
  }

  /**
   * Retrieves likes from a specific post
   */
    const getLikedBy = async () => {
      try {
        const response = await axios.get(`http://35.175.254.24:4000/api/forums/posts/${postId}`)

        setLikedByList(response.data.liked_by);
        setDislikedByList(response.data.disliked_by);
        
      } catch(error) {
        console.log(error);
      }
    };

  /**
   * Retrieves likes on initial page load
   */
  useEffect(() => {
    getLikes();
    getLikedBy();
  }, []);

  useEffect(() => {
    const activeUsername = localStorage.getItem("username");

    if (activeUsername && likedByList && likedByList.includes(activeUsername)) {
      setIsLiked(true);

    } else if (activeUsername && dislikedByList && dislikedByList.includes(activeUsername)) {
      setIsDisliked(true);
    }

  }, [likedByList, dislikedByList])

  /**
   * Handles comment reply events
   */
  const fetchReplies = async (parentId: string | undefined): Promise<any[]> => {
    try {
      const response = await axios.get(
        `http://35.175.254.24:4000/api/forums/comments/post?id=${parentId}&page=1`
      );

      const replies = response.data[0];

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
      const postPageAlert = {
        message: "You must be logged in to submit a comment",
        type: "danger",
      };
      setAlert(postPageAlert);
      return postPageAlert;
    }

    // Check if response to main post or a comment
    const responseId = !parentId ? postId : parentId;

    try {
      const response = await axios.post(
        `http://35.175.254.24:4000/api/forums/${responseId}`,
        {
          body: commentText,
        }
      );

      // Alerts when successful or errors occur
      if (response.status === 201) {
        const postPageAlert = {
          message: "Comment succesfully submitted!",
          type: "success",
        };
        setAlert(postPageAlert);
        return postPageAlert;
      } else {
        const postPageAlert = {
          message: "Failed to submit the comment",
          type: "danger",
        };
        setAlert(postPageAlert);
        return postPageAlert;
      }
    } catch (err) {
      console.error("Error submitting comment:", err);

      const postPageAlert = {
        message:
          "An error occurred while submitting your comment. Please try again.",
        type: "danger",
      };
      setAlert(postPageAlert);
      return postPageAlert;
    }
  };

  /**
   * Sets page tracker
   */
  const handleLoadMore = () => {
    setPage(page + 1);
  };

  useEffect(() => {
    if (alert) {
      setTimeout(clearAlert, 5000);
    }
  }, [alert]);


  const clearAlert = () => {
    setAlert(undefined);
  };

  return (
    <div className="post-page">
      <div className="post-page-padding">
        {/* TOP POST BODY: BUTTONS */}
        <div className="row">
          <div className="post-page-button-cont col-1">
            {/* Buttons */}
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
          <div className="post-body-bg col-11 d-flex flex-column align-items-center">
            {/* Post Text */}
            <h3 className="text-post-page-format">{title}</h3>
            <Link 
              to={`/profile/${username}`}
              className="text-decoration-none text-dark ms-0"
            >
              {username}
            </Link>
            {/* Render the content as HTML */}
            <div
              className="text-post-page-format mt-4"
              dangerouslySetInnerHTML={{ __html: content }}
            ></div>
          </div>
        </div>

        <div>
          <CommentForm
            commentNumber={commentNumber}
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
