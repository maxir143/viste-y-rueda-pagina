import {
  urlAPI,
  userToken,
  categories,
  categoriesNames,
  validateToken,
  assignImg,
  deleteTimeOut
} from './helpers.js'

validateToken()

if (!userToken()) {
  window.location.replace('login.html')
}

const allProdructs = {}

const sendAlert = (message, type) => {
  const Alert = document.createElement('div')
  Alert.className = `alert alert-${type} alert-dismissible fade show`
  Alert.textContent = message

  const Alertbutton = document.createElement('button')
  Alertbutton.className = 'btn-close'
  Alertbutton.setAttribute('data-bs-dismiss', 'alert')
  Alert.appendChild(Alertbutton)

  const item = document.getElementById('divAlert').appendChild(Alert)
  deleteTimeOut(item, 2000)
}

const createAdminCatalogCard = async (product) => {
  const { sku } = product

  const divCard = document.createElement('div')
  divCard.className = 'd-flex flex-column m-1'
  divCard.style = 'width:10rem'
  divCard.id = `productCard_${sku}`

  const img = document.createElement('img')
  img.className = 'img-fluid m-1'
  img.src = await assignImg(sku)
  divCard.appendChild(img)

  const modalButton = document.createElement('button')
  modalButton.className = 'btn btn-primary m-1'
  modalButton.type = 'button'
  modalButton.id = `${sku}`
  modalButton.name = 'modalButton'
  modalButton.setAttribute('data-bs-toggle', 'modal')
  modalButton.setAttribute('data-bs-target', '#modalCatalogEdit')
  modalButton.textContent = `Editar modelo ${sku}`
  modalButton.addEventListener('click', () => renderModalForm(sku))
  divCard.appendChild(modalButton)

  document.getElementById('adminCatalog').appendChild(divCard)
  return divCard
}

const renderModalForm = async (id) => {
  validateToken()

  let sku = 0
  let categoryName = 'JCM'
  let category = 'JCM'
  let price = 0
  let stock = { xxs: 0, xs: 0, s: 0, m: 0, l: 0, xl: 0, xxl: 0, xxxl: 0 }

  document.getElementById('modalSKU').removeAttribute('disabled', '')
  document.getElementById('modalDeleteButton').value = id

  if (id) {
    ({ sku, categoryName, category, price, stock } = allProdructs[id])
    document.getElementById('modalSKU').setAttribute('disabled', '')
    document.getElementById('modalPostButton').classList.add('d-none')
    document.getElementById('modalPutButton').classList.remove('d-none')
  } else {
    document.getElementById('modalPostButton').classList.remove('d-none')
    document.getElementById('modalPutButton').classList.add('d-none')
  }

  document.getElementById('modalTitle').textContent = `Modelo ${sku}`
  document.getElementById('modalImage').src = await assignImg(sku)
  document.getElementById('modalPrice').value = price
  document.getElementById('modalSKU').value = sku

  const categorySelector = document.getElementById('categorySelector')
  categorySelector.innerHTML = ''

  for (const cat in categories) {
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

  for (const catName in categoriesNames) {
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
/*
const uploadFile = async (file) => {
  const storageRef = firestore.storage().ref().child(`images/${file.name}`)

  await storageRef.put(file)

  return storageRef
} */

const sendData = async (method, buttonId) => {
  validateToken()
  const aupdateButton = document.getElementById(buttonId)
  const token = userToken()
  aupdateButton.classList.add('disabled')

  /*
  const imgFile = document.getElementById('modalFile').files[0]
  if (imgFile) {
    const imgFileRef = await uploadFile(imgFile)
    console.log(imgFileRef)
  } */

  const item = JSON.stringify({
    sku: document.getElementById('modalSKU').value,
    category: document.getElementById('categorySelector').value,
    categoryName: document.getElementById('categoryNameSelector').value,
    price: document.getElementById('modalPrice').value,
    stock: {
      xxs: document.getElementById('modalXXS').value,
      xs: document.getElementById('modalXS').value,
      s: document.getElementById('modalS').value,
      m: document.getElementById('modalM').value,
      l: document.getElementById('modalL').value,
      xl: document.getElementById('modalXL').value,
      xxl: document.getElementById('modalXXL').value,
      xxxl: document.getElementById('modalXXXL').value
    }
  })
  fetch(`${urlAPI}/products`, {
    method,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: item
  })
    .then(response => response.json())
    .then(json => {
      aupdateButton.classList.remove('disabled')
      if (Object.prototype.hasOwnProperty.call(json, 'error')) {
        sendAlert('Error al guardar', 'danger')
      } else {
        document.getElementById('btnDismiss').click()
        sendAlert('Guardado correctamente', 'success')
        allProdructs[json.sku] = json
        if (method === 'POST') {
          createAdminCatalogCard(json)
        }
      }
    })
}

const deleteProduct = (id) => {
  const token = userToken()

  fetch(`${urlAPI}/products/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
    .then(response => {
      if (response.status === 304) {
        return sendAlert('No se encontro el prodcuto', 'warning')
      }
      if (response.status === 204) {
        document.getElementById(`productCard_${id}`).remove()
        document.getElementById('btnDismiss').click()
        return sendAlert(`Se borro el articulo ${id}`, 'success')
      }
    })
}

fetch(`${urlAPI}/products`)
  .then((response) => response.json())
  .then((json) => {
    json.forEach((product) => (allProdructs[product.sku] = product))
    for (const product in allProdructs) {
      createAdminCatalogCard(allProdructs[product])
    }
  })

document.getElementById('newProductButton').addEventListener('click', () => renderModalForm())

document.getElementById('modalPutButton').addEventListener('click', () => sendData('PUT', 'modalPutButton'))

document.getElementById('modalPostButton').addEventListener('click', () => sendData('POST', 'modalPostButton'))

document.getElementById('modalDeleteButton').addEventListener('click', () => deleteProduct(document.getElementById('modalDeleteButton').value))
