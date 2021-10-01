
firebase.auth().onAuthStateChanged(user => {
    if(user){
       // update Newsitems
        console.log(user)
        let loginlink = document.getElementById("loginlink")
        loginlink.innerHTML= `<a style="cursor:pointer" onclick="signout()"> Signout </a>`  
    } 
    else{
        let loginlink = document.getElementById("loginlink")
        loginlink.innerHTML= `<a href="/loginform/login.html">login</a>`
    }
 });


let signout= ()=>{
 firebase.auth().signOut().then(() => {
    // Sign-out successful.
    swal("User logged out")
    let loginlink = document.getElementById("loginlink")
    loginlink.innerHTML= `<a href="/loginform/login.html">login</a>`
  }).catch((error) => {
    // An error happened.
  });
}
// CARD FUNCTION *************


let mousehover = () => {
    document.getElementById("hover").style.display = "block";
}
let mousehover3 = () => {
    document.getElementById("hover3").style.display = "block";
}
let mousehover1 = () => {
    document.getElementById("hover1").style.display = "block";
}
let = mouseout = () => {
    document.getElementById("hover").style.display = "none";
}
let = mouseout3 = () => {
    document.getElementById("hover3").style.display = "none";
}
let = mouseout1 = () => {
    document.getElementById("hover1").style.display = "none";
}


// var data = [
//     {

//         brand: "Camou Flage - Micro Fibre Trouser  ",
//         price: 7000,
//         url: '/indexcardpic/p.jpg'
//     },
//     {
//         brand: "Men Hood",
//         price: 400,
//         url: '/indexcardpic/h1.jpg'
//     },
//     {
//         brand: "Men's - R.M.E.C Polo T-Shirt (9)",
//         price: 250,
//         url: '/indexcardpic/t2.jpg'
//     },
//     {
//         brand: "Women Comfortable Pajama",
//         price: 1500,
//         url: '/indexcardpic/s5.jpg'
//     },
//     {
//         brand: "Women Comfortable Pajama Suits",
//         price: 500,
//         url: '/indexcardpic/t5.jpg'
//     },
//     {
//         brand: "Men's - R.M.E.C Polo T-Shirt",
//         price: 2500,
//         url: '/indexcardpic/t4.jpg'
//     },
//     {
//         brand: "K-Junction Jogger Pants",
//         price: 2000,
//         url: '/indexcardpic/s4.jpg'
//     },
//     {
//         brand: "KEENNETH COLE (Cargo- Fleece Shorts)",
//         price: 5000,
//         url: '/indexcardpic/s1.jpg'
//     },








// ];





let getProducts = () => {
    getMenProducts();
    getWomenProducts();
    getKidsProducts();
}
let getMenProducts = async () => {
    let products = document.getElementById('products')
    firebase.database().ref(`products/men`).on('child_added', (data) => {
        let productId = data.key;
        let category = data.val().category;
        products.innerHTML += `
        <div class="card" style="width: 18rem;">
  <img src="${data.val().image}" class="card-img-top" alt="...">
  <div class="card-body">
    <h5 class="card-title">${data.val().name}</h5>
    
    <a onclick="buy('${productId}','${category}')" class="btn btn-primary">Buy</a>
  </div>
</div>
        `

    })
}

let getWomenProducts = async () => {
    let products = document.getElementById('products')
    firebase.database().ref(`products/women`).on('child_added', (data) => {
        let productId = data.key;
        let category = data.val().category;
        products.innerHTML += `
        <div class="card" style="width: 18rem;">
  <img src="${data.val().image}" class="card-img-top" alt="...">
  <div class="card-body">
    <h5 class="card-title">${data.val().name}</h5>
    <a onclick="buy('${productId}','${category}')" class="btn btn-primary">Buy</a>
  </div>
</div>
        `

    })
}
let getKidsProducts = async () => {
    let products = document.getElementById('products')
    firebase.database().ref(`products/kids`).on('child_added', (data) => {
        let productId = data.key;
        let category = data.val().category;
        products.innerHTML += `
        <div class="card" style="width: 18rem;">
  <img src="${data.val().image}" class="card-img-top" alt="...">
  <div class="card-body">
    <h5 class="card-title">${data.val().name}</h5>
    <a onclick="buy('${productId}','${category}')" class="btn btn-primary">Buy</a>

  </div>
</div>
        `
    })
}






















let buy = (productid,category) => {
    
    window.location = `../order-page/order.html#${[category,productid]}` 
}
