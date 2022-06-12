let basket = JSON.parse(localStorage.getItem("data")) || [];
let ShopingCart = document.getElementById("shoping-cart")

// Calculation
let calculation = ()=> {
    let cartIcon = document.getElementById("cart-amount")
    cartIcon.innerHTML = basket.map((x)=> x.item).reduce((x,y)=> x+ y, 0)
}
  
calculation()


let generateCart = ()=> {
    if(basket.length !== 0){
        return ShopingCart.innerHTML = basket.map((x)=>{
            let {id, item} = x
            let search = shopItemsData.find((x)=>x.id === id) || []
            let {img,name,price} = search
            return `
                <div class="cart-item">
                    <img width="100" src=${img} alt="" />
                    <div class="details">
                        <div class="title-price-x">

                            <h4 class="title-price">
                                <p>${name}</p> 
                                <p class="cart-item-price">$ ${price}</p> 
                            </h4>
                            <i class="bi bi-x-lg"></i>
                        </div>

                        <div class="cart-btns">
                            <div class="btns">
                                <i onclick="decrement(${id})" class="bi bi-dash"></i>
                                <div id=${id} class="quantity"> ${item} </div>
                                <i onclick="increment(${id})" class="bi bi-plus-lg"></i>
                            </div>
                        </div>

                        <h3>$ ${price * item}</h3>
                    </div>
                </div>
            `
        }).join("")
    }else{
        ShopingCart.innerHTML = "basket is  empty!"
    }
}

generateCart()

// increment shoping item
let increment = (id) =>{
    let selectedItem = id
    let search = basket.find((x)=>x.id === selectedItem.id)
  
    if(search === undefined){
      basket.push({
        id: selectedItem.id,
        item: 1,
      })
    }else{
      search.item += 1
    }
  
    update(selectedItem.id)
  
    localStorage.setItem("data", JSON.stringify(basket))

    generateCart()
}
  
  // decrement shoping item
let decrement = (id) =>{
    let selectedItem = id
    let search = basket.find((x)=>x.id === selectedItem.id)
  
    if(search === undefined) return;
    else if(search.item === 0) return;
    else{
      search.item -= 1
    }
  
    update(selectedItem.id)
    localStorage.setItem("data", JSON.stringify(basket))
    basket = basket.filter((x)=>x.item !==0)
    generateCart()
}

// update shoping item 
let update = (id) =>{
    let search = basket.find((x)=>x.id === id)
    document.getElementById(id).innerHTML = search.item
    calculation()
}