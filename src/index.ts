import express, { Express, Request, Response } from "express";
import bodyParser from "body-parser";
import helmet from "helmet";
import dotenv from "dotenv";
import axios from "axios";
import mongoose from "mongoose";
import * as pg from "pg";
const { Client } = pg;
dotenv.config();
// Defining Imports
const PORT = process.env.PORT || 3000;
const app: Express = express();
//Configuring the server
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//Adding the Routes
app.get("/", (req: Request, res: Response) => {
  res.send("<h1> Toolbox Test</h1>");
});
//Create Route creates an User and sending it to save him
app.post("/create", (req: Request, res: Response) => {
  const user = JSON.parse(JSON.stringify(req.query));
  let test: User = new User(user.user, user.name, user.lastName, user.password);
  test.sendUser(test);
});
//GetProduct Gets the Product from a third party API
app.get("/getProduct/:id", (req: Request, res: Response) => {
  
  const productID = parseInt(req.params.id);
  getProduct(productID);
});
// CheckProduct Checks the availability from a third Party API
app.get("/checkProduct/:id/description/:description", (req: Request, res: Response) => {
  const productID = parseInt(req.params.id);
  const productDescription = req.params.description;
  let Product: Producto = new Producto(productID, productDescription, ProductStatus.Available);
  Product.uploadProduct(Product);
});
// Where the API will listen 
app.listen(PORT, () => console.log(`Running on ${PORT} ⚡`));
//Class for managing the Users  
class User {
  username: string;
  name: string;
  lastName: string;
  password: string;
//Constructor of a new User
  constructor(username: string, name:string, lastName:string,password:string) {
    this.username = username;
    this.name = name;
    this.lastName = lastName;
    this.password = password;
  }
//Function for sending the user to a Third Party API
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
//Class for managing products
 class Producto{
  id: number;
  description: string;
  status: ProductStatus;
//Constructor for a new Product
  constructor(id:number, description: string, status: ProductStatus) {
    this.id = id;
    this.description = description;
    this.status = status;
  }

  //Creating a new Product in a third party API
  public uploadProduct(Product: Producto) {
    axios.post("http://serviciodetercero.com/upload/product", {
      Id: Product.id,
      Description: Product.description,
      Status: Product.status
    })
      .then(response => {
        if (response.status == 200) {
          console.log("The Product was Upload Succesfully");
        }
      }).catch(error => {
        //Catching the errors
        const log = error.code;
        if (log == "ENOTFOUND") {
          console.log("Cannot reach: " + error.hostname); 
        } else if (log == "403") {
          console.log("Cannot reach the server"); 
        } else if (log == "401") {
          console.log("Cannot reach the server"); 
        }
      });
  }
   
}
//Enum for Product Status
enum ProductStatus{
  Available,
  Reserved,
  OutOfStock
}
// Function for checking a specific product
function getProduct(productID: number) {
  axios.get("http://serviciodetercero.com/getProduct/"+productID).then(res => {
      console.log(res);
    }).catch(error => {
      const log = error.code;
        if (log == "ENOTFOUND") {
          console.log("Cannot reach: " + error.hostname); 
        } else if (log == "PD-001") {
          console.log(" The Product you are searching for does not exists ");
        } else if (log == "PD-002") {
          console.log(" The Product you are searching exists but is reserved");
        } else if (log == "PD-003") {
          console.log(" The Product you are searching exists but is out of stock");
        }
    });
}
// Exercise 3
function connectBD(ip:string,port:string,IsMongoConnection:boolean) {
  if (IsMongoConnection == true) {
    mongoose.connect("mongodb://" + ip + ":" + port + "/toolTest");
    const status = mongoose.connection.readyState;
    if (status == 1) { 
      console.log("You are connected to the DB");
    } else if(status == 2){
      console.log("You are connecting to the DB");
    } else if (status == 3) {
      console.log("You are disconnecting to the DB");
    } else {
      console.log("You are not connected to the DB")
    }
  } else{
    const client = new Client({
      user: "testUser",
      host: ip,
      database: "toolTest",
      password: "testUser",
      port: parseInt(port)
    });
    client.connect(err => {
      if (err) {
        console.log("Could not find the Database", err);
      } else {
        console.log("Connected to the Database");
      }
    });
  }
}