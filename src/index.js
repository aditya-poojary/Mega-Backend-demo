// require('dotenv').config({path: './env'})

import connectDB from "./db/index.js"
import dotenv from "dotenv"
import app from "./app.js"

dotenv.config({
  path: './.env'
})

connectDB()
  .then(() => {
    app.listen(process.env.PORT || 8000)
    console.log("Database is connected!!",process.env.PORT)
  })
  .catch((err) => {
    console.log("Error while connect!!", err)
  })
















/*
async () => {
  try {
    mongoose.connect(`${process.env.MONGODB_URI}`);
    app.on("error", (error) => {
      console.log("Error: ", error);
      throw error;
    });
    app.listen(process.env.PORT, () => {
      console.log(`App is listening on port ${process.env.PORT}`);
    });
  } catch (error) {
    console.error("Error: ", error);
    throw error;
  }
};
*/