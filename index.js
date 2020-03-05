var productName = document.getElementById("inpName");
var productPrice = document.getElementById("inpPrice");
var productCategory = document.getElementById("inpCat");
var productDesc = document.getElementById("inpDesc");
var products;
var inps = document.getElementsByClassName("form-control");

if (localStorage.getItem("productsContainer") == null) {
    products = [];
}
else {
    products = JSON.parse(localStorage.getItem("productsContainer"));
    displayProducts();
}

function addProduct() {
    var product = {
        name: productName.value,
        price: productPrice.value,
        category: productCategory.value,
        desc: productDesc.value,
    }
    products.push(product);
    displayProducts();
    clearForm();
    saveLocalStorage();
    //    console.log(products);

}

function displayProducts() {
    var temp = "";
    for (var i = 0; i < products.length; i++) {
        temp += `<div class="col-md-4 my-2">
          <div class="item">
            
                <h4>${products[i].name}</h4>
                <h5>${products[i].price}</h5>
                <p>${products[i].category}</p>
                <p>${products[i].desc}</p>
                <button onclick="updateProduct(${i})" class="btn btn-outline-secondary">update</button>
                <button onclick="deleteProduct(${i})" class="btn btn-outline-danger">delete</button>
                </div>
</div>
    `
    }
    document.getElementById("display").innerHTML = temp;
}

function clearForm() {
    for (var i = 0; i < inps.length; i++) {
        inps[i].value = "";
    }
}

function saveLocalStorage() {
    localStorage.setItem("productsContainer", JSON.stringify(products))
}
function deleteProduct(ind) {
    products.splice(ind, 1);
    saveLocalStorage();
    displayProducts();
}
function updateProduct(indx) {
    productName.value = products[indx].name;
    productPrice.value = products[indx].price;
    productCategory.value = products[indx].category;
    productDesc.value = products[indx].desc;

    document.getElementById("myBtn").innerHTML = "update";

    document.getElementById("myBtn").onclick = function () {
        products[indx].name = productName.value;
        products[indx].price = productPrice.value;
        products[indx].category = productCategory.value;
        products[indx].desc = productDesc.value;
        saveLocalStorage();
        clearForm();
        displayProducts();

        var bttn = document.getElementById("myBtn");
        bttn.innerHTML = "Add";
        bttn.onclick = function () {
            addProduct();
            displayProducts();
        }
    }
}
function searchProduct(term)
{
    var temp="";
    for(var i=0 ; i<products.length ; i++)
    {
        if(products[i].name.includes(term))
        {
            temp += `<div class="col-md-4 my-2">
          <div class="item">
            
                <h4>${products[i].name}</h4>
                <h5>${products[i].price}</h5>
                <p>${products[i].category}</p>
                <p>${products[i].desc}</p>
                <button onclick="updateProduct(${i})" class="btn btn-outline-secondary">update</button>
                <button onclick="deleteProduct(${i})" class="btn btn-outline-danger">delete</button>
                </div>
</div>
    `
        }
        document.getElementById("display").innerHTML = temp;
    }
}
