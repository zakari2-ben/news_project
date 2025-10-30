import React from "react";

const NewsItem = ({ article, setSelectedArticle, onShowComments }) => (
  

  <div className="news-item" onClick={() => setSelectedArticle(article)}>
    {article.image && <img src={article.image} alt={article.title} />}
    <h3>{article.title}</h3>
    <p>{new Date(article.publishedAt).toLocaleDateString("fr-FR")}</p>
    
    {/* زر Comments */}
    <button
      className="comments-btn"
      onClick={(e) => {
        e.stopPropagation(); // ⬅ هذا مهم جداً
        onShowComments(article.url);
      }}
    >
      Comments
    </button>


  </div>
);

export default NewsItem;
