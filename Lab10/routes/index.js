const passwordRoutes = require("./passwordRoutes");

const constructorMethod = app => {
  app.use("/", passwordRoutes);

  app.use("*", (req, res) => {
    res.sendStatus(404);
  });
};

module.exports = constructorMethod;
