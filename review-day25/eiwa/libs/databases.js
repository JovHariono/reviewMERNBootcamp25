const mongoose = require("mongoose");
const chalk = require("chalk");

function DatabaseMongoDBConnector({hideSuccessMessage=false}) {
  mongoose
    .connect(
      `${process.env.DB_CONNECTION}://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}`
    )
    .then(() => {
      if (!hideSuccessMessage) {
        console.log(chalk.greenBright(`connecting database successfully`));
      }
    })
    .catch((error) => {
      console.log(chalk.redBright(`connecting database failed`), error);
      process.exit(1);
    });
}

module.exports = {
  DatabaseMongoDBConnector,
};
