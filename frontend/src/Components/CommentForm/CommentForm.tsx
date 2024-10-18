import React, { useState } from 'react'

interface CommentFormProps {
  commentNumber: number; 
  alert: {type: string; message: string} | null;
  handleSubmitClick: (commentText: string) => void;
}


const CommentForm: React.FC<CommentFormProps> = ({commentNumber, alert, handleSubmitClick}) => {
  
  const [commentText, setCommentText] = useState('');
  
 /**
   * Tracks text within the comment form
   * 
   * @param event user inputs within the form
   */
 const handleTextChange = (event: any) => {
  setCommentText(event.target.value)
}
  
  
  return (
    <div>
       <div className="comment-form d-flex flex-column"> {/* COMMENT NUMBER DISPLAY */}
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
            onClick={() => handleSubmitClick(commentText)}>
            Submit
          </button>
        </div>
      </div>
    </div>
  )
}

export default CommentForm