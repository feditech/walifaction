// let checkAuth = () => {
//     firebase.auth().onAuthStateChanged((user) => {
//         if (user) {
//             firebase.database().ref(`restaurant/${user.uid}`).once('value', (data) => {
//                 if (data.val()) {
//                 } else {
//                     window.location = "profile.html"
//                 }
//             })
//         } else {
//             window.location = "login.html"
//         }
//     })
// }

let uploadFiles = (file) => {
    return new Promise((resolve, reject) => {
        let storageRef = firebase.storage().ref(`myfolder/todayImages/${file.name}`);
        let uploading = storageRef.put(file)
        uploading.on('state_changed',
            (snapshot) => {
                switch (snapshot.state) {
                    case firebase.storage.TaskState.PAUSED:
                        console.log('Upload is paused');
                        break;
                    case firebase.storage.TaskState.RUNNING:
                        console.log('Upload is running');
                        break;
                }
            },
            (error) => {
                reject(error)
            },
            () => {
                uploading.snapshot.ref.getDownloadURL().then((downloadURL) => {
                    resolve(downloadURL)
                });
            }
        );
    })
}

// let logout = () => {
//     firebase.auth().signOut()
//         .then(() => {
//             window.location = "login.html"
//         })
// }

// let getUID = () => {
//     return new Promise((resolve) => {
//         firebase.auth().onAuthStateChanged((user) => {
//             if (user) {
//                 resolve(user.uid)
//             }
//         })
//     })
// }

let addItem = async () => {
    let itemName = document.getElementById("itemName")
    let itemPrice = document.getElementById("itemPrice")
    let itemCategory = document.getElementById("itemCategory")
    let dType = document.getElementById("dType")
    let iImage = document.getElementById("iImage")
    let closeBtn = document.getElementById("closeBtn")
    // let uid = await getUID()
    let product = {
        name: itemName.value,
        price: itemPrice.value,
        category: itemCategory.value,
        dType: dType.value,
        image: await uploadFiles(iImage.files[0]),
    }
    firebase.database().ref(`products/${itemCategory.value}`).push(product)
        .then(() => {
            closeBtn.click()
        })
}


let getProducts = () => {
    getMenProducts();
    getWomenProducts();
    getKidsProducts();
}
let getMenProducts = async () => {
    let count = 1;
    let allProducts = document.getElementById('allProducts')
    firebase.database().ref(`products/men`).on('child_added', (data) => {
        let productId = data.key;
        let category = data.val().category;
        allProducts.innerHTML += `
        <tr>
        <th scope="row">${count}</th>
        <td>
            <img class="dish-image" width="50"
                src="${data.val().image}" />
        </td>
        <td>${data.val().name}</td>
        <td>Rs ${data.val().price}</td>
        <td>${data.val().category}</td>
        <td><button class="mybutton" onclick="deleteProduct('${productId}','${category}')" > Delete </button></td>
        
    </tr>
        `
        count++
    })
}
let getWomenProducts = async () => {
    let count = 1;
    let allProducts = document.getElementById('allProducts')
    firebase.database().ref(`products/women`).on('child_added', (data) => {
        let productId = data.key;
        let category = data.val().category;
        allProducts.innerHTML += `
        <tr>
        <th scope="row">${count}</th>
        <td>
            <img class="dish-image" width="50"
                src="${data.val().image}" />
        </td>
        <td>${data.val().name}</td>
        <td>Rs ${data.val().price}</td>
        <td>${data.val().category}</td>
        <td><button class="mybutton" onclick="deleteProduct('${productId}','${category}')" > Delete </button></td>    
    </tr>
        `
        count++
    })
}
let getKidsProducts = async () => {
    let count = 1;
    let allProducts = document.getElementById('allProducts')
    firebase.database().ref(`products/kids`).on('child_added', (data) => {
        let productId = data.key;
        let category = data.val().category;
        allProducts.innerHTML += `
        <tr>
        <th scope="row">${count}</th>
        <td>
            <img class="dish-image" width="50"
                src="${data.val().image}" />
        </td>
        <td>${data.val().name}</td>
        <td>Rs ${data.val().price}</td>
        <td>${data.val().category}</td>
        <td><button class="mybutton" onclick="deleteProduct('${productId}','${category}')" > Delete </button></td>
        
    </tr>
        `
        count++
    })
}
let deleteProduct = (productid, category) => {
    firebase.database().ref(`products/${category}/${productid}`).remove()
    window.location = "#"
}







