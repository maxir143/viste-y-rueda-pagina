import {
  imgFolderCatalog,
  urlBaseWhatsApp,
  urlAPI,
  categoriesNames
} from './helpers.js'

import { getImgUrl } from './firebase.js'

let allProdructs = {}
let sizeSelected = 'ALL'
let categorySelected = 'ALL'

const createShopingItem = async (item) => {
  const { sku, stock } = item
  const img = allProdructs.filter(product => product.sku === parseInt(sku))[0].img

  const divShopingCart = document.createElement('div')
  divShopingCart.id = `${sku}_cart`
  divShopingCart.className = 'd-flex shadow justify-content-between p-2 my-1 shopping-item'

  const imgSC = document.createElement('img')
  imgSC.className = 'w-25'
  imgSC.src = await getImgUrl(img)
  divShopingCart.appendChild(imgSC)

  const h4SC = document.createElement('h4')
  h4SC.className = 'w-50 text-center text-uppercase m-auto'
  h4SC.textContent = stock
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

const shoppingCart = new Map()
const savedShopingCart = JSON.parse(window.localStorage.getItem('shopingCart'))
if (savedShopingCart) {
  for (const [sku, size] of Object.entries(savedShopingCart)) {
    shoppingCart.set(sku, size)
  }
}

const saveShopingCart = (items) => {
  window.localStorage.setItem('shopingCart', JSON.stringify(Object.fromEntries(items)))
}

const renderShopingCart = async (items) => {
  if (items.size) {
    document.getElementById('modalCartBody').innerHTML = ''
    saveShopingCart(items)
  } else {
    document.getElementById('modalCartBody').innerHTML = 'Sin articulos ...'
  }
  await items.forEach((stock, sku) => {
    return createShopingItem({ sku, stock })
      .then(newShopingItem => {
        document.getElementById('modalCartBody').appendChild(newShopingItem)
        stock.forEach((size) => {
          const cardCatalogDisplay = document.getElementById(`${sku}_${size}`)
          if (cardCatalogDisplay) {
            cardCatalogDisplay.setAttribute('disabled', '')
            cardCatalogDisplay.className = 'btn btn-secondary btn-sm flex-fill mx-1'
          }
        })
      })
  })

  document.getElementsByName('shopingCartCount')[0].textContent = shoppingCart.size
}

const delCartItem = (item) => {
  const { sku, stock } = item

  stock.forEach(size => {
    if (shoppingCart.has(sku)) {
      const skuItems = shoppingCart.get(sku).filter((each) => each !== size)
      shoppingCart.set(sku, skuItems)
      if (!skuItems.length) {
        shoppingCart.delete(sku)
      }
    }
    const cardCatalogDisplay = document.getElementById(`${sku}_${size}`)
    if (cardCatalogDisplay) {
      cardCatalogDisplay.removeAttribute('disabled', '')
      cardCatalogDisplay.className = 'btn btn-outline-success btn-sm flex-fill mx-1'
    }
  })
  document.getElementById(`${sku}_cart`).remove()
  document.getElementsByName('shopingCartCount')[0].textContent = shoppingCart.size

  saveShopingCart(shoppingCart)

  if (!shoppingCart.size) {
    document.getElementById('modalCartBody').innerHTML = 'Sin articulos ...'
  }
}

const addToCart = (item) => {
  const { sku, size } = item
  let skuItems = [size]
  if (shoppingCart.has(sku)) {
    skuItems = shoppingCart.get(sku)
    skuItems = [...skuItems, size]
  }
  shoppingCart.set(sku, skuItems)

  return renderShopingCart(shoppingCart)
}

const createCardImgCatalog = async (product) => {
  const { sku, categoryName, price, stock, img } = product

  const imgSRC = await getImgUrl(img)

  if (imgSRC === `${imgFolderCatalog}placeholder-min.jpg`) return

  const divCard = document.createElement('div')
  divCard.className = 'card m-3 display-card'
  divCard.style = 'width: 12rem;'

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
    divSizeButtons.className = 'd-flex flex-wrap flex-fill justify-content-around align-items-stretch p-2 text-center btn-group'

    const pSizeButtons = document.createElement('p')
    pSizeButtons.className = 'align-self-center m-0'
    pSizeButtons.textContent = 'Agregar al carrito:'
    divCard.appendChild(pSizeButtons)

    for (const [size, value] of Object.entries(sizes)) {
      const aAddToCart = document.createElement('button')
      let classes = 'btn btn-outline-success btn-sm flex-fill m-1'
      if (shoppingCart.has(sku)) {
        const currentItem = shoppingCart.get(sku)
        if (currentItem.includes(size)) {
          classes = 'btn btn-secondary btn-sm flex-fill mx-1'
          aAddToCart.setAttribute('disabled', '')
        }
      }
      aAddToCart.className = classes
      aAddToCart.textContent = size.toUpperCase()
      aAddToCart.name = 'sizeButton'
      aAddToCart.id = `${sku}_${size}`
      aAddToCart.onclick = () => addToCart({ sku, size })
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
  allProdructs.map(async (product, index) => {
    if (maxItems > itemCount) {
      if (categorySelected === product.category || categorySelected === 'ALL') {
        if (showOutOfStock === false) {
          if (outOfStock(product.stock) === true) return
        }
        if (product.stock[sizeSelected] <= 0 && sizeSelected !== 'ALL') return
        itemCount++
        await createCardImgCatalog(product)
      }
    }
  })
  console.log('holi')
  if (itemCount <= 0) {
    document.getElementsByClassName('display-catalog')[0].innerHTML = '<h2 class="m-5">No hay productos aun ...</h2>'
  } else {
    renderShopingCart(shoppingCart)
  }
}

const filterSetSize = (size) => {
  sizeSelected = size
  renderCatalog(100, false)

  document.getElementById('dropdowSize').textContent = size !== 'ALL' ? size.toUpperCase() : 'Todas las tallas'
}

const filterSetCategory = (category) => {
  categorySelected = category
  renderCatalog(100, false)

  document.getElementById('navbarSupportedContent').classList.remove('show')

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
      bodytext = bodytext.concat(` Modelo n.${sku} en talla: ${stock}, `)
    })
    window.open(bodytext.slice(0, -2))
  }
})

fetch(`${urlAPI}/products`)
  .then((response) => response.json())
  .then((json) => {
    allProdructs = json
    renderCatalog(100, false)
  })
