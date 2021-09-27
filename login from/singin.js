// **** h1 function****
let headings = ['Shorts ', 'jeans', 'Denim ','Kid','Women'];
let i = 0;
let intervalId = setInterval(function() {
  document.getElementById('heading').innerHTML = headings[i];
  if (i == (headings.length - 1)) {
    i = 0;
    //you can even clear interval here to make heading stay as Price one in array
    //cleanInterval(intervalId);

  } else {
    i++;
  }
}, 2000)

// *** h1 function End ***


// FIRE BASE AUTH FOR SING UP *********** 

let singin = ()=> {
    let email=document.getElementById("email");
    let password=document.getElementById("password");
    firebase.auth().createUserWithEmailAndPassword(email.value, password.value)
  .then((userCredential) => {
    // Signed in 
    var user = userCredential.user;
    console.log(userCredential)
    setTimeout(()=>{
      window.location = "../login from/login-from.html"
  },2000)

 swal("Good job!", "You clicked the button!", "success");
   
  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log(errorMessage)
    swal( errorMessage, "try again");
    // ..
  });
}



