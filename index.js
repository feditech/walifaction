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


  let =  mouseout=() => {
    document.getElementById("hover").style.display = "none";
   }
   let =  mouseout3=() => {
    document.getElementById("hover3").style.display = "none";
   }
   let =  mouseout1=() => {
    document.getElementById("hover1").style.display = "none";
   }


var data = [
    {
        
        brand: "Camou Flage - Micro Fibre Trouser  ",
        price: 7000,
        url: '/indexcardpic/p.jpg'
    },
    {
        brand: "Men Hood",
        price: 400,
        url: '/indexcardpic/h1.jpg'
    },
    {
        brand: "Men's - R.M.E.C Polo T-Shirt (9)",
        price: 250,
        url: '/indexcardpic/t2.jpg'
    },
    {
        brand: "Women Comfortable Pajama",
        price: 1500,
        url: '/indexcardpic/s5.jpg'
    },
    {
        brand: "Women Comfortable Pajama Suits",
        price: 500,
        url: '/indexcardpic/t5.jpg'
    },
    {
        brand: "Men's - R.M.E.C Polo T-Shirt",
        price: 2500,
        url: '/indexcardpic/t4.jpg'
    },
    {
        brand: "K-Junction Jogger Pants",
        price: 2000,
        url: '/indexcardpic/s4.jpg'
    },
    {
        brand: "KEENNETH COLE (Cargo- Fleece Shorts)",
        price: 5000,
        url: '/indexcardpic/s1.jpg'
    },
 
 
 
 
 
 
 
 
];



var products = document.getElementById("products");
for (var i = 0; i < data.length; i++) {
    products.innerHTML += `
    <div class="card" style="width: 18rem;">
  <img src="${data[i].url}" class="card-img-top" alt="...">
  <div class="card-body">
    <h5 class="card-title">${data[i].brand}</h5>
    
    <a href="../oder-page/oder.html" onclick="addToCart(${i})" class="btn btn-primary">Oder now</a>
  </div>
</div>
    `
}

let addToCart = (i) => {
    console.log(data[i])
}
