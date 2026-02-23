const express = require("express");
const router = express.Router();
//Importo i controller dove andrò a gestire la logica di ogni singola chiamata
const moviesController = require("../controllers/moviesControllers");

//ROTTA INDEX chiamo il path "/" perché generico e poi richiamo la la funzione allegata in controller
router.get("/", moviesController.index);

//Rotta showww!!! mi sto a diverti a rifarlo tutto questo
router.get("/:id", moviesController.show);

//ho perso tre ore dalla mia esistenza con questa funzione perché senza pensare ho scritto .get e non .post
router.post("/", moviesController.store);

router.delete("/:id", moviesController.destroy);

//esportooo
module.exports = router;
