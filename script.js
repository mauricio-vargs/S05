let chart = []
let totalItensInChart = 0
let chartPrice = 0

window.onload = getPrice()
window.onload = getProductsFromStorage()

let products = [{
    id : 1,
    name: "Banana",
    price: 4.00,
    img : "./img/banana.jpg"
},
    {
        id : 2,
        name : "Morango",
        price : 8.50,
        img : "./img/morango.jpeg"
    },
    {
        id:3,
        name : "Pêra",
        price : 15.99,
        img : "./img/pera.jpeg"
    },
    {
        id : 4,
        name : "Melancia",
        price : 3.49,
        img : "./img/melancia.jpeg" 
    }
]


function searchProduct() {
    input = document.querySelector('#search')
    if(document.querySelector('.product') != null){
         let searchedProduct = document.querySelector('.product')
         searchedProduct.remove()
         search(products, input)
         input.value = ''
    } else if (document.querySelector('.chart') != null){
        let searchedProduct = document.querySelector('.chart')
        searchedProduct.remove()
        search(products, input)
        input.value = ''
       }else{
        search(products, input)
        input.value = ''
    }
    
}


function search(products, input){

    for(let i = 0; i < products.length; i++){
        if(products[i].name.toUpperCase() == input.value.toUpperCase() || products[i].id == input.value){
            let body = document.querySelector('body')
            let container = document.createElement('div')
            container.className = "product"
            let productImg = document.createElement('img')
            let productName = document.createElement('h2') 
            let productPrice = document.createElement('h2')
            let buyButton = document.createElement('button')
            buyButton.textContent = 'COMPRAR'
            buyButton.onclick = () => addToChart(products[i])
            buyButton.classList = 'btn'


            productImg.src = products[i].img
            productName.textContent = products[i].name
            productPrice.textContent = `Preço - R$ ${products[i].price.toFixed(2)}`
    
    
            body.appendChild(container)
            container.appendChild(productImg)
            container.appendChild(productName)
            container.appendChild(productPrice)
            container.appendChild(buyButton)

    
            return
        }

    }
    if(document.querySelector('.product') == null){
        alert(`Não foi encontrado nenhum produto com esse nome/id`)
    }
}

function addToChart(product) {
    if(chart.length === 0) {
    product.quantity = 1
    chart.push(product)
    chartPrice += product.price
    let totalPrice = document.querySelector('.totalChart')
    totalPrice.textContent = `Valor total do carrinho: R$ ${chartPrice.toFixed(2)}` 
    totalItensInChart = totalItensInChart + 1
    let chartLenght = document.querySelector('.chartLength')
    chartLenght.textContent = `Quantidade de itens no carrinho: ${totalItensInChart}` 
    saveChart(product)
    }else {
        for(let i = 0; i < chart.length; i++){
            if(product.name === chart[i].name){
                product.quantity += 1
                chart[i] = product
                chartPrice += product.price
                let totalPrice = document.querySelector('.totalChart')
                totalPrice.textContent = `Valor total do carrinho: R$ ${chartPrice.toFixed(2)}` 
                totalItensInChart = totalItensInChart + 1
                let chartLenght = document.querySelector('.chartLength')
                chartLenght.textContent = `Quantidade de itens no carrinho: ${totalItensInChart}` 
                saveChart(product)
                return
            }else if(i === chart.length - 1){
                product.quantity = 1
                chart.push(product)
                chartPrice += product.price
                let totalPrice = document.querySelector('.totalChart')
                totalPrice.textContent = `Valor total do carrinho: R$ ${chartPrice.toFixed(2)}` 
                totalItensInChart = totalItensInChart + 1
                let chartLenght = document.querySelector('.chartLength')
                chartLenght.textContent = `Quantidade de itens no carrinho: ${totalItensInChart}` 
                saveChart(product)
                return
            }
            
        }
    }
    
}  

function consultChart(){
  
    if(document.querySelector('.product') != null){
        let searchedProduct = document.querySelector('.product')
        searchedProduct.remove()
        showItems()
   }else if (document.querySelector('.chart') != null){
    let searchedProduct = document.querySelector('.chart')
    searchedProduct.remove()
    showItems()

   }else if(chart.lenght !== 0){
    showItems()
    
   }
    
}

function showItems(){
    let body = document.querySelector('body')
    let container = document.createElement('div')
    container.className = "chart"


    for(let i= 0; i < chart.length; i++){
        console.log(chart.length)
        let productImg = document.createElement('img')
        let productName = document.createElement('h2') 
        let productPrice = document.createElement('h2')


        productImg.src = chart[i].img
        productName.textContent = chart[i].name
        productPrice.textContent = `Preço - R$ ${chart[i].price.toFixed(2)} - Quantidade ${chart[i].quantity}`

        body.appendChild(container)
      
        container.appendChild(productImg)
        container.appendChild(productName)
        container.appendChild(productPrice)
    }
    
}

function saveChart(product){
    localStorage.setItem(product.name, JSON.stringify(product))

}

function getPrice(){
    if(localStorage.lenght !== 0){
        for(let i = 0; i < localStorage.length; i++){
            let productsInStorage = localStorage.getItem(localStorage.key(i))
            productsInStorage = JSON.parse(productsInStorage)
            let productsPrice = productsInStorage.price * productsInStorage.quantity
            chartPrice = chartPrice + productsPrice
            let totalPrice = document.querySelector('.totalChart')
            totalPrice.textContent = `Valor total do carrinho: R$ ${chartPrice.toFixed(2)}` 
        }
    } return
}

function getProductsFromStorage(){

    if(localStorage.lenght !== 0){
        for(let i = 0; i < localStorage.length; i++){
            let productsInStorage = localStorage.getItem(localStorage.key(i))
            productsInStorage = JSON.parse(productsInStorage)
            chart.push(productsInStorage)
            totalItensInChart = totalItensInChart + productsInStorage.quantity
            let chartLenght = document.querySelector('.chartLength')
            chartLenght.textContent = `Quantidade de itens no carrinho: ${totalItensInChart}`

        }
    } return

}