let getOrders = async (status) => {
    console.log(status)
    // let uid = await getUID();
    let orderList = document.getElementById('order-list')
    firebase.database().ref(`orders`).on('child_added', (data) => {
        firebase.database().ref(`users/${data.val().customerUID}`).once('value', (snapshot) => {
            let orderDetail = { customer: { ...snapshot.val() }, order: { ...data.val() } }
            let orderid= data.key
            let customerEmail = snapshot.val().Email;
            if (status === orderDetail.order.OrderStatus) {

                orderList.innerHTML += `
                <tr>
                <th scope="row">1</th>
                <td>${orderDetail.customer.UserName}</td>
                <td>${orderDetail.customer.Email}</td>
                <td><span class="${orderDetail.order.OrderStatus === 'pending' ? 'pending-status': orderDetail.order.OrderStatus === "accepted" ? 'status-accepted' : "status-delivered"}">${orderDetail.order.OrderStatus}</span></td>
                <td>
                <button data-toggle="modal" data-target="#exampleModal"
                class="small-btn">View</button>
                <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog"
                aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog" role="document">
                <div class="modal-content">
                <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Order Details
                </h5>
                <button type="button" class="close" data-dismiss="modal"
                aria-label="Close">
                <span aria-hidden="true">&times;</span>
                </button>
                </div>
                <div class="modal-body">
                <table class="table">
                <tr>
                <th scope="col">#</th>
                <th scope="col">Image</th>
                <th scope="col">Name</th>
                <th scope="col">Price</th>
                <th scope="col">Qty</th>
                </tr>
                <tr>
                <td>1</td>
                <td>
                <img class="dish-image" width="50" src="${orderDetail.order.Image}" />
                </td>
                <td>${orderDetail.order.ItemName}</td>
                <td>Rs ${orderDetail.order.Price}</td>
                <td>Rs ${orderDetail.order.Quantity}</td>
                </tr>
                </table>
                </div>
                <div class="modal-footer">
                <button type="button" id="modalclose" class="mybutton"
                data-dismiss="modal">Close</button>
                <button onclick="accepted('${customerEmail}','${orderid}')" type="button" class="mybutton">Accept Order</button>
                </div>
                </div>
                </div>
                </div>
                </td>
                </tr>
                `
            }
        })
    })
}

let accepted= (customerEmail,orderid)=>{
    firebase.database().ref(`orders/${orderid}`).update(
        {OrderStatus: 'accepted'}
    )
    document.getElementById("modalclose").click()
    setTimeout(()=>{
        window.open(`mailto:${customerEmail}?subject=order accepted&body=congratulation Your order is accepted`);
      },2000)
       
    
    }  


// let rejected= ()=>{
//     firebase.database().ref(`orders/${orderid}`).update(
//         {OrderStatus: 'accepted'}
//     )
//     document.getElementById("modalclose").click()
//     setTimeout(()=>{
//         window.open(`mailto:${customerEmail}?subject=order accepted&body=congratulation Your order is accepted`);
//       },2000)
       
   
// }


let delivered= ()=>{
    firebase.database().ref(`orders/${orderid}`).update(
        {OrderStatus: 'delivered'}
    )
    setTimeout(()=>{
        document.getElementById("modalclose").click()
        window.open(`mailto:${customerEmail}?subject=order Delivered&body=congratulation Your order is delivered`);
      },2000)
       
   
}