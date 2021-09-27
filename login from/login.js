let login = ()=> {
    let email=document.getElementById("email");
    let password=document.getElementById("password");
    console.log(email.value)
    console.log(password.value)

    firebase.auth().signInWithEmailAndPassword(email.value, password.value)
  .then((userCredential) => {
    // Signed in
    var user = userCredential.user;
    console.log("user login sucessfuly")
    setTimeout(()=>{
      window.location = "../index.html"
  },2000)

 swal("Good job!", "You clicked the button!", "success");
   
    // ...
  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log(errorMessage)
    swal( errorMessage, "try again");
  });
}