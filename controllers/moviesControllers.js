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
  //GESTIONE PRIMA ALLA CHIAMATA DEL FILM

  //qui mi gestisco id e chiamata in stringa in sql
  const id = parseInt(req.params.id);
  const moviesSql = "SELECT * FROM movies WHERE id = ?";

  //Chiamata con gestione di errore più gestione errore in caso di id fallace
  connection.query(moviesSql, [id], (err, movieResult) => {
    if (err) return res.status(500).json({ error: "Database query failed" });
    if (movieResult.length === 0)
      return res.status(404).json({ error: "Movie not found" });

    //Salviamo il risultato di movieResult in una costante per usarlo in relazione alle reviews
    const movie = movieResult[0];

    //GESTIONE CHIAMA REVIEWS IN RELAZIONE AL LIBRO
    //Salviamo la stringa sql per le reviews
    const reviewsSql = "SELECT * FROM reviews WHERE movie_id = ?";
    connection.query(reviewsSql, [id], (err, reviewsResults) => {
      if (err) return res.status(500).json({ error: "Database query failed" });
      //Salviamo l'obj in un array
      const reviewsArray = reviewsResults;
      movie.reviews = reviewsArray;
      res.json(movie);
    });
  });
}

function store(req, res) {
  //recupero dati dalla richiesta
  const {
    title,
    director,
    genre,
    release_year,
    abstract,
    image,
    created_at,
    updated_at,
  } = req.body;

  //preparo la striga sql
  const sql = `
  INSERT INTO movies (title, director, genre, release_year, abstract, image, created_at, updated_at)
  VALUES ( ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  //Chiamata
  connection.query(
    sql,
    [
      title,
      director,
      genre,
      release_year,
      abstract,
      image,
      created_at,
      updated_at,
    ],
    //GESTIONE ERRORE
    (err, results) => {
      if (err) return res.status(500).json({ error: "Query failed" });

      //RECUPERO ID GENERATO DAL DB
      const movieId = results.insertId;
      //QUERY PER MOSTRARMI CHE L'HA POSTATO
      const movieSql = `SELECT * FROM movies where id= ${movieId}`;
      connection.query(movieSql, [movieId], (err, movieResult) => {
        if (err) return res.status(500).json({ error: "data query failed" });
        if (movieResult.length === 0)
          return res.status(404).json({ error: "data not found" });
        res.status(201).json(movieResult[0]);
      });
    },
  );
}

//esporto
module.exports = { index, show, store };
