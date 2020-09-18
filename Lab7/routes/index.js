const postRoutes = require("./posts");
const animalsRoutes = require("./animals");

const constructorMethod = app => {
  app.use("/posts", postRoutes);
  app.use("/animals", animalsRoutes);

  app.use("*", (req, res) => {
    res.sendStatus(404);
  });
};

module.exports = constructorMethod;
