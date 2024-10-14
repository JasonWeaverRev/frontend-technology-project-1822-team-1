import React from "react";
import "./PostPage.css";
import { useLocation, useParams } from "react-router-dom";

function PostPage() {
  const { post_id } = useParams();
  const location = useLocation();

  const title = location.state?.title;
  const username = location.state?.username;
  const content = location.state?.content;

  return (
    <div className="post-page">
      <h3 className="text-format">{title}</h3>
      <p className="text-format">{username}</p>
      <p className="text-format">{content}</p>
    </div>
  );
}

export default PostPage;
