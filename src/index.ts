import http from "http";
import express from "express";
import knex from "knex";
import carsRouter from "./routes/cars.routes";
import bodyParser from "body-parser";
import { Model } from "objection";

const port = 3000;
const app = express();

const knexInstance = knex({
  client: "pg",
  connection: {
    database: "postgres",
    user: "admin",
    password: "123456", 
    port: 4400
  }
})

Model.knex(knexInstance)

app.set('view engine', 'hbs');
app.engine('html', require('hbs').__express);
app.set("views", "src/views")

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//  /cars -> router
app.use("/cars", carsRouter);

// route testing
app.get("/hello-world", (req, res)=> {
  res.status(200).json({
   message: "Hello World"
  });
});

const server = http.createServer(app);
server.listen(port, ()=> {
 console.log(`API is started at port ${port}`);
});