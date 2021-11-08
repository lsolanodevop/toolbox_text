import express, { Express, Request, Response } from "express";
import bodyParser from "body-parser";
import helmet from "helmet";
import dotenv from "dotenv";
import axios from "axios";
// import { User } from "./usuario";
dotenv.config();

const PORT = process.env.PORT || 3000;
const app: Express = express();

app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req: Request, res: Response) => {
  res.send("<h1> Hello from the Typescript world!</h1>");
});

app.post("/create", (req: Request, res: Response) => {
  const user = JSON.parse(JSON.stringify(req.query));
  let test: User = new User(user.user, user.name, user.lastName, user.password);
  test.sendUser(test);
});

app.listen(PORT, () => console.log(`Running on ${PORT} ⚡`));

class User {
  username: string;
  name: string;
  lastName: string;
  password: string;

  constructor(username: string, name:string, lastName:string,password:string) {
    this.username = username;
    this.name = name;
    this.lastName = lastName;
    this.password = password;
  }

  public sendUser(User:User) {

    axios.post("http://serviciodetercero.com/connect/upload", {
      Username: User.username,
      Name: User.name,
      LastName: User.lastName,
      Password: User.password
    })
      .then(response => {
        console.log(response);
      }).catch(error => {
        const log = error.code;
        if (log == "ENOTFOUND") {
          console.log("Cannot reach: " + error.hostname); 
        }
      });
  }
}