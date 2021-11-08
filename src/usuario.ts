export class User{
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

  public getUser() {
    return "Hello" + this.username;
  }
}