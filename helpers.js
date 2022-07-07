const imgFolderCatalog = './images/catalog/'
const urlBaseWhatsApp = 'https://wa.me/+525525507474?text='
const urlAPI = 'https://viste-y-rueda-backend.herokuapp.com'

const categoriesNames = {
  JCU: 'Jersey cilcista unisex',
  JCM: 'Jersey cilcista mujer',
  JCP: 'Jersey ciclista polar',
  CONU: 'Conjunto ciclista unisex',
  CONM: 'Conjunto ciclista mujer',
  JCLU: 'Jersey largo ciclista unisex',
  JCLM: 'Jersey largo ciclista mujer',
  BIB: 'Bib short unisex',
  BIBP: 'Bib short polar unisex',
  SHORT: 'Short unisex',
  RV: 'Rompe vientos',
  IMP: 'Impermeable',
  CAP: 'Gorra ciclista',
  BL: 'Capa base'
}

const categories = {
  JCU: 'Jersey cilcista unisex',
  JCM: 'Jersey cilcista mujer',
  BIB: 'Bib short unisex',
  RV: 'Rompe vientos',
  IMP: 'Impermeable',
  CAP: 'Gorra ciclista',
  BL: 'Capa base'
}

const logOut = () => {
  window.localStorage.removeItem('loggedUser')
  location.reload()
}

const userToken = () => {
  try {
    return JSON.parse(window.localStorage.getItem('loggedUser')).token
  } catch {
    logOut()
  }
}

const validateToken = async () => {
  if (userToken() === null) return
  const token = userToken()
  await fetch(`${urlAPI}/login/${token}`)
    .then(response => {
      const { status } = response
      if (status === 400) {
        logOut()
      }
    })
}

const deleteTimeOut = (element, time) => {
  setTimeout(() => {
    element.remove()
  }, time)
}

const assignImg = async (id) => {
  var imgPath = `${imgFolderCatalog}${id}-min.jpg`
  await fetch(`${imgFolderCatalog}${id}-min.jpg`, { method: 'HEAD' })
  .then(response => {
    if (response.status !== 200) {
      imgPath = `${imgFolderCatalog}placeholder-min.jpg`
    }
  })

  return imgPath
}

export {
  imgFolderCatalog,
  urlBaseWhatsApp,
  urlAPI,
  categoriesNames,
  categories,
  userToken,
  validateToken,
  assignImg,
  deleteTimeOut
}
