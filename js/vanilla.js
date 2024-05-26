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
const render = async (data, querySelector) => {
  Handlebars.registerHelper('toFixed', function(num) {
    return num && num.toFixed(2);
  });

  const selector = querySelector || '[type="text/x-handlebars-template"]'
  const templates = $$(selector)

  for (const source of templates) {
    await loadPartials(source)
    const template = Handlebars.compile(source.innerHTML)
    const target = source.parentElement

    // remove former HTML elements
    if (target.children.length > 1) {
      const start = querySelector? 0 : 1
      for (let i = start; i < target.children.length; i++) {
        target.lastElementChild.remove()
      }
    }
    // insert refreshed HTML elements
    target.insertAdjacentHTML('beforeend', template(data))
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