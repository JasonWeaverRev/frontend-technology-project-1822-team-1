import React, { useEffect, useState } from "react";
import "./Post.css";

import likeUnselectedIcon from "./PostImages/upvote-unselected.png";
import likeSelectedIcon from "./PostImages/upvote-selected.png";
import dislikeUnselectedIcon from "./PostImages/downvote-unselected.png";
import dislikeSelectedIcon from "./PostImages/downvote-selected.png";
import { Link } from "react-router-dom";
import axios from "axios";

interface PostItem {
  post_id: string;
  title: string;
  username: string;
}


function Post({title, username, post_id}: PostItem) {
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [isDisliked, setIsDisliked] = useState<boolean>(false);
  const [likes, setLikes] = useState<number>(0);


  const handleButtonClick = (type: 'like'|'dislike') => {
    if (type === 'like') {
      setIsLiked((state) => !state);
      if (isDisliked) {
        setIsDisliked(false);
      }
    } else if (type === 'dislike') {
      setIsDisliked((state) => !state);
      if (isLiked) {
        setIsLiked(false);
      }
    }
  }

  
  return (
  <>
    <div className="post-bg row">
      <div className="col-1 d-flex flex-column align-items-center"> 
       <button 
          type="button" 
          className="btn btn-outline-secondary btn-sm button-format" 
          onClick={() => handleButtonClick('like')}
          >
            &#8743;
          {/* <img 
            // src={isLiked ? likeSelectedIcon : likeUnselectedIcon} 
            // alt="Like Icon"
            // style={{width: '24px', height:'24px'}}/> */}
        </button>
        <div className="likes-text">
          {likes}
        </div>
        <button 
          type="button" 
          className="btn btn-outline-secondary btn-sm button-format" 
          onClick={() => handleButtonClick('dislike')}>
          &#8744;
          {/* <img 
            src={isDisliked ? dislikeSelectedIcon : dislikeUnselectedIcon} 
            alt="Dislike Icon"
            style={{width: '24px', height:'23px'}}/> */}
        </button>
      </div>
      <div className="col-11 d-flex flex-column text-start text-format justify-content-start">
        <h3>
          <Link 
            to={`/posts/${post_id}`} 
            state={{title: title, username: username}}
            className="text-decoration-none text-dark"
          > 
            {title}
          </Link>
        </h3>
        <p className="mt-auto mb-0">{username}</p>  
      </div>
    </div>
  </>
  );
}


export default Post;