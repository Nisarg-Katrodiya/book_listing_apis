const router = require("../routes");
module.exports = (app) => {
  // define a root/default route
  app.get("/", (req, res) => {
    res.json({
      message: "Hello there!! These are Kabra TS APIs",
      api_helth: "good",
      api_version: "V1.0.0",
    });
  });

  app.use("/api/app", router);

};
