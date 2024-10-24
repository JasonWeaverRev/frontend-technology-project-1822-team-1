import React, { useEffect, useRef, useState } from "react";
import "./Comments.css";

import likeUnselectedIcon from "./CommentImages/upvote-unselected-arrows.png";
import likeSelectedIcon from "./CommentImages/upvote-selected-arrows.png";
import dislikeUnselectedIcon from "./CommentImages/downvote-unselected-arrows.png";
import dislikeSelectedIcon from "./CommentImages/downvote-selected-arrows.png";
import axios from "axios";
import { Link } from "react-router-dom";
import { isEditable } from "@testing-library/user-event/dist/utils";

interface CommentItem {
  body: string;
  username: string;
  time: string;
  commentId: string;
  handleSubmitClick: (commentText: string, parentId?: string) => void;
  fetchReplies: (commentText: string, parentId?: string) => void;
}

function Comments({ body, username, time, commentId, handleSubmitClick, fetchReplies}: CommentItem) {
  const [commentText, setCommentText] = useState<string>('');
  const [editText, setEditText] = useState<string>("");

  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [isDisliked, setIsDisliked] = useState<boolean>(false);
  const [likes, setLikes] = useState<number>(0);
  const [likedByList, setLikedByList] = useState<string[]>([]);
  const [dislikedByList, setDislikedByList] = useState<string[]>([]);
  const [showReplyForm, setShowReplyForm] = useState<boolean>(false);
  const [showReplies, setShowReplies] = useState<boolean>(false);
  const [replies, setReplies] = useState<any>([]);
  const [alert, setAlert] = useState<any>(undefined);
  const [role, setRole] = useState<string | null>(null);
  const [currUsername, setCurrUsername] = useState<string | null>(null);
  const [editable, setEditable] = useState<boolean>(false);
  const [deletingCommentId, setDeletingCommentId] = useState<string | null>(null);
  const [deletingCommentTime, setDeletingCommentTime] = useState<string | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);



  
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
      `http://localhost:4000/api/forums/like`,
      {
        post_id: commentId,
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
      `http://localhost:4000/api/forums/dislike`,
      {
        post_id: commentId,
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
    .get(`http://localhost:4000/api/forums/posts/likes/${commentId}`)
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
        const response = await axios.get(`http://localhost:4000/api/forums/posts/${commentId}`)

        setLikedByList(response.data.liked_by);
        setDislikedByList(response.data.disliked_by);
        
      } catch(error) {
        console.log(error);
      }
    };

    const getUserInfo = async () => {
        setCurrUsername(localStorage.getItem("username"));
        setRole(localStorage.getItem("role"));
    };

  /**
   * Retrieves likes and user info on initial page load
   */
  useEffect(() => {
    getUserInfo();
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

  // allows buffer for currUsername and role to be set
  useEffect(() => {
    
  }, [currUsername, role]);

  /**
   * Tracks whether the reply form is tracked or not
   */
  const handleReplyClick = () => {
    setShowReplyForm(!showReplyForm); // Toggle reply form visibility
  };

  /**
   * Shows the reply comments
   */
  const handleShowReplyClick = async () => {
    setShowReplies(!showReplies);

    const replies = await fetchReplies(commentId);
    setReplies(replies);
  };

  /**
   * Tracks text within the comment form
   * 
   * @param event user inputs within the form
   */
 const handleTextChange = (event: any) => {
  setCommentText(event.target.value)
}

/**
   * Tracks text within the comment form
   * 
   * @param event user inputs within the form
   */
const handleEditTextChange = (event: any) => {
  setEditText(event.target.value)
}

useEffect(() => {
  setEditText(body);
}, [body])

/**
 * Uses the handleSubmitClick function from the parent PostPage to submit
 * a comment reply
 */
const handleReplySubmitForComment = async () => {
  if (!commentText.trim()) {
    setAlert({
      message: "Comments should not be empty",
      type: "danger",
    });
    return;
  }

  const submitAlert = await handleSubmitClick(commentText, commentId);
  console.log(submitAlert);
  setAlert(submitAlert);
  
}

/**
 * Opens edit panel for a comment
 */
const handleEditClick = () => {
  console.log("Comment edit begins");

  setEditable(!editable);
}

/**
 * Opens edit panel for a comment
 */
const handleEditSubmitClick = async () => {
  console.log("Comment edit submitted");

  
  if (!editText.trim()) {
    setAlert({
      message: "Comments should not be empty",
      type: "danger",
    });
    return;
  }

  try {
    console.log(commentId);
    console.log(time);
    const response = await axios.patch(
    `http://localhost:4000/api/forums/comments`,
      {
        comment_id: commentId,
        comment_creation_time: time,
        body: editText
      }
    );

    if (response.status === 200) {
      setAlert({
        message: "Comment succesfully edited!",
        type: "success",
      });
      setEditable(false);
      return;
    }


  } catch (err) {
    console.log(err);
  }
}

/**
 * Deletes a comment
 */
const handleDeleteOpen = (id: string, delTime: string) => {
  console.log(id);
  console.log(delTime);
  
  setDeletingCommentId(id);
  setDeletingCommentTime(delTime);
  setIsDeleteModalOpen(true);
};

const handleDeleteClick = async () => {
  if (role === "user") {
    try {
      console.log("Deleting Comment ID in Delete Click:", deletingCommentId);
      console.log("Deleting Comment Time in Delete Click:", deletingCommentTime);

      const response = await axios.delete(
        `http://localhost:4000/api/forums/comments/${deletingCommentId}/${deletingCommentTime}`
      );

      if (response.status === 200) {
        console.log("Comment deleted");
      }
    } catch (err) {
      console.log(err);
    }
  } else if (role === "admin") {
    try {
      const response = await axios.delete(
        `http://localhost:4000/api/forums/${deletingCommentId}`
      );

      if (response.status === 200) {
        console.log("Comment deleted");
      }
    } catch (err) {
      console.log(err);
    }
  }
};

useEffect(() => {
  if (!isDeleteModalOpen) {
    setDeletingCommentId(null);
    setDeletingCommentTime(null);
  }
}, [isDeleteModalOpen]);

/**
 * ALERTS
 */
useEffect(() => {
  if (alert) {
    setTimeout(clearAlert, 5000);
  }
}, [alert]);

const clearAlert = () => {
  setAlert(undefined);
};


  return (
    <>
      <div className="comment-bg row"> {/* COMMENT CONTAINER */}
        <div className="col-1 d-flex flex-column justify-content-top align-items-center mt-3"> {/* LIKE/DISLIKE BUTTONS */}
          <button
            type="button"
            className="btn btn-outline-secondary btn-sm button-comment-like-format border-0"
            onClick={() => handleButtonClick("like")}
          >
            <img
              src={isLiked ? likeSelectedIcon : likeUnselectedIcon}
              alt="Like Icon"
              style={{ width: "15px", height: "15px" }}
            />
          </button>
          <button
            type="button"
            className="btn btn-outline-secondary btn-sm button-comment-like-format border-0"
            onClick={() => handleButtonClick("dislike")}
          >
            <img
              src={isDisliked ? dislikeSelectedIcon : dislikeUnselectedIcon}
              alt="Dislike Icon"
              style={{ width: "15px", height: "15px" }}
            />
          </button>
        </div>
        
         <div className="col-11 landing-page-text-format"> {/* COMMENT INFORMATION BODY */}
          <div className="d-flex justify-content-start comment-header">
            <Link 
              to={`/profile/${username}`}
              className="text-decoration-none text-dark ms-0"
            >
              {username}
            </Link>
            <p className="ms-4 fw-bold">{likes}</p> 
            <p className="ms-4">{time}</p>
          </div>
          <div 
            className="text-start">
              <p>{body}</p>
          </div>
          <div className="comment-footer text-start fw-bold mb-2">
            <p
              style={{ cursor: 'pointer', display: 'inline'}}
              onClick={handleReplyClick}>
                reply
            </p>
            <p className="ms-4"
              style={{ cursor: 'pointer', display: 'inline'}}
              onClick={handleShowReplyClick}>
                show replies
            </p>
            { (username === currUsername) && (
              <p className="ms-4"
                style={{ cursor: 'pointer', display: 'inline'}}
                onClick={handleEditClick}>
                  edit
              </p>
            )}
            { ((username === currUsername) || (role === "admin")) && ( 
              <p className="ms-4"
                style={{ cursor: 'pointer', display: 'inline'}}
                onClick={() => handleDeleteOpen(commentId, time)}
                data-toggle="modal"
                data-target="#deleteModal">
                  delete
              </p>
            )}
           
           {isDeleteModalOpen && (
            <div className="modal" id="deleteModal" tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
              <div className="modal-dialog" role="document">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">Delete Comment Confirmation</h5>
                  </div>
                  <div className="modal-body">
                    <p>
                      Are you sure you want to delete this comment?
                    </p>

                    <p>
                      This process cannot be reverted 
                    </p>
                  </div>
                  <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" onClick={() => setIsDeleteModalOpen(false)}>Cancel</button>
                    <button type="button" className="btn btn-danger" onClick={() => {
                      handleDeleteClick();
                      setIsDeleteModalOpen(false);
                    }}>Confirm</button>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          </div>

          <div> {/* ALERT BANNER */}
          {alert && (
            <div 
              className={`alert alert-${alert.type} mt-3}`}
              role="alert"> 
              {alert.message}
            </div>
          )}
          </div>

           {/* REPLY FORM */}
          {showReplyForm && (
              
              <div className="d-flex flex-row align-items-start">
                <textarea
                  placeholder="Write your reply here"
                  className="form-control w-50 h-50"
                  value={commentText}
                  onChange={handleTextChange}>
                </textarea>
                  
                <button 
                  className="btn btn-secondary align-self-end"
                  onClick={() => handleReplySubmitForComment()}>
                  Submit
                </button>
              </div>
          )}

          {editable && (
              
              <div className="d-flex flex-row align-items-start">
                <textarea
                  placeholder="Edit your comment here"
                  className="form-control w-50 h-50"
                  value={editText}
                  onChange={handleEditTextChange}>
                </textarea>
                  
                <button 
                  className="btn btn-secondary align-self-end"
                  onClick={() => handleEditSubmitClick()}>
                  Submit
                </button>
              </div>
          )}

           {/* REPLIES */}
           {showReplies && (

            <div>
              {replies.map((reply: any, ind: number) =>
                <Comments
                  key={ind}
                  username={reply.written_by}
                  body={reply.body}
                  time={reply.creation_time}
                  commentId={reply.post_id}
                  handleSubmitClick={handleSubmitClick}
                  fetchReplies={fetchReplies}
                />
              )}
            </div>

           )}
        </div>
      </div>
    </>
  )
}

export default Comments;
