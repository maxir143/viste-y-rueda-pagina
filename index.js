const createCardImgCatalog = (imgSource, titleText, cardText, aHref) => {
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
    aAddToCart.textContent = 'Mandar mensaje 💬'
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

const products = [
    {
        sku: 1,
        category: 'JCU',
        categoryName: 'JCU',
        stock: {
            xxs: 0,
            xs: 0,
            s: 0,
            m: 0,
            l: 0,
            xl: 1,
            xxl: 0,
            xxxl: 0,
        }
    },
    {
        sku: 2,
        category: 'JCU',
        categoryName: 'JCU',
        stock: {
            xxs: 0,
            xs: 0,
            s: 0,
            m: 1,
            l: 0,
            xl: 0,
            xxl: 0,
            xxxl: 0,
        }
    },
    {
        sku: 3,
        category: 'JCU',
        categoryName: 'JCU',
        stock: {
            xxs: 0,
            xs: 0,
            s: 0,
            m: 0,
            l: 0,
            xl: 0,
            xxl: 0,
            xxxl: 0,
        }
    },
    {
        sku: 4,
        category: 'JCM',
        categoryName: 'JCM',
        stock: {
            xxs: 0,
            xs: 0,
            s: 1,
            m: 0,
            l: 0,
            xl: 0,
            xxl: 0,
            xxxl: 0,
        }
    },
    {
        sku: 5,
        category: 'JCM',
        categoryName: 'JCM',
        stock: {
            xxs: 0,
            xs: 0,
            s: 1,
            m: 0,
            l: 0,
            xl: 0,
            xxl: 0,
            xxxl: 0,
        }
    },
    {
        sku: 6,
        category: 'JCU',
        categoryName: 'JCU',
        stock: {
            xxs: 0,
            xs: 0,
            s: 0,
            m: 0,
            l: 0,
            xl: 0,
            xxl: 0,
            xxxl: 0,
        }
    },
    {
        sku: 7,
        category: 'JCM',
        categoryName: 'JCM',
        stock: {
            xxs: 0,
            xs: 0,
            s: 0,
            m: 0,
            l: 0,
            xl: 1,
            xxl: 0,
            xxxl: 0,
        }
    },
    {
        sku: 8,
        category: 'JCM',
        categoryName: 'JCM',
        stock: {
            xxs: 0,
            xs: 0,
            s: 0,
            m: 1,
            l: 0,
            xl: 1,
            xxl: 0,
            xxxl: 0,
        }
    },
    {
        sku: 9,
        category: 'JCM',
        categoryName: 'JCM',
        stock: {
            xxs: 0,
            xs: 0,
            s: 0,
            m: 0,
            l: 0,
            xl: 0,
            xxl: 0,
            xxxl: 0,
        }
    },
    {
        sku: 10,
        category: 'JCM',
        categoryName: 'JCM',
        stock: {
            xxs: 0,
            xs: 0,
            s: 1,
            m: 0,
            l: 0,
            xl: 0,
            xxl: 0,
            xxxl: 0,
        }
    },
    {
        sku: 11,
        category: 'JCU',
        categoryName: 'JCU',
        stock: {
            xxs: 0,
            xs: 0,
            s: 0,
            m: 0,
            l: 0,
            xl: 1,
            xxl: 0,
            xxxl: 0,
        }
    },
    {
        sku: 12,
        category: 'JCU',
        categoryName: 'JCU',
        stock: {
            xxs: 0,
            xs: 0,
            s: 1,
            m: 0,
            l: 0,
            xl: 0,
            xxl: 1,
            xxxl: 0,
        }
    },
    {
        sku: 13,
        category: 'JCU',
        categoryName: 'CONU',
        stock: {
            xxs: 0,
            xs: 0,
            s: 0,
            m: 0,
            l: 0,
            xl: 0,
            xxl: 0,
            xxxl: 0,
        }
    },
    {
        sku: 14,
        category: 'JCU',
        categoryName: 'JCU',
        stock: {
            xxs: 0,
            xs: 0,
            s: 0,
            m: 0,
            l: 0,
            xl: 0,
            xxl: 1,
            xxxl: 0,
        }
    },
    {
        sku: 15,
        category: 'JCU',
        categoryName: 'JCP',
        stock: {
            xxs: 0,
            xs: 0,
            s: 0,
            m: 0,
            l: 0,
            xl: 0,
            xxl: 0,
            xxxl: 0,
        }
    },
    {
        sku: 16,
        category: 'JCU',
        categoryName: 'JCU',
        stock: {
            xxs: 0,
            xs: 0,
            s: 0,
            m: 0,
            l: 0,
            xl: 0,
            xxl: 0,
            xxxl: 0,
        }
    },
    {
        sku: 17,
        category: 'JCU',
        categoryName: 'JCU',
        stock: {
            xxs: 0,
            xs: 0,
            s: 0,
            m: 0,
            l: 1,
            xl: 0,
            xxl: 0,
            xxxl: 0,
        }
    },
    {
        sku: 18,
        category: 'JCU',
        categoryName: 'JCU',
        stock: {
            xxs: 0,
            xs: 0,
            s: 0,
            m: 0,
            l: 0,
            xl: 0,
            xxl: 0,
            xxxl: 0,
        }
    },
    {
        sku: 19,
        category: 'BIB',
        categoryName: 'BIB',
        stock: {
            xxs: 0,
            xs: 0,
            s: 1,
            m: 2,
            l: 1,
            xl: 1,
            xxl: 1,
            xxxl: 0,
        }
    },
    {
        sku: 20,
        category: 'BIB',
        categoryName: 'BIB',
        stock: {
            xxs: 0,
            xs: 0,
            s: 0,
            m: 0,
            l: 0,
            xl: 0,
            xxl: 0,
            xxxl: 0,
        }
    },
    {
        sku: 21,
        category: 'JCU',
        categoryName: 'JCLU',
        stock: {
            xxs: 0,
            xs: 1,
            s: 0,
            m: 1,
            l: 1,
            xl: 1,
            xxl: 0,
            xxxl: 0,
        }
    },
    {
        sku: 22,
        category: 'JCU',
        categoryName: 'JCU',
        stock: {
            xxs: 0,
            xs: 1,
            s: 0,
            m: 0,
            l: 0,
            xl: 0,
            xxl: 0,
            xxxl: 0,
        }
    },
    {
        sku: 23,
        category: 'BIB',
        categoryName: 'SHORT',
        stock: {
            xxs: 0,
            xs: 0,
            s: 2,
            m: 1,
            l: 1,
            xl: 2,
            xxl: 2,
            xxxl: 0,
        }
    },
    {
        sku: 24,
        category: 'JCU',
        categoryName: 'JCU',
        stock: {
            xxs: 0,
            xs: 0,
            s: 0,
            m: 0,
            l: 0,
            xl: 0,
            xxl: 0,
            xxxl: 0,
        }
    },
    {
        sku: 25,
        category: 'JCU',
        categoryName: 'JCU',
        stock: {
            xxs: 0,
            xs: 0,
            s: 0,
            m: 0,
            l: 0,
            xl: 0,
            xxl: 0,
            xxxl: 0,
        }
    },
    {
        sku: 26,
        category: 'JCU',
        categoryName: 'JCU',
        stock: {
            xxs: 0,
            xs: 1,
            s: 0,
            m: 0,
            l: 0,
            xl: 0,
            xxl: 1,
            xxxl: 0,
        }
    },
    {
        sku: 27,
        category: 'JCU',
        categoryName: 'JCLU',
        stock: {
            xxs: 0,
            xs: 1,
            s: 1,
            m: 1,
            l: 1,
            xl: 1,
            xxl: 0,
            xxxl: 0,
        }
    },
    {
        sku: 28,
        category: 'BIB',
        categoryName: 'BIB',
        stock: {
            xxs: 0,
            xs: 0,
            s: 2,
            m: 1,
            l: 2,
            xl: 1,
            xxl: 1,
            xxxl: 0,
        }
    },
    {
        sku: 29,
        category: 'JCU',
        categoryName: 'JCLU',
        stock: {
            xxs: 0,
            xs: 0,
            s: 0,
            m: 0,
            l: 1,
            xl: 0,
            xxl: 0,
            xxxl: 0,
        }
    },
    {
        sku: 30,
        category: 'BL',
        categoryName: 'BL',
        stock: {
            xxs: 0,
            xs: 0,
            s: 0,
            m: 0,
            l: 1,
            xl: 0,
            xxl: 0,
            xxxl: 0,
        }
    },
    {
        sku: 31,
        category: 'JCU',
        categoryName: 'JCU',
        stock: {
            xxs: 0,
            xs: 0,
            s: 0,
            m: 0,
            l: 1,
            xl: 1,
            xxl: 0,
            xxxl: 0,
        }
    },
    {
        sku: 32,
        category: 'JCM',
        categoryName: 'JCM',
        stock: {
            xxs: 0,
            xs: 0,
            s: 0,
            m: 1,
            l: 1,
            xl: 1,
            xxl: 0,
            xxxl: 0,
        }
    },
    {
        sku: 33,
        category: 'JCU',
        categoryName: 'JCU',
        stock: {
            xxs: 0,
            xs: 0,
            s: 0,
            m: 1,
            l: 1,
            xl: 0,
            xxl: 0,
            xxxl: 0,
        }
    },
    {
        sku: 34,
        category: 'JCU',
        categoryName: 'JCU',
        stock: {
            xxs: 0,
            xs: 0,
            s: 0,
            m: 0,
            l: 0,
            xl: 1,
            xxl: 0,
            xxxl: 0,
        }
    },
    {
        sku: 35,
        category: 'JCM',
        categoryName: 'CONM',
        stock: {
            xxs: 0,
            xs: 0,
            s: 0,
            m: 0,
            l: 0,
            xl: 0,
            xxl: 0,
            xxxl: 0,
        }
    },
    {
        sku: 36,
        category: 'JCU',
        categoryName: 'JCU',
        stock: {
            xxs: 0,
            xs: 0,
            s: 0,
            m: 1,
            l: 1,
            xl: 1,
            xxl: 0,
            xxxl: 0,
        }
    },
    {
        sku: 37,
        category: 'BIB',
        categoryName: 'BIBP',
        stock: {
            xxs: 0,
            xs: 0,
            s: 1,
            m: 1,
            l: 1,
            xl: 1,
            xxl: 0,
            xxxl: 0,
        }
    },
    {
        sku: 38,
        category: 'JCU',
        categoryName: 'JCU',
        stock: {
            xxs: 0,
            xs: 0,
            s: 1,
            m: 1,
            l: 0,
            xl: 1,
            xxl: 0,
            xxxl: 0,
        }
    },
    {
        sku: 39,
        category: 'JCU',
        categoryName: 'JCU',
        stock: {
            xxs: 0,
            xs: 0,
            s: 1,
            m: 0,
            l: 0,
            xl: 0,
            xxl: 0,
            xxxl: 0,
        }
    },
    {
        sku: 40,
        category: 'JCU',
        categoryName: 'JCU',
        stock: {
            xxs: 0,
            xs: 0,
            s: 1,
            m: 0,
            l: 0,
            xl: 0,
            xxl: 0,
            xxxl: 0,
        }
    },
    {
        sku: 41,
        category: 'JCU',
        categoryName: 'JCU',
        stock: {
            xxs: 0,
            xs: 0,
            s: 1,
            m: 0,
            l: 0,
            xl: 0,
            xxl: 0,
            xxxl: 0,
        }
    },
    {
        sku: 42,
        category: 'JCU',
        categoryName: 'JCU',
        stock: {
            xxs: 0,
            xs: 0,
            s: 1,
            m: 1,
            l: 1,
            xl: 0,
            xxl: 0,
            xxxl: 0,
        }
    },
    {
        sku: 43,
        category: 'JCU',
        categoryName: 'JCU',
        stock: {
            xxs: 0,
            xs: 0,
            s: 1,
            m: 1,
            l: 1,
            xl: 0,
            xxl: 0,
            xxxl: 0,
        }
    },
    {
        sku: 44,
        category: 'JCU',
        categoryName: 'JCLU',
        stock: {
            xxs: 0,
            xs: 1,
            s: 1,
            m: 1,
            l: 1,
            xl: 0,
            xxl: 0,
            xxxl: 0,
        }
    },
    {
        sku: 45,
        category: 'RV',
        categoryName: 'RV',
        stock: {
            xxs: 0,
            xs: 0,
            s: 1,
            m: 1,
            l: 1,
            xl: 0,
            xxl: 0,
            xxxl: 0,
        }
    },
    {
        sku: 46,
        category: 'JCM',
        categoryName: 'JCM',
        stock: {
            xxs: 0,
            xs: 0,
            s: 1,
            m: 1,
            l: 1,
            xl: 1,
            xxl: 0,
            xxxl: 0,
        }
    },
    {
        sku: 47,
        category: 'JCU',
        categoryName: 'JCLU',
        stock: {
            xxs: 0,
            xs: 0,
            s: 1,
            m: 1,
            l: 1,
            xl: 0,
            xxl: 0,
            xxxl: 0,
        }
    },
    {
        sku: 48,
        category: 'JCU',
        categoryName: 'JCU',
        stock: {
            xxs: 0,
            xs: 0,
            s: 1,
            m: 1,
            l: 1,
            xl: 0,
            xxl: 0,
            xxxl: 0,
        }
    }
] 

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

const renderCatalog = (maxItems=10, filterBy='ALL', showOutOfStock=false) => {
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
                    `${urlBaseWhatsApp}Me interesa el jersey (modelo <${product.sku}> ${sizesText})` 
                )
                itemCount ++
            }
        }
    })

    if (itemCount <= 0) {
        document.getElementsByClassName('display-catalog')[0].innerHTML = '<h2 class="m-5">No hay productos aun ...</h2>'
    }
}

function changeDisplay(responseSize, category, showOutOfStock){
    document.getElementsByClassName('display-catalog')[0].innerHTML = ''
    renderCatalog(responseSize, category, showOutOfStock)
}

document.getElementsByName('Filter').forEach((button) => {
    button.addEventListener('click', () => (changeDisplay(100, button.id , false)))
})

renderCatalog(100, 'ALL', false)



