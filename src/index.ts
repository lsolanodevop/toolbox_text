import express, { Express, Request, Response } from "express";
import bodyParser from "body-parser";
import helmet from "helmet";
import dotenv from "dotenv";
import axios from "axios";
dotenv.config();

const PORT = process.env.PORT || 3000;
const app: Express = express();

app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req: Request, res: Response) => {
  res.send("<h1> Toolbox Test</h1>");
});

app.post("/create", (req: Request, res: Response) => {
  const user = JSON.parse(JSON.stringify(req.query));
  let test: User = new User(user.user, user.name, user.lastName, user.password);
  test.sendUser(test);
});

app.get("/getProduct/:id", (req: Request, res: Response) => {
  
  const productID = parseInt(req.params.id);
  getProduct(productID);
});

app.get("/checkProduct/:id/description/:description", (req: Request, res: Response) => {
  const productID = parseInt(req.params.id);
  const productDescription = req.params.description;
  let Product: Producto = new Producto(productID, productDescription, ProductStatus.Available);
  Product.uploadProduct(Product);
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

 class Producto{
  id: number;
  description: string;
  status: ProductStatus;

  constructor(id:number, description: string, status: ProductStatus) {
    this.id = id;
    this.description = description;
    this.status = status;
  }

   
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

enum ProductStatus{
  Available,
  Reserved,
  OutOfStock
}

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