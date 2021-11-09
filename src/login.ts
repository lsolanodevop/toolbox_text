class User{
  username: string;
  password: string;
  isValid: boolean;

  constructor(username: string, password: string, isValid: boolean) {
    this.username = username;
    this.password = password;
    this.isValid = isValid;
  }
}

const submitBTN = document.querySelector("#submit")! as HTMLButtonElement;
const userName = document.querySelector("#uname") as HTMLInputElement;
const password = document.querySelector("#pword") as HTMLInputElement;
const modal = document.getElementById("iModal") as HTMLElement;
const span = document.getElementsByClassName("close")[0];
const modalText = document.getElementById("modalText") as HTMLElement;
const modalImg = document.getElementById("modalImg") as HTMLImageElement;
let testUser1 = new User("testUser1", "123456", true);

  
submitBTN.addEventListener("click", (event) => {
  event.preventDefault();
  if (userName.value == testUser1.username && password.value == testUser1.password) {
    const isAValidUser = checkUser(testUser1);
    if (isAValidUser) {
      modal.style.display = "block";
      modalText.innerHTML = "<h2>Hello " + testUser1.username + "</h2>";
      setTimeout(function(){
        window.location.replace("https://dummy.tbxnet.com/q="+testUser1.username);
      }, 2000);
    } 
  }else {
    modalImg.src = "https://images.unsplash.com/photo-1503525537183-c84679c9147f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80";
    modal.style.display = "block";
    modalText.innerHTML = "<h2> Sorry your user is not valid <h/2";
  }
});

span.addEventListener("click", (event) => {
  modal.style.display = "none";
});

window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}
function checkUser(User:User):boolean {
  if (User.isValid) {
    return true;
  } else {
    return false;
  }
}

