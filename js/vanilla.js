/**
 * Liefert das 1. HTMLElement oder <null>, welches der <query> entspricht,
 * @param query - CSS-Selektor als String
 * @returns {HTMLElement} - das 1. gefundene Element
 */
const $ = query => document.querySelector(query)
const $$ = query => Array.from(document.querySelectorAll(query))

/**
 *
 * @param element
 * @param event
 * @param func
 * @returns {*}
 */
const $on = (element, event, func) => {
  Array.isArray(element)
      ? element.forEach(arrayElement => $on(arrayElement, event, func))
      : element.addEventListener(event, func)
  return element
}

/**
 * Durchläuft das HTML-Dokument und rendert sämtliche Handlebars-Script-Tags
 * @param data - die zu rendernden Daten
 * @returns {Promise<void>}
 */
const render = async (data) => {
  const templates = $$('[type="text/x-handlebars-template"]')
  for (const source of templates) {
    await loadPartials(source)
    const template = Handlebars.compile(source.innerHTML)
    const target = source.parentElement
    target.insertAdjacentHTML('beforeend', template(data))
    if(source.textContent.includes("partials/bar")) {
      document.getElementById("cart_symbol").innerHTML = get_item_count()
    }
  }
}

/**
 *
 * @param source
 * @returns {Promise<void>}
 */
async function loadPartials(source) {
  const partialNames = source.innerText.match(/(?<={{>)(.*?)(?=\s|}})/g)
  if (partialNames) {
    for (let name of partialNames) {
      name = name.trim()
      const fileName = name + '.html'
      const partialCode = await fetch(fileName).then(response => response.text())
      Handlebars.registerPartial(name, partialCode)
    }
  }
}

function get_item_count() {
  if(localStorage.getItem("Warenkorb") !== null)  {
    let warenkorb = JSON.parse(localStorage.getItem('Warenkorb'))
    return warenkorb.length
  } else {
    return 0
  }

}

const PIZZA_KEY = "selectedPizzas"