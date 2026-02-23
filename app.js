//Importo le varie convenzioni di express che mi servono per lavorare
const express = require("express");
const app = express();
const port = 3000;
const notFound = require("./middlewares/notFound");
const errorsHandler = require("./middlewares/errorsHandler");
//importo i routes
const moviesRoutes = require("./routes/routesMovies");
app.use(express.json());
//Gestisco da qua le routes dei movies così posso gestire le rotte dal file routes
app.use("/movies", moviesRoutes);

//Rotta di home
app.get("/", (req, res) => {
  res.send("ciaone");
});

//Controllo dell'avvio del server
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

app.use(errorsHandler);
app.use(notFound);
/*
app.get("/movies/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const sql = "SELECT * FROM movies WHERE id = ?";
  connection.query(sql, [id], (err, results) => {
    if (err) return res.status(500).json({ error: "Database query failed" });
    res.json(results[0]);
  });
});
*/
