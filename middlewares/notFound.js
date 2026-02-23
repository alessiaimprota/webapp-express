function notFound(req, res, next) {
  res.status(404);

  res.json({
    error: "not found",
    messagge: "pagina non trovata",
  });
}

module.exports = notFound;
