// import { pageContent } from './getters'

import { user } from "./getters"

function updateOutputValue (state) {
  const headContent = state.pageContent.code_1
  const htmlContent = state.pageContent.code_2
  const cssContent = state.pageContent.code_3
  const jsContent = state.pageContent.code_4

  const outputValue = '<html><head>' + headContent + '</head><style>' + cssContent + '</style><body>' + htmlContent + '<script type="text/javascript">' + jsContent + '</script></body></html>'

  console.log('updateOutputValue', outputValue)
  state.outputValue = outputValue
}

export function updatePageContent (state, payload) {
  const headContent = payload.code_1
  const htmlContent = payload.code_2
  const cssContent = payload.code_3
  const jsContent = payload.code_4

  const outputValue = '<html><head>' + headContent + '</head><style>' + cssContent + '</style><body>' + htmlContent + '<script type="text/javascript">' + jsContent + '</script></body></html>'

  console.log('updatePageContent', payload)
  state.outputValue = outputValue
  console.log(outputValue)

  state.pageContent = payload
}

export function updateCodeListIndex (state, payload) {
  state.codeListIndex = payload
}

export function updateStoredData (state, payload) {
  state.storedData = payload
}
export function updateMenuData (state, payload) {
  state.menuData = payload
}
export function updateCodeList (state, payload) {
  state.codeList = payload
}

export function updateSelectedCode (state, payload) {
  state.selectedCode = payload
}

export function addToCodeList (state, payload) {
  state.codeList.push(payload)
}

export function deleteFromCodeList (state, payload) {
  console.log('index to delete', payload)
  state.codeList.splice(payload, 1)
}

export function updateToCodeList (state, { payload, index }) {
  state.codeList[index] = payload
}

export function updateHelpText (state, payload) {
  state.pageContent.description_1 = payload
}

export function updateCDNText (state, payload) {
  state.pageContent.code_1 = payload
  updateOutputValue(state)
}

export function setView (state, payload) {
  state.vertView = !payload
}

export function updateShowHelp (state, payload) {
  state.showHelp = !payload
}

export function updateEditorMode (state, payload) {
  state.editorMode = payload
}

export function updateUser (state, payload) {
  state.user = payload
  if (payload.email === 'prem2282@gmail.com') {
    state.isEditor = true
  } else {
    state.isEditor = false
  }
}

export function updateSignedIn (state, payload) {
  state.signedIn = payload
  console.log('in mutation updateSignedIn:', payload);
  if (!payload) {
    state.user = {}
    state.editorMode = false
  }
}