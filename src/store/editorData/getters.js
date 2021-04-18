export function pageContent (state) {
  return state.pageContent
}

export function codeListIndex (state) {
  return state.codeListIndex
}

export function outputValue (state) {
  return state.outputValue
}

export function itemIndex (state) {
  return state.itemIndex
}

export function storedData (state) {
  return state.storedData
}

export function menuData (state) {
  return state.menuData
}

export function codeList (state) {
  console.log('updatecode', process.env.APP_UPDATE_CODE)
  return state.codeList
}

export function selectedCode (state) {
  return state.selectedCode
}

export function vertView (state) {
  return state.vertView
}

export function showHelp (state) {
  return state.showHelp
}

export function editorMode (state) {
  return state.editorMode
}
