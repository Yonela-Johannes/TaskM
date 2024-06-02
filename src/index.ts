import MongoStore from "connect-mongo";
import mongoose from "mongoose";
import express from "express";
import session from "express-session";
import { handleError, notFound } from "./middlewares/errorHandler";
import cors from "cors";
import dotenv from "dotenv";
import routes from "./routes/routes";
import config from "config"
import connect from "./utils/connect";
import swaggerDocs from "./utils/swagger";
 
const port = config.get<number>('port')

const app = express();

dotenv.config()
const dbUri = config.get<string>("dbUri")

app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: "mysecret",
    store: MongoStore.create({
      mongoUrl: dbUri,
      ttl: 12 * 60 * 60
    })
  })
)

app.use(express.json());
app.use(cors({origin: ['http://localhost:5000'], credentials: true}));

app.use("/api/users", routes());

app.listen(port, async () => {
  console.log(`App is running at http://localhost:${port}`)
  
  await connect()
  swaggerDocs(app, port)

  app.use(notFound)
  app.use(handleError)
});

export default app;