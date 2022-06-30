const imgFolderCatalog = './images/catalog/'
const urlBaseWhatsApp = 'https://wa.me/+525525507474?text='
const urlAPI = 'https://viste-y-rueda-backend.herokuapp.com'
const shoppingCart = new Map()

var sizeSelected = 'ALL'
var categorySelected = 'ALL'

const categoriesNames = {
    'JCU': 'Jersey cilcista unisex',
    'JCM': 'Jersey cilcista mujer',
    'JCP': 'Jersey ciclista polar',
    'CONU': 'Conjunto ciclista unisex',
    'CONM': 'Conjunto ciclista mujer',
    'JCLU': 'Jersey largo ciclista unisex',
    'JCLM': 'Jersey largo ciclista mujer',
    'BIB': 'Bib short unisex',
    'BIBP': 'Bib short polar unisex',
    'SHORT': 'Short unisex',
    'RV' : 'Rompe vientos',
    'IMP' : 'Impermeable',
    'CAP' : 'Gorra ciclista',
    'BL' : 'Capa base'
}

const categories = {
    'JCU': 'Jersey cilcista unisex',
    'JCM': 'Jersey cilcista mujer',
    'BIB': 'Bib short unisex',
    'RV' : 'Rompe vientos',
    'IMP' : 'Impermeable',
    'CAP' : 'Gorra ciclista',
    'BL' : 'Capa base'
}

const createShopingItem = (item) => {
    const [sku, size] = item

    const divShopingCart = document.createElement('div')
    divShopingCart.className = 'd-flex shadow justify-content-between p-2 my-1'

    const imgSC = document.createElement('img')
    imgSC.className = 'w-25'
    imgSC.src = `${imgFolderCatalog}${sku}-min.jpg`
    divShopingCart.appendChild(imgSC)


    const h4SC = document.createElement('h4')
    h4SC.className = 'w-25 text-center text-uppercase m-auto'
    h4SC.textContent = size
    divShopingCart.appendChild(h4SC)

    const bSC = document.createElement('button')
    bSC.className = 'btn btn-danger w-25'
    bSC.onclick = () => delCartItem(item)
    divShopingCart.appendChild(bSC)

    const iconSC = document.createElement('i')
    iconSC.className = 'bi bi-trash'
    bSC.appendChild(iconSC)

    return divShopingCart
}

const renderShopingCart = (items) => {
    document.getElementById('modalCartBody').innerHTML = ''

    items.forEach((stock, sku) => {
        stock.forEach((value, size) => {
            document.getElementById('modalCartBody').appendChild(createShopingItem([sku, size]))
        })
    })


}

const delCartItem = (item) => {
    const [sku, size] = item
    if (shoppingCart.has(sku)){
        let skuItems = shoppingCart.get(sku)
        if (skuItems.has(size)){
            skuItems.delete(size)
            shoppingCart.set(sku,skuItems)
            if (!skuItems.size){
                shoppingCart.delete(sku)
            }
            document.getElementById(`${sku}_${size}`).removeAttribute('disabled', '')
            document.getElementById(`${sku}_${size}`).className = 'btn btn-outline-success btn-sm flex-fill mx-1'
        }
    }
    document.getElementsByName('shopingCartCount')[0].textContent = shoppingCart.size
    renderShopingCart(shoppingCart)
}

const addToCart = (item) => {
    const [sku, size] = item
    const newItem = new Map()
    newItem.set(size, 1)
    if (shoppingCart.has(sku)) {
        const oldItems = shoppingCart.get(sku)
        oldItems.forEach((value, size)=>{
            newItem.set(size, 1)
        })
    }
    shoppingCart.set(sku, newItem)   
    document.getElementById(`${sku}_${size}`).setAttribute('disabled', '')
    document.getElementById(`${sku}_${size}`).className = 'btn btn-secondary btn-sm flex-fill mx-1'
    document.getElementsByName('shopingCartCount')[0].textContent = shoppingCart.size

    renderShopingCart(shoppingCart)
}

