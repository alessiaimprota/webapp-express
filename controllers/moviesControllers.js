const { connect } = require("../routes/routesMovies");
const connection = require("../data/db");

function index(req, res) {
  //Stringa di sql
  const sql = "SELECT * FROM movies";
  //Chiamata all'index dei film con gestione di errore
  connection.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: "Database query failed" });
    res.json(results);
  });
}

function show(req, res) {
  //id nella richiesta da passare alla chiamata
  const id = parseInt(req.params.id);
  //Stringa sql
  const moviesSql = "SELECT * FROM movies WHERE id = ?";
  //Chiamata con gestione di errore più gestione errore in caso di id fallace
  connection.query(moviesSql, [id], (err, movieResult) => {
    if (err) return res.status(500).json({ error: "Database query failed" });
    if (movieResult.length === 0)
      return res.status(404).json({ error: "Movie not found" });
    //Salviamo il risultato di movieResult in una costante per usarlo in relazione alle reviews
    const movie = movieResult[0];
    //Salviamo la stringa sql per le reviews
    const reviewsSql = "SELECT * FROM reviews WHERE movie_id = ?";
    //

    connection.query(reviewsSql, [id], (err, reviewsResults) => {
      if (err) return res.status(500).json({ error: "Database query failed" });
      //Salviamo l'obj in un array
      const reviewsArray = reviewsResults;
      movie.reviews = reviewsArray;
      res.json(movie);
    });
  });
}

//esporto
module.exports = { index, show };
