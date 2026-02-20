const express = require("express");
const app = express();
const port = 3000;

//IMPORTO un attimo qui per provare la rotta di index
const connection = require("./data/db");

app.get("/", (req, res) => {
  res.send("ciaone");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

app.get("/movies", (req, res) => {
  const sql = "SELECT * FROM movies";
  //proviamo qua prima se funziona la rotta index
  connection.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: "Database query failed" });
    res.json(results);
  });
});
