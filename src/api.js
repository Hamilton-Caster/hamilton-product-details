import axios from 'axios/index'
import { ProductTypes } from './components/enums'

const getHeaders = function (svc, antiForgery) {
  let headers = {}
  headers["ModuleId"] = svc.moduleId
  headers["TabId"] = getTabId()
  if (antiForgery) {
    headers["RequestVerificationToken"] = antiForgery
  }
  return headers
}

const getServiceRoot = function (path) {
  let serviceRoot = 'https://beta.hamiltoncaster.com'
  // let serviceRoot = `${location.origin}`;
  serviceRoot += "/DesktopModules/" + path + "/";
  return serviceRoot;
}

const getTabId = function () {
  return dnn.getVar("sf_tabId", -1)
}

const CatalogDetailLink = `${getServiceRoot('AcuitiSolutions')}CatalogDetail/API/List/GetPartDetails`

const getDetailsAPI = function (partid, detailLink) {
  // let headers = getHeaders(svc, antiForgery)
  return axios.get(`${CatalogDetailLink}?partid=${partid}`)
    .then(res => res.data)
}

export {
  getDetailsAPI
}
