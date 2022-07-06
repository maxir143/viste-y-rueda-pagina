const imgFolderCatalog = './images/catalog/'
const urlBaseWhatsApp = 'https://wa.me/+525525507474?text='
const urlAPI = 'https://viste-y-rueda-backend.herokuapp.com'
const userToken = JSON.parse(window.localStorage.getItem('loggedUser'))

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

export {
  imgFolderCatalog,
  urlBaseWhatsApp,
  urlAPI,
  userToken,
  categoriesNames,
  categories
}
