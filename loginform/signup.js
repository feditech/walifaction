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

let signup = ()=> {
    let email=document.getElementById("email");
    let password=document.getElementById("password");
    let username = document.getElementById("username");
    let phone = document.getElementById("phone")
    firebase.auth().createUserWithEmailAndPassword(email.value, password.value)
  .then((userCredential) => {
    // Signed in 
    var user = userCredential.user;
    firebase.database().ref(`users/${user.uid}`).set({
      Email: email.value,
      UserName: username.value,
      Phone: phone.value 
    }).then(()=>{
      setTimeout(()=>{
        window.location = "../loginform/login.html"
    },0)
    })
    

 swal("Good job!", "Sign up Successful", "success");
   
  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log(errorMessage)
    swal( errorMessage, "try again");
    // ..
  });
}



