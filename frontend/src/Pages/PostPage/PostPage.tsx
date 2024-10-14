import React from "react";
import "./PostPage.css";
import { useLocation, useParams } from "react-router-dom";

function PostPage() {
  const {post_id} = useParams();
  const location = useLocation();

  const title = location.state?.title;
  const username = location.state?.username;

  return <div>
    <h3>
      {title}
    </h3>
    <p>
      {username}
    </p>
  </div>;
}

export default PostPage;
