import React from "react";
import NewsItem from "./NewsItem";

const NewsList = ({ articles, setSelectedArticle, onShowComments }) => {
  return (
    <div className="news-list">
      {articles.map((article) => (
        <NewsItem
          key={article.url}
          article={article}
          setSelectedArticle={setSelectedArticle}
          onShowComments={onShowComments}
        />
      ))}
    </div>
  );
};

export default NewsList;

