// get the shoping id
let shop = document.getElementById("shop")



// local storage
let basket = JSON.parse(localStorage.getItem("data")) || [];

// generate shoping cart
let generateShop = ()=> {
    return (shop.innerHTML = shopItemsData.map((x)=>{
      
        let {id,price,desc,img,name} = x
        let search = basket.find((y)=>y.id === id) || []
        return `
            <div id=product-id-${id} class="item">
                <img width="220" src=${img}>
                <div class="details">
                    <h3>${name}</h3>
                    <p>${desc}</p>
                    <div class="price-quantity">
                        <h2>$${price}</h2>
                        <div class="btns">
                            <i onclick="decrement(${id})" class="bi bi-dash"></i>
                            <div id=${id} class="quantity"> ${search.item === undefined? 0: search.item} </div>
                            <i onclick="increment(${id})" class="bi bi-plus-lg"></i>
                        </div>
                    </div>
                </div>
            </div> 
        `
    }).join(""))
}

generateShop()

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
}

// update shoping item 
let update = (id) =>{
  let search = basket.find((x)=>x.id === id)
  document.getElementById(id).innerHTML = search.item
  calculation()
}

// Calculation
let calculation = ()=> {
  let cartIcon = document.getElementById("cart-amount")
  cartIcon.innerHTML = basket.map((x)=> x.item).reduce((x,y)=> x+ y, 0)
}

calculation()

