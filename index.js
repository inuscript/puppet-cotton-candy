const assert = require("assert")
const puppeteer = require('puppeteer');

const getFlavorPage = () => {
  return "https://www.31ice.co.jp/contents/product/flavor/index.html"
}

const hasCottonFlavor = (flavors) => {
  flavors.map(flavor => {
    assert(!/.+コットン.+/.test(flavor), `${flavor} found`)
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
  hasCottonFlavor(result)
  browser.close();
})().catch(e => {
  console.log(e.toString())
  process.exit(1)
})
