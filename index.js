const assert = require("assert")
const puppeteer = require('puppeteer');

const getFlavorPage = () => {
  return "https://www.31ice.co.jp/contents/product/flavor/index.html"
}

const checkFlavorCount = (flavors) => {
  assert.notEqual(flavors.length, 0, 'No flavor found')
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
  console.log(result)
  checkFlavorCount(result)
  hasCottonFlavor(result)
  browser.close();
  console.log("Cannot found cotton flavor")
})().catch(e => {
  console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
  console.log(e.toString())
  console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
  process.exit(1)
})
