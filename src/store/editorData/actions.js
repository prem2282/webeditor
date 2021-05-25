export function updatePageContent ({ commit }, payload) {
  console.log('payload in updateBoxType', payload)
  commit('updatePageContent', payload)
  //   console.log(data)
}

export function updateCodeListIndex ({ commit }, payload) {
  console.log('payload in updateCodeListIndex', payload)
  commit('updateCodeListIndex', payload)
  //   console.log(data)
}

export function updateStoredData ({ commit }, payload) {
  console.log('payload in updateStoredData', payload)
  commit('updateStoredData', payload)
  //   console.log(data)
}

export function updateSubject ({ commit }, payload) {
  console.log('payload in updateSubject', payload)
  commit('updateSubject', payload)
  //   console.log(data)
}

export function updateLevel ({ commit }, payload) {
  console.log('payload in updateLevel', payload)
  commit('updateLevel', payload)
  //   console.log(data)
}

export function updateSection ({ commit }, payload) {
  console.log('payload in updateSubject', payload)
  commit('updateSection', payload)
  //   console.log(data)
}

export function updateSeqNum ({ commit }, payload) {
  console.log('payload in updateSeqNum', payload)
  commit('updateSeqNum', payload)
  //   console.log(data)
}

export function updateTitle ({ commit }, payload) {
  console.log('payload in updateTitle', payload)
  commit('updateTitle', payload)
  //   console.log(data)
}

export function updateHead ({ commit }, payload) {
  console.log('payload in updateHead', payload)
  commit('updateHead', payload)
  //   console.log(data)
}

export function updateMenuData ({ commit }, payload) {
  console.log('payload in updateMenuData', payload)
  commit('updateMenuData', payload)
}
export function updateCodeList ({ commit }, payload) {
  console.log('payload in updateCodeList', payload)
  commit('updateCodeList', payload)
}

export function updateSelectedCode ({ commit }, payload) {
  console.log('payload in updateSelectedCode', payload)
  commit('updateSelectedCode', payload)
}

export function addToCodeList ({ commit }, payload) {
  console.log('payload in addToCodeList', payload)
  commit('addToCodeList', payload)
}

export function updateToCodeList ({ commit }, { payload, index }) {
  console.log('payload in updateToCodeList', payload, index)
  commit('updateToCodeList', { payload, index })
}

export function deleteFromCodeList ({ commit }, payload) {
  console.log('payload in deleteFromCodeList', payload)
  commit('deleteFromCodeList', payload)
}

export function setView ({ commit }, payload) {
  console.log('payload in setView', payload)
  commit('setView', payload)
}

export function updateShowHelp ({ commit }, payload) {
  console.log('payload in updateShowHelp', payload)
  commit('updateShowHelp', payload)
}

export function updateHelpText ({ commit }, payload) {
  console.log('payload in updateHelpText', payload)
  commit('updateHelpText', payload)
}

export function updateCDNText ({ commit }, payload) {
  console.log('payload in updateCDNText', payload)
  commit('updateCDNText', payload)
}

export function updateEditorMode ({ commit }, payload) {
  console.log('payload in updateEditorMode', payload)
  commit('updateEditorMode', payload)
}

export function updateUser ({ commit }, payload) {
  // console.log('payload in updateUser', payload)
  commit('updateUser', payload)
}

export function updateSignedIn ({ commit }, payload) {
  // console.log('payload in updateUser', payload)
  commit('updateSignedIn', payload)
}
