export function updatePageContent (state, payload) {
  console.log('payload in mutation', payload)
  console.log('codeListIndex in mutation', payload.codeListIndex)
  const cssContent = payload.cssContent
  const htmlContent = payload.htmlContent
  const jsContent = payload.jsContent
  const cdnContent = '<script src="https://unpkg.com/konva@7.0.3/konva.min.js"></script>'

  const outputValue = '<html><head>' + cdnContent + '</head><style>' + cssContent + '</style><body>' + htmlContent + '<script type="text/javascript">' + jsContent + '</script></body></html>'

  console.log(outputValue)
  const pageContent = {
    htmlContent: payload.htmlContent,
    cssContent: payload.cssContent,
    jsContent: payload.jsContent,
    title: payload.title,
    id: payload.id,
    outputValue: outputValue,
    codeListIndex: payload.codeListIndex,
    helpText: payload.helpText
  }

  console.log(pageContent)
  state.pageContent = pageContent
}

export function updateHelpText (state, payload) {
  state.pageContent.helpText = payload
}

export function updateTitle (state, payload) {
  state.pageContent.title = payload
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

export function updateToCodeList (state, { payload, index }) {
  state.codeList[index] = payload
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
