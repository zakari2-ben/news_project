import React from "react";
import { useEffect, useState } from "react";

const CommentDetail = ({ articleUrl, onClose }) => {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:3001/api/comments?article_url=${articleUrl}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.ok) setComments(data.comments);
      });
  }, [articleUrl]);

  return (
    <div className="comment-detail">
      <button onClick={onClose}>Close</button>
      <h2>Comments</h2>
      {comments.length === 0 && <p>No comments yet</p>}
      <ul>
        {comments.map((c, index) => (
          <li key={index} className="comment-item">
            <span className="comment-icon">💬</span>
            <strong>{c.email}</strong>
            <span className="comment-date">
              {new Date(c.created_at).toLocaleString("fr-FR")}
            </span>
            <p>{c.content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CommentDetail;
