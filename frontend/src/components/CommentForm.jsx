import { useState } from "react";
import React from "react";

function CommentForm({ articleUrl, refreshComments }) {
  const [email, setEmail] = useState("");
  const [content, setContent] = useState("");
  const [msg, setMsg] = useState("");

  const handleSend = async () => {
    setMsg("Vérification...");
    
    // 🧹 تنظيف الإيميل قبل الإرسال
    const cleanEmail = email.trim().toLowerCase();

    try {
      // التحقق من الإيميل
      const verify = await fetch("http://localhost:3001/api/verify-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: cleanEmail }),
      });

      if (!verify.ok) {
        setMsg("❌ email non autorisé");
        return;
      }

      // إرسال التعليق
      const res = await fetch("http://localhost:3001/api/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ article_url: articleUrl, email: cleanEmail, content }),
      });

      if (res.ok) {
        setMsg("✅ success commentaire ajouté");
        setContent("");
        refreshComments && refreshComments();
      } else {
        setMsg("❌ ecrire commentaire");
      }
    } catch (err) {
      console.error(err);
      setMsg("❌ erreur serveur");
    }
  };

  return (
    <div className="comment-form">
      <input
        type="email"
        placeholder="Votre email..."
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <textarea
        placeholder="Votre commentaire..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <button onClick={handleSend}>Envoyer</button>
      <p>{msg}</p>
    </div>
  );
}

export default CommentForm;
