import React, { useState } from "react";
import "./Comments.css";

import likeUnselectedIcon from "./CommentImages/upvote-unselected-arrows.png";
import likeSelectedIcon from "./CommentImages/upvote-selected-arrows.png";
import dislikeUnselectedIcon from "./CommentImages/downvote-unselected-arrows.png";
import dislikeSelectedIcon from "./CommentImages/downvote-selected-arrows.png";

interface CommentItem {
  body: string;
  username: string;
  time: string;
  commentId: string;
  alert: {type: string; message: string} | null;
  handleSubmitClick: (commentText: string, parentId?: string) => void;
  fetchReplies: (commentText: string, parentId?: string) => void;
}

function Comments({ body, username, time, commentId, alert, handleSubmitClick, fetchReplies}: CommentItem) {
  const [commentText, setCommentText] = useState<string>('');

  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [isDisliked, setIsDisliked] = useState<boolean>(false);
  const [likes, setLikes] = useState<number>(0);
  const [showReplyForm, setShowReplyForm] = useState<boolean>(false);
  const [showReplies, setShowReplies] = useState<boolean>(false);
  const [replies, setReplies] = useState<any[]>([]);


  
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

  /**
   * Tracks whether the reply form is tracked or not
   */
  const handleReplyClick = () => {
    setShowReplyForm(visibility => !visibility); // Toggle reply form visibility
  };

  /**
   * Shows the reply comments
   */
  const handleShowReplyClick = async () => {
    console.log("Show reply handler triggered");
    setShowReplies(!showReplies);

    const replies = await fetchReplies(commentId);
    console.log('Fetched replies:', replies);
    // setReplies(replies);
  };

  /**
   * Tracks text within the comment form
   * 
   * @param event user inputs within the form
   */
 const handleTextChange = (event: any) => {
  setCommentText(event.target.value)
}
  

  return (
    <>
      <div className="comment-bg row"> {/* COMMENT CONTAINER */}
        <div className="col-1 d-flex flex-column justify-content-center"> {/* LIKE/DISLIKE BUTTONS */}
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
            <p className="ms-0">{username}</p>
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
                  onClick={() => handleSubmitClick(commentText, commentId)}>
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
                  alert={alert}
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
