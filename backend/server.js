const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());
app.use(express.json());

const pool = require("./db");

// Verify email against allowed_emails
app.post("/api/verify-email", async (req, res) => {
  try {
    const { email } = req.body;
    console.log("Verifying email:", email);
    if (!email)
      return res.status(400).json({ ok: false, msg: "email required" });

    const [rows] = await pool.query(
      "SELECT id FROM allowed_emails WHERE email = ?",
      [email]
    );
    console.log("Rows returned:", rows);
    if (rows.length > 0) return res.json({ ok: true });

    return res.status(401).json({ ok: false, msg: "Email not allowed" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ ok: false, msg: "server error" });
  }
});

// Add comment
app.post("/api/comments", async (req, res) => {
  try {
    const { article_url, email, content } = req.body;
    if (!article_url || !email || !content)
      return res.status(400).json({ ok: false, msg: "missing fields" });

    const [rows] = await pool.query(
      "SELECT id FROM allowed_emails WHERE LOWER(email) = ?",
      [email.toLowerCase()]
    );

    if (rows.length === 0)
      return res.status(401).json({ ok: false, msg: "Email not allowed" });

    await pool.query(
      "INSERT INTO comments (article_url, email, content, approved) VALUES (?, ?, ?, ?)",
      [article_url, email, content, true]
    );

    return res.json({ ok: true, msg: "comment added" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ ok: false, msg: "server error" });
  }
});

// Get comments for article
app.get("/api/comments", async (req, res) => {
  try {
    const { article_url } = req.query;
    if (!article_url)
      return res.status(400).json({ ok: false, msg: "article_url required" });

    const [rows] = await pool.query(
      "SELECT email, content, created_at FROM comments WHERE article_url = ? AND approved = TRUE ORDER BY created_at DESC",
      [article_url]
    );

    return res.json({ ok: true, comments: rows });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ ok: false, msg: "server error" });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log("Backend running on port", PORT));
