const run = require("./app");
const dotenv = require("dotenv");
dotenv.config();
const port = process.env.PORT || 5000;

run()
  .then((app) => {
    app.listen(port, () => console.log(`Server listening on port ${port}`));
  })
  .catch((error) => {
    console.error("An error occurred during initialization:", error);
  });
