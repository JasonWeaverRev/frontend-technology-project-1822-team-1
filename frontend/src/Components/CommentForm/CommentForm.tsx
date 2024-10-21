import React, { useEffect, useState } from 'react'

interface CommentFormProps {
  commentNumber: number; 
  handleSubmitClick: (commentText: string) => void;
}


const CommentForm: React.FC<CommentFormProps> = ({commentNumber, handleSubmitClick}) => {
  
  const [commentText, setCommentText] = useState('');
  const [alert, setAlert] = useState<any>(
    undefined
  );
  
 /**
   * Tracks text within the comment form
   * 
   * @param event user inputs within the form
   */
 const handleTextChange = (event: any) => {
  setCommentText(event.target.value)
}


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

  const submitAlert = await handleSubmitClick(commentText);
  setAlert(submitAlert);
  
}

useEffect(() => {
  if (alert) {
    setTimeout(clearAlert, 5000);
  }
}, [alert]);

const clearAlert = () => {
  setAlert(undefined);
};
  
  
  return (
    <div>
       <div className="comment-form d-flex flex-column landing-page-text-format"> {/* COMMENT NUMBER DISPLAY */}
        <p className="">
          {commentNumber} comments
        </p>

        <div> {/* ALERT BANNER */}
          {alert && (
            <div 
              className={`alert alert-${alert.type} mt-3}`}
              role="alert"> 
              {alert.message}
            </div>
          )}
        </div>

        <div className="d-flex flex-row align-items-start mt-1"> {/* COMMENT TEXT FORM */}
          <textarea
            placeholder="Write your comment here"
            className="form-control"
            value={commentText}
            onChange={handleTextChange}>
          </textarea>
          <button 
            className="btn btn-secondary align-self-end"
            onClick={() => handleReplySubmitForComment()}>
            Submit
          </button>
        </div>
      </div>
    </div>
  )
}

export default CommentForm