import React from "react";
import { useEffect, useState } from "react";
import Categories from "../components/Categories";
import NewsList from "../components/NewsList";
import SearchBar from "../components/SearchBar";
import CommentDetail from "../components/CommentDetail";

const API_KEY = "0b666258a8cf31367caa0b68f0ba4cb0";


const Home = ({ setSelectedArticle }) => {
  const [articles, setArticles] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("Sport");
  const [query, setQuery] = useState("");

  const [showComments, setShowComments] = useState(false);
  const [currentArticleUrl, setCurrentArticleUrl] = useState("");

  const handleShowComments = (url) => {
    setCurrentArticleUrl(url);
    setShowComments(true);
  };

  const categories = ["Sport", "Art", "Économie", "Politique", "Tech"];

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const url = `https://api.allorigins.win/get?url=${encodeURIComponent(
          `https://gnews.io/api/v4/search?q=${selectedCategory}${query ? "+" + query : ""}&lang=fr&max=10&apikey=${API_KEY}`
        )}`;
        const res = await fetch(url);
        const data = await res.json();
        const parsed = JSON.parse(data.contents);
        setArticles(parsed.articles || []);
      } catch (error) {
        console.error("Erreur fetch API:", error);
      }
    };
    fetchNews();
  }, [selectedCategory, query]);

  return (
    <div className="home">
      <Categories
        categories={categories}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />
      <SearchBar query={query} setQuery={setQuery} />
      <h2>Dernières actualités - {selectedCategory}</h2>
      {/* <NewsList articles={articles} setSelectedArticle={setSelectedArticle} /> */}
      
      <NewsList articles={articles} setSelectedArticle={setSelectedArticle} onShowComments={handleShowComments} />

      {showComments && (
        <CommentDetail
          articleUrl={currentArticleUrl}
          onClose={() => setShowComments(false)}
        />
      )}

    </div>
  );
};

export default Home;
