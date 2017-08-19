const puppeteer = require('puppeteer');

const getFlavorPage = () => {
  return "https://www.31ice.co.jp/contents/product/flavor/index.html"
}


(async () => {
  
  const browser = await puppeteer.launch({headless: false});
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
    return Promise.resolve({
      seasonFlavors, standardFlavors
    })
  })
  console.log(result)

  browser.close();
})();
