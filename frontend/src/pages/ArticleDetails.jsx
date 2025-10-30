import React from "react";
import { useEffect, useState } from "react";
import CommentForm from "../components/CommentForm";

const ArticleDetails = ({ article, setSelectedArticle }) => {
  const [comments, setComments] = useState([]);

  const loadComments = async () => {
    try {
      const res = await fetch(`http://localhost:3001/api/comments?article_url=${encodeURIComponent(article.url)}`);

      const data = await res.json();
      if (data.ok) setComments(data.comments || []);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (article) loadComments();
  }, [article]);

  if (!article) return null;

  return (

    <div className="overlay" style={{
        
        inset: 0,
        background: "rgba(0,0,0,0.5)",
        zIndex: 1000
      }}
      onClick={() => setSelectedArticle(null)}
    >
      <div className="article-details"
        onClick={(e) => e.stopPropagation()} // باش الكليك داخل المودال ما يسدش
        
      >
        <button onClick={() => setSelectedArticle(null)}>Retour</button>
        {article.image && <img src={article.image} alt={article.title} />}
        <h1>{article.title}</h1>
        <p>{new Date(article.publishedAt).toLocaleDateString("fr-FR")}</p>
        <p>{article.description}</p>
        <a href={article.url} target="_blank" rel="noreferrer">Lire l'article complet</a>

        <section>
          <h3>ajoute de commentaire</h3>
          <CommentForm articleUrl={article.url} refreshComments={loadComments} />
          <h3>Commentaires ({comments.length}) :</h3>
          <div className="comments">
            {comments.length === 0 ? <p>Aucun commentaire</p> :
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
            }
          </div>
        </section>
    </div>
    </div>
    
    
  );
};

export default ArticleDetails;
