import {
  imgFolderCatalog,
  urlBaseWhatsApp,
  urlAPI,
  categoriesNames,
  assignImg
} from './helpers.js'

const shoppingCart = new Map()
let allProdructs = {}
let sizeSelected = 'ALL'
let categorySelected = 'ALL'

const createShopingItem = async (item) => {
  const { sku, size } = item

  const divShopingCart = document.createElement('div')
  divShopingCart.id = `${sku}_cart_${size}`
  divShopingCart.className = 'd-flex shadow justify-content-between p-2 my-1 shopping-item'

  const imgSC = document.createElement('img')
  imgSC.className = 'w-25'
  imgSC.src = await assignImg(sku)
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

const renderShopingCart = async (items) => {
  if (items.size) {
    document.getElementById('modalCartBody').innerHTML = ''
  }else{
    document.getElementById('modalCartBody').innerHTML = 'Sin articulos ...'
  }
   items.forEach((stock, sku) => {
    stock.forEach((value, size) => {
      createShopingItem({ sku, size })
      .then(newShopingItem => { 
        document.getElementById('modalCartBody').appendChild(newShopingItem)
      })
      })
    })
}


const delCartItem = (item) => {
  const { sku, size } = item
  if (shoppingCart.has(sku)) {
    const skuItems = shoppingCart.get(sku)
    if (skuItems.has(size)) {
      skuItems.delete(size)
      shoppingCart.set(sku, skuItems)
      if (!skuItems.size) {
        shoppingCart.delete(sku)
      }
      document.getElementById(`${sku}_${size}`).removeAttribute('disabled', '')
      document.getElementById(`${sku}_${size}`).className = 'btn btn-outline-success btn-sm flex-fill mx-1'
      document.getElementById(`${sku}_cart_${size}`).remove()
    }
  }
  document.getElementsByName('shopingCartCount')[0].textContent = shoppingCart.size
  if (shoppingCart.size === 0) {
    document.getElementById('modalCartBody').innerHTML = 'Sin articulos ...'
  }
}

const addToCart = (item) => {
  const [sku, size] = item
  const newItem = new Map()
  newItem.set(size, 1)
  if (shoppingCart.has(sku)) {
    const oldItems = shoppingCart.get(sku)
    oldItems.forEach((value, size) => {
      newItem.set(size, 1)
    })
  }
  shoppingCart.set(sku, newItem)
  document.getElementById(`${sku}_${size}`).setAttribute('disabled', '')
  document.getElementById(`${sku}_${size}`).className = 'btn btn-secondary btn-sm flex-fill mx-1'
  document.getElementsByName('shopingCartCount')[0].textContent = shoppingCart.size

  renderShopingCart(shoppingCart)
}

const createCardImgCatalog = async (product) => {
  const { sku, categoryName, price, stock } = product

  const imgSRC = await assignImg(sku)

  if (imgSRC === `${imgFolderCatalog}placeholder-min.jpg`) return

  const divCard = document.createElement('div')
  divCard.className = 'card m-3'
  divCard.style = 'width: 18rem;'

  const cardImgTop = document.createElement('img')
  cardImgTop.className = 'card-img-top'
  cardImgTop.src = imgSRC
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

    for (const [size, value] of Object.entries(sizes)) {
      const aAddToCart = document.createElement('button')
      let classes = 'btn btn-outline-success btn-sm flex-fill mx-1'
      if (shoppingCart.has(sku)) {
        const currentItem = shoppingCart.get(sku)
        if (currentItem.has(size)) {
          classes = 'btn btn-secondary btn-sm flex-fill mx-1'
          aAddToCart.setAttribute('disabled', '')
        }
      }
      aAddToCart.className = classes
      aAddToCart.textContent = size.toUpperCase()
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
  for (const size in sizes) {
    if (sizes[size] > 0) {
      return false
    }
  }
  return true
}

const renderCatalog = (maxItems = 10, showOutOfStock = false) => {
  document.getElementsByClassName('display-catalog')[0].innerHTML = ''
  let itemCount = 0
  allProdructs.forEach(product => {
    if (maxItems > itemCount) {
      if (categorySelected === product.category || categorySelected === 'ALL') {
        if (showOutOfStock === false) {
          if (outOfStock(product.stock) === true) return
        }
        if (product.stock[sizeSelected] <= 0 && sizeSelected !== 'ALL') return
        createCardImgCatalog(product)
        itemCount++
      }
    }
  })
  if (itemCount <= 0) document.getElementsByClassName('display-catalog')[0].innerHTML = '<h2 class="m-5">No hay productos aun ...</h2>'
}

const changeDisplay = (responseSize, category, showOutOfStock) => {
  renderCatalog(responseSize, category, showOutOfStock)
}

const filterSetSize = (size) => {
  sizeSelected = size
  changeDisplay(100, false)

  document.getElementById('dropdowSize').textContent = size !== 'ALL' ? size.toUpperCase() : 'Todas las tallas'
}

const filterSetCategory = (category) => {
  categorySelected = category
  changeDisplay(100, false)

  document.getElementsByName('Filter').forEach((button) => {
    if (button.id === category) {
      button.classList.add('active')
    } else {
      button.classList.remove('active')
    }
  })
}

document.getElementsByName('Filter').forEach((button) => {
  button.addEventListener('click', () => (filterSetCategory(button.id)))
})

document.getElementsByName('size-selector').forEach((button) => {
  button.addEventListener('click', () => filterSetSize(button.id))
})

document.getElementById('sendWhatsApp').addEventListener('click', () => {
  if (shoppingCart.size) {
    let bodytext = urlBaseWhatsApp.concat('Me interesan los siguientes artículos:  ')
    shoppingCart.forEach((stock, sku) => {
      stock.forEach((value, size) => {
        bodytext = bodytext.concat(` n.${sku} talla: ${size}, `)
      })
    })
    window.open(bodytext.slice(0, -2))
  }
})

fetch(`${urlAPI}/products`)
  .then((response) => response.json())
  .then((json) => {
    allProdructs = json
    changeDisplay(100, false)
  })
