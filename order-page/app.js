firebase.auth().onAuthStateChanged(user => {
    if (user) {
        let loginlink = document.getElementById("loginlink")
        loginlink.innerHTML = `<a style="cursor:pointer" onclick="signout()"> Signout </a>`
    }
    else {
        let loginlink = document.getElementById("loginlink")
        loginlink.innerHTML = `<a href="../loginform/login.html">login</a>`
        alert("login to place order")
        window.location = '../loginform/login.html'
    }
});
let signout = () => {
    firebase.auth().signOut().then(() => {
        // Sign-out successful.
        alert("signout called")
        let loginlink = document.getElementById("loginlink")
        loginlink.innerHTML = `<a href="../loginform/login.html">login</a>`

    }).catch((error) => {
        // An error happened.
    });
}

let getUid = new Promise((resolve, reject) => {
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            resolve(user.uid)
        }
        else {
            reject(err)
        }
    });
})
    .then((uid) => uid);

console.log(getUid.then()
)


let orderData = ()=>{
    let cred = window.location.hash.slice(1)
    let commaindex = cred.indexOf(',')
    let category = cred.slice(0, commaindex)
    let productid = cred.slice(commaindex + 1)
    
    let ordersection = document.getElementById("ordersection")
    
    firebase.database().ref(`products/${category}/${productid}`).on("value", (data) => {
    
        ordersection.innerHTML = `<div class="s1-div1">
        <img src="${data.val().image}" alt="">
    </div>
    
    <div class="s1-div2">
        <div>
            <div class="in-stock">In stock
            </div>
    
        </div>
        <div>
            <h4 class="h4-h">${data.val().name} </h4>
        </div>
        <div>
            <h4 class="h4-p">${data.val().price}</h4>
    
        </div>
        <hr>
    
        <div>
    
            <h6>QUANTITY</h6>
            <div class="input-d"> 
            <input id="quantity" class="input-q" type="number" value=1 name="test_name" min="1" oninput="validity.valid||(value=1);">
                        
            </div>
            <div><button class="b1" onclick="addTocart('${data.val().name}','${data.val().price}','${data.val().image}')" >Add To Cart</button></div>
            <div><button class="b1" onclick="addToWishlist('${data.val().name}','${data.val().price}','${data.val().image}')">Add To Wishlist</button></div>
            <div><button class="b2">BUY IT NOW</button></div>
        </div>
    
        <div>
            <div class="money-t">
                <img src="pic/money/visa_50x.png" alt="">
                <img src="pic/money/nnnnn_51x.png" alt="">
                <img src="pic/money/images_50x.png" alt="">
                <img src="pic/money/new-bank_50x.png" alt="">
                <img src="pic/money/jazzcash_51x.progressive.jpg" alt="">
            </div>
        </div>
    
    </div>
     `
    
    })
    


}

let addTocart = (name, price, image) => {
    alert("add to cart")
    let qty = document.getElementById("quantity").value
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            firebase.database().ref(`users/${user.uid}/cart`).push({
                ItemName: name,
                Price: price,
                Quantity: qty,
                Image: image
            })
        }
    });



}

let addToWishlist = (name, price, image) => {
    alert("added to wish list")
    let qty = document.getElementById("quantity").value
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            alert(user.uid)
            firebase.database().ref(`users/${user.uid}/wishlist`).push({
                ItemName: name,
                Price: price,
                Quantity: qty,
                Image: image
            })
        }
    });

}


let getcart = () => {
    let cartdiv = document.getElementById("cartdiv")
    cartdiv.innerHTML = "<h1> My cart </h1>"
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            firebase.database().ref(`users/${user.uid}/cart`).on('child_added', (data) => {
                let Userid= user.uid;
                let Orderid= data.key;
                cartdiv.innerHTML += `<ul>
            <li> <img height='40px' width='40px' src='${data.val().Image}' /> </li>
            <li>Price: ${data.val().Price} </li>
            <li>Name: ${data.val().ItemName} </li>
            <li>Qty: ${data.val().Quantity} </li>
            <li><button onclick="buynow('${Userid}','cart','${Orderid}')">Buy Now</button> </li>
            </ul>`
            })
        }
    });
}

let getwishlist = () => {
    let wishlistdiv = document.getElementById("wishlistdiv")
    wishlistdiv.innerHTML = "<h1> My wish list </h1>"
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            firebase.database().ref(`users/${user.uid}/wishlist`).on('child_added', (data) => {
                let Userid= user.uid;
                let Orderid= data.key; 
                wishlistdiv.innerHTML += `<ul>
            <li> <img height='40px' width='40px' src='${data.val().Image}' /> </li>
            <li>Price: ${data.val().Price} </li>
            <li>Name: ${data.val().ItemName} </li>
            <li>Qty: ${data.val().Quantity} </li>
            <li> <button onclick="buynow('${Userid}','wishlist','${Orderid}')">Buy Now</button></li>
            </ul>`
            })
        }
    });
}


let buynow = (userid,list,orderid) => {
    console.log(userid,list,orderid)
    let ref = firebase.database().ref(`users/${userid}/${list}/${orderid}`)
    ref.once("value",(data)=>{
        console.log(data.val())
        firebase.database().ref(`orders/${orderid}`).set({
            ItemName: data.val().ItemName,
            Price: data.val().Price,
            Quantity: data.val().Quantity,
            Image: data.val().Image,
            OrderStatus: 'pending',
            customerUID: userid
        }).then(()=>{
            alert("Order placed ")
            ref.remove();
        })
    })
    
}

