const urlAPI = 'https://viste-y-rueda-backend.herokuapp.com'
const imgFolderCatalog = './images/catalog/'
const userToken = JSON.parse(window.localStorage.getItem('loggedUser'))
var ALL_PRODUCTS = {}

if (!userToken) {
    window.location.replace('login.html');
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

const sendAlert = (message, type) => {
    const Alert = document.createElement('div')
    Alert.className = `alert alert-${type} alert-dismissible fade show`
    Alert.textContent = message

    const Alertbutton = document.createElement('button')
    Alertbutton.className = 'btn-close'
    Alertbutton.setAttribute('data-bs-dismiss', 'alert')

    Alert.appendChild(Alertbutton)

    document.getElementById('divAlert').appendChild(Alert)
}

const createAdminCatalogCard = (product) => {
    const {sku} = product

    const divCard = document.createElement('div')
    divCard.className = 'd-flex flex-column m-1'
    divCard.style = 'width:10rem'

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
    getToken()
    let sku = 0
    let categoryName = 'JCM'
    let category = 'JCM'
    let price = 0
    let stock = {xxs:0,xs:0,s:0,m:0,l:0,xl:0,xxl:0,xxxl:0}

    document.getElementById('modalSKU').removeAttribute('disabled', '')
    document.getElementById('modalDeleteButton').value = id

    if (id) {
        ({sku, categoryName, category, price, stock} = ALL_PRODUCTS[id])
        document.getElementById('modalSKU').setAttribute('disabled', '')
    }

    console.log(sku)
    
    document.getElementById('modalTitle').textContent = `Modelo ${sku}`
    document.getElementById('modalImage').src = `${imgFolderCatalog}${id}-min.jpg`
    document.getElementById('modalPrice').value = price
    document.getElementById('modalSKU').value = sku

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
        const span = element.getElementsByTagName('span')[0]
        const input = element.getElementsByTagName('input')[0]
        input.value = stock[span.textContent.toLocaleLowerCase()]
    })
}

const getToken = () => {
    try {
        return JSON.parse(window.localStorage.getItem('loggedUser')).token
    } catch {
        location.reload(true)
    }
}

const sendData = (method, buttonId) => {
    const aupdateButton = document.getElementById(buttonId)
    const token = getToken()
    
    aupdateButton.classList.add('disabled')

    const item = JSON.stringify({
        "sku": document.getElementById('modalSKU').value,
        "category": document.getElementById('categorySelector').value,
        "categoryName": document.getElementById('categoryNameSelector').value,
        "price": document.getElementById('modalPrice').value,
        "stock": {
        "xxs": document.getElementById('modalXXS').value,
        "xs": document.getElementById('modalXS').value,
        "s": document.getElementById('modalS').value,
        "m": document.getElementById('modalM').value,
        "l": document.getElementById('modalL').value,
        "xl": document.getElementById('modalXL').value,
        "xxl": document.getElementById('modalXXL').value,
        "xxxl": document.getElementById('modalXXXL').value
        }
    })
    fetch(`${urlAPI}/products`,{
        method: method,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: item
    })
    .then(response => response.json())
    .then(json => {
        console.log(json)
        if (json.hasOwnProperty('error')){
            console.log(json)
            sendAlert('Error al guardar', 'danger')
        }else{
            sendAlert('Guardado correctamente', 'success')
            ALL_PRODUCTS[json.sku] = json
        }

        aupdateButton.classList.remove('disabled')
    })
}

const deleteProduct = (id) => {
    const token = getToken()

    fetch(`${urlAPI}/products/${id}`,{
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    .then(response => {
        if (response.status == 304){
            return sendAlert('No se encontro el prodcuto', 'warning')
        }
        if (response.status == 204){
            return sendAlert(`Se borro el articulo ${id}`, 'success')
        }

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

document.getElementById('newProductButton').addEventListener('click', () => renderModalForm())

document.getElementById('modalPutButton').addEventListener('click', () => sendData('PUT', 'modalPutButton'))

document.getElementById('modalPostButton').addEventListener('click', () => sendData('POST', 'modalPostButton'))

document.getElementById('modalDeleteButton').addEventListener('click', () => deleteProduct(document.getElementById('modalDeleteButton').value))

document.getElementById('btnDismiss').addEventListener('click', () => location.reload())