const urlAPI = 'https://viste-y-rueda-backend.herokuapp.com'
const imgFolderCatalog = './images/catalog/'
const userToken = JSON.parse(window.localStorage.getItem('loggedUser'))
var ALL_PRODUCTS = {}

if (!userToken) {
    window.location.replace('/login.html');
}

const CATEGORIES_NAMES = {
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

const CATEGORIES = {
    'JCU': 'Jersey cilcista unisex',
    'JCM': 'Jersey cilcista mujer',
    'BIB': 'Bib short unisex',
    'RV' : 'Rompe vientos',
    'IMP' : 'Impermeable',
    'CAP' : 'Gorra ciclista',
    'BL' : 'Capa base'
}

const { token, username } = userToken

const createAdminCatalogCard = (product) => {
    const {sku} = product

    const divCard = document.createElement('div')
    divCard.className = 'd-flex flex-column m-1'
    divCard.style = 'width:20rem'

    const img = document.createElement('img')
    img.className = 'img-fluid m-1'
    img.src = `${imgFolderCatalog}${sku}-min.jpg`
    divCard.appendChild(img)

    const modalButton = document.createElement('button')
    modalButton.className ='btn btn-primary m-1'
    modalButton.type = 'button'
    modalButton.id = `${sku}`
    modalButton.name = 'modalButton'
    modalButton.setAttribute('data-bs-toggle','modal')
    modalButton.setAttribute('data-bs-target','#modalCatalogEdit')
    modalButton.textContent = `Editar modelo ${sku}`
    divCard.appendChild(modalButton)

    document.getElementById('adminCatalog').appendChild(divCard)
}

const renderModalForm = (id) => {
    const {sku, categoryName, category, price, stock} = ALL_PRODUCTS[id]

    document.getElementById('modalTitle').textContent = `Modelo ${sku}`
    document.getElementById('modalImage').src = `${imgFolderCatalog}${id}-min.jpg`

    const categorySelector = document.getElementById('categorySelector')
    categorySelector.innerHTML = ''

    for (const cat in CATEGORIES) {
        const categoryOption = document.createElement('option')
        categoryOption.value = cat
        categoryOption.textContent = cat
        if (cat === category) {
            categoryOption.setAttribute('selected', '')
        }
        categorySelector.appendChild(categoryOption)
    }

    const categoryNameSelector = document.getElementById('categoryNameSelector')
    categoryNameSelector.innerHTML = ''

    for (const catName in CATEGORIES_NAMES) {
        const categoryNameOption = document.createElement('option')
        categoryNameOption.value = catName
        categoryNameOption.textContent = catName
        if (catName === categoryName) {
            categoryNameOption.setAttribute('selected', '')
        }
        categoryNameSelector.appendChild(categoryNameOption)
    }

    const stockSelector = document.getElementsByName('stock')
    stockSelector.forEach((element) => {

        console.log(element.getElementsByTagName('span').textContent)

    })
}

const fetchProducts =  fetch(`${urlAPI}/products`)
.then((response) => response.json())
.then((json) => {
    json.forEach((product) => ALL_PRODUCTS[product.sku] = product)
    for (const product in ALL_PRODUCTS) {
        createAdminCatalogCard(ALL_PRODUCTS[product])
    }
})
.then(() => {
    const modalButtons = document.getElementsByName('modalButton')
    modalButtons.forEach((button) => button.addEventListener('click', () => renderModalForm(button.id)))
})
