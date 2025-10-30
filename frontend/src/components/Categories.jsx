import React from "react";

const Categories = ({ categories, selectedCategory, setSelectedCategory }) => {
  const buttons = [];
  for (let i = 0; i < categories.length; i++) {
    const cat = categories[i];
    buttons.push(
      <button
        key={cat}
        className={cat === selectedCategory ? "active" : ""}
        onClick={() => setSelectedCategory(cat)}
      >
        {cat}
      </button>
    );
  }
  return <div className="categories">{buttons}</div>;
};

export default Categories;