const createCardImgCatalog = (product) => {
    const {sku, categoryName, price, stock} = product

    const divCard = document.createElement('div')
    divCard.className = 'card m-3'
    divCard.style = 'width: 18rem;'

    const cardImgTop = document.createElement('img')
    cardImgTop.className = 'card-img-top'
    cardImgTop.src = `${imgFolderCatalog}${sku}-min.jpg`
    cardImgTop.loading = 'lazy'
    divCard.appendChild(cardImgTop)

    const divCardBody = document.createElement('div')
    divCardBody.className = 'card-body'
    divCard.appendChild(divCardBody)

    const h5CardTitle = document.createElement('h5')
    h5CardTitle.className = 'card-title'
    h5CardTitle.textContent = categoriesNames[categoryName]
    divCardBody.appendChild(h5CardTitle)

    const pCardText = document.createElement('p')
    pCardText.className = 'card-text'
    pCardText.textContent = `Costo: $${price}`
    divCardBody.appendChild(pCardText)

    const showSizeButtons = (sizes) => {
        const divSizeButtons = document.createElement('div')
        divSizeButtons.className = 'd-flex flex-fill justify-content-around align-items-stretch p-2 text-center btn-group'

        const pSizeButtons = document.createElement('p')
        pSizeButtons.className = 'align-self-center m-0'
        pSizeButtons.textContent = 'Agregar al carrito:'
        divCard.appendChild(pSizeButtons)

        for (const [size, value] of Object.entries(sizes)){
            const aAddToCart = document.createElement('button')
            var classes = 'btn btn-outline-success btn-sm flex-fill mx-1'
            if (shoppingCart.has(sku)){
                const currentItem = shoppingCart.get(sku)
                if (currentItem.has(size)) {
                    var classes = 'btn btn-secondary btn-sm flex-fill mx-1'
                    aAddToCart.setAttribute('disabled', '')
                }
            }
            aAddToCart.className = classes
            aAddToCart.textContent = size
            aAddToCart.name = 'sizeButton'
            aAddToCart.id = `${sku}_${size}`
            aAddToCart.onclick = () => addToCart([sku, size])
            if (value > 0) divSizeButtons.appendChild(aAddToCart)  
        }
        divCard.appendChild(divSizeButtons)
    }
    showSizeButtons(stock)
    
    return document.getElementsByClassName('display-catalog')[0].appendChild(divCard)
}

const outOfStock = (sizes) => {
    for (var size in sizes) {
        if (sizes[size] > 0) {
            return false
        }
    }
    return true
}


const renderCatalog = (maxItems=10, showOutOfStock=false) => {
    const products = fetch(`${urlAPI}/products`)
    .then((response) => response.json())
    .then((json) => {
        document.getElementsByClassName('display-catalog')[0].innerHTML = ''
        const products = json
        let itemCount = 0
        
        products.forEach( product => {
            if (maxItems > itemCount ) {
                if (categorySelected == product.category || categorySelected == 'ALL'){
                    if (showOutOfStock == false) {
                        if (outOfStock(product.stock) == true) return
                    }
                    if (product.stock[sizeSelected] <= 0 && sizeSelected !== 'ALL') return

                    createCardImgCatalog(product)
                    itemCount ++
                }
            }
        })

        if (itemCount <= 0) {
            document.getElementsByClassName('display-catalog')[0].innerHTML = '<h2 class="m-5">No hay productos aun ...</h2>'
    }
    })
}

const changeDisplay = (responseSize, category, showOutOfStock) => {
    renderCatalog(responseSize, category, showOutOfStock)
}

const filterSetSize = (size) => {
    sizeSelected = size
    changeDisplay(100, false)


    document.getElementById('dropdowSize').textContent = size != 'ALL' ? size.toUpperCase() : 'Todas las tallas'
}

const filterSetCategory = (category) => {
    categorySelected = category
    changeDisplay(100, false)
}

document.getElementsByName('Filter').forEach((button) => {
    button.addEventListener('click', () => (filterSetCategory(button.id)))
})

document.getElementsByName('size-selector').forEach((button) => {
    button.addEventListener('click', () => filterSetSize(button.id))
})

document.getElementById('sendWhatsApp').addEventListener('click', () => {
    if(shoppingCart.size){
        var bodytext = urlBaseWhatsApp.concat('Me interesan los siguientes artículos:  ')
        shoppingCart.forEach((stock, sku) => {
            stock.forEach((value, size) => {
                bodytext = bodytext.concat(` n.${sku} talla: ${size}, `)
            })
        })
        window.open(bodytext.slice(0, -2))
    }
})

changeDisplay(100, false)



