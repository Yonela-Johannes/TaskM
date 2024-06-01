import MongoStore from "connect-mongo";
import mongoose, { Promise } from "mongoose";
import express from "express";
import session from "express-session";
import { handleError, notFound } from "./middlewares/errorHandler";
import cors from "cors";
import dotenv from "dotenv";
import user_routes from "./routes/user_routes";

const app = express();
const PORT = process.env.PORT || 5000;

dotenv.config()
app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: "mysecret",
    store: MongoStore.create({
      mongoUrl: process.env.MONGODB_URI,
      ttl: 12 * 60 * 60
    })
  })
)

app.use(express.json());
app.use(cors({origin: ['http://localhost:5000'], credentials: true}));

app.use("/api/users", user_routes());

app.use(notFound)
app.use(handleError)

mongoose.Promise  = Promise;

const mongoUri = process.env.MONGODB_URI;

if (!mongoUri) {
  throw new Error('MONGODB_URI environment variable is not defined');
}

const server = app.listen(PORT, () => {
  mongoose.connect(mongoUri)
    .then(() => console.log("Database connected"))
    .catch((err) => console.log(err.message));
  console.log(`Server is running at http://localhost:${PORT}`)
});
