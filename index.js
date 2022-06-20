const createCardImgCatalog = (imgSource, titleText, cardText, aHref, sku) => {
    const divCard = document.createElement('div')
    divCard.className = 'card m-3'
    divCard.style = 'width: 18rem;'

    const cardImgTop = document.createElement('img')
    cardImgTop.className = 'card-img-top'
    cardImgTop.src = imgSource
    divCard.appendChild(cardImgTop)

    const divCardBody = document.createElement('div')
    divCardBody.className = 'card-body'
    divCard.appendChild(divCardBody)

    const h5CardTitle = document.createElement('h5')
    h5CardTitle.className = 'card-title'
    h5CardTitle.textContent = titleText
    divCardBody.appendChild(h5CardTitle)


    const pCardText = document.createElement('p')
    pCardText.className = 'card-text'
    pCardText.textContent = cardText
    divCardBody.appendChild(pCardText)

    const aAddToCart = document.createElement('a')
    aAddToCart.className = 'btn btn-primary'
    aAddToCart.textContent = `Preguntar por nº${sku} 💬`
    aAddToCart.href = aHref
    aAddToCart.target = '_blank'
    divCardBody.appendChild(aAddToCart)

    return divCatalogDisplay = document.getElementsByClassName('display-catalog')[0].appendChild(divCard)
}

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

const getSizesText = (sizes) => {
    var text = 'Tallas disponibles: '
    for (var size in sizes) {
        if (sizes[size] > 0) {
            text = text.concat(size.toUpperCase(), ' ')
        }
    }
    return text
}

const outOfStock = (sizes) => {
    for (var size in sizes) {
        if (sizes[size] > 0) {
            return false
        }
    }
    return true
}

const imgFolderCatalog = './images/catalog/'

const urlBaseWhatsApp = 'https://wa.me/+525525507474?text='

const urlAPI = 'https://viste-y-rueda-backend.herokuapp.com'

const renderCatalog = (maxItems=10, filterBy='ALL', showOutOfStock=false) => {
    const products = fetch(`${urlAPI}/products`)
    .then((response) => response.json())
    .then((json) => {
        console.log(json)
        const products = json
        let itemCount = 0
        products.forEach( product => {
            if (maxItems > itemCount ) {
                if (filterBy == product.category || filterBy == 'ALL'){
                    if (showOutOfStock == false) {
                        if (outOfStock(product.stock) == true){
                            return;
                        }
                    }
                    const sizesText = getSizesText(product.stock)
                    createCardImgCatalog(
                        `${imgFolderCatalog}${product.sku}.jpg`,
                        categoriesNames[product.categoryName],
                        sizesText,
                        `${urlBaseWhatsApp}Me interesa el jersey (modelo <${product.sku}> ${sizesText})`,
                        product.sku
                    )
                    itemCount ++
                }
            }
        })
        if (itemCount <= 0) {
            document.getElementsByClassName('display-catalog')[0].innerHTML = '<h2 class="m-5">No hay productos aun ...</h2>'
    }
    })
}

function changeDisplay(responseSize, category, showOutOfStock){
    document.getElementsByClassName('display-catalog')[0].innerHTML = ''
    renderCatalog(responseSize, category, showOutOfStock)
}

document.getElementsByName('Filter').forEach((button) => {
    button.addEventListener('click', () => (changeDisplay(100, button.id , false)))
})

renderCatalog(100, 'ALL', false)



