const assert = require("assert")
const puppeteer = require('puppeteer');

const getFlavorPage = () => {
  return "https://www.31ice.co.jp/contents/product/flavor/index.html"
}

const hasCottonFlavor = (flavors) => {
  flavors.map(flavor => {
    assert(!/.+チョコ.+/.test(flavor), `${flavor} found`)
  })
}

(async () => {
  
  const browser = await puppeteer.launch({headless: true});
  const page = await browser.newPage()
  await page.goto(getFlavorPage())
  const result = await page.evaluate(() => {
    const getFravors = ( selector) => {
      const elm = document.querySelectorAll(selector)
      return Array.from(elm)
        .map( a => a.alt )
    }
    
    const seasonFlavors = getFravors("#seasonFlavorPhoto a img")
    const standardFlavors = getFravors("#standardFlavorPhoto a img")
    return Promise.resolve([
      ...seasonFlavors, ...standardFlavors
    ])
  })
  console.log(result)
  hasCottonFlavor(result)
  browser.close();
})().catch(e => {
  console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
  console.log(e.toString())
  console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
  process.exit(1)
})
