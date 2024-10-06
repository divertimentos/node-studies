function haltMiddleware(app) {
  app.use((req, res, next) => {
    res.status(401);
    console.log("Execution halted!");
    res.send("Execution halted!");
  });
}

export default haltMiddleware;
