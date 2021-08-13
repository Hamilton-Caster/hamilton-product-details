import axios from 'axios/index'

const getServiceRoot = function (path) {
  let serviceRoot = process.env.NODE_ENV === 'development' ? 'https://beta.hamiltoncaster.com' : location.origin
  return `${serviceRoot}/DesktopModules/${path}/`
}
let rootPath = `${getServiceRoot('AcuitiSolutions')}CatalogDetail/API/List`

const getHeaders = function (svc, antiForgery) {
  let headers = {}
  headers["ModuleId"] = svc.moduleId
  headers["TabId"] = getTabId()
  if (antiForgery) {
    headers["RequestVerificationToken"] = antiForgery
  }
  return headers
}

const getTabId = function () {
  return dnn.getVar("sf_tabId", -1)
}

const addToCart = function (shoppingCart, svc, antiForgery) {
  let headers = getHeaders(svc, antiForgery)
  return axios.post(`${rootPath}/AddToCart`, shoppingCart, {headers})
    .then(res => res.data)
}

const CatalogDetailLink = `${rootPath}/GetPartDetails`

const getDetailsAPI = function (partId, detailLink) {
  // let headers = getHeaders(svc, antiForgery)
  return axios.get(`${CatalogDetailLink}?partId=${partId}`)
    .then(res => res.data)
}

const validateCADUser = function (name, email) {
  // let headers = getHeaders(svc, antiForgery)
  return axios.get(`${rootPath}/ValidateCADUser?name=${name}&email=${email}`)
    .then(res => res.data)
}

const getIsValidCADUser = function () {
  return axios.get(`${rootPath}/IsValidCADUser`)
    .then(res => res.data)
}

const addCADUser = function (userData) {
  return axios.post(`${rootPath}/AddCADUser`, userData)
    .then(res => res.data)
}

const editCADUser = function (userData) {
  return axios.post(`${rootPath}/EditCADUser`, userData)
    .then(res => res.data)
}

const getProductConfiguratorAttributes = function (svc, antiForgery, configuratorParams) {
  let headers = getHeaders(svc, antiForgery)
  let baseUrl = `${location.origin}/API/AcuitiSolutions/ProductConfigurator/ProductConfigurator/GetProductConfiguratorResults`
  return axios.post(baseUrl, configuratorParams, {headers})
    .then(res => res)
}

export {
  addToCart,
  addCADUser,
  getServiceRoot,
  editCADUser,
  getDetailsAPI,
  getIsValidCADUser,
  validateCADUser,
  getProductConfiguratorAttributes
}
