export function updatePageContent (state, payload) {
  console.log('payload in mutation', payload)
  const cssContent = payload.cssContent
  const htmlContent = payload.htmlContent
  const jsContent = payload.jsContent

  const outputValue = '<html><style>' + cssContent + '</style><body>' + htmlContent + '<script type="text/javascript">' + jsContent + '<script></body></html>'

  console.log(outputValue)
  const pageContent = {
    htmlContent: payload.htmlContent,
    cssContent: payload.cssContent,
    jsContent: payload.jsContent,
    outputValue: outputValue
  }

  console.log(pageContent)
  state.pageContent = pageContent
}
