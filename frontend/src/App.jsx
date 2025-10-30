import React from "react";
import { useState } from "react";
import Home from "./pages/Home";
import ArticleDetails from "./pages/ArticleDetails";

function App() {
  const [selectedArticle, setSelectedArticle] = useState(null);

  return (
    <div className="app">
      {!selectedArticle ? (
        <Home setSelectedArticle={setSelectedArticle} />
      ) : (
        <ArticleDetails article={selectedArticle} setSelectedArticle={setSelectedArticle} />
      )}
    </div>
  );
}

export default App;
