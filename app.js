//Importo le varie convenzioni di express che mi servono per lavorare
const express = require("express");
const app = express();
require("dotenv").config();
//poliziaaa cors!!!
const cors = require("cors");
const port = process.env.PORT;
//middlewares
const notFound = require("./middlewares/notFound");
const errorsHandler = require("./middlewares/errorsHandler");
//importo i routes
const moviesRoutes = require("./routes/routesMovies");

app.use(cors({ origin: "http://localhost:5174" }));
app.use(express.json());
app.use(express.static("public"));
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
