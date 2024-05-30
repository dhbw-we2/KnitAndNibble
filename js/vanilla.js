/**
 * Returns the 1st HTMLElement or <null>, which corresponds to the <query>,
 * @param query - CSS selector as a string
 * @returns {HTMLElement} - the 1st element found
 */
const $ = query => document.querySelector(query)
const $$ = query => Array.from(document.querySelectorAll(query))

/**
 * Binds an event handler (=function) to a DOM element
 * @param element - the target element, e.g. button
 * @param event - the event, e.g. 'click'
 * @param func - the function to be called, e.g. handleValidation
 * @returns {*} - the target element
 */
const $on = (element, event, func) => {
    Array.isArray(element)
        ? element.forEach(arrayElement => $on(arrayElement, event, func))
        : element.addEventListener(event, func)
    return element
}

/**
 * Runs through the HTML document and renders all handlebars script tags
 * @param data - the data to be rendered
 * @param querySelector - an optional querySelector
 * @returns {Promise<void>}
 */
const render = async (data, querySelector) => {
    Handlebars.registerHelper('toFixed', function (num) {
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
            const start = querySelector ? 0 : 1
            let children = target.children.length
            for (let i = start; i < children; i++) {
                target.lastElementChild.remove()
            }
        }
        // insert refreshed HTML elements
        console.log(data)
        console.log(template(data))
        target.insertAdjacentHTML('beforeend', template(data))
        if (source.textContent.includes("partials/bar")) {
            document.getElementById("cart_symbol").innerHTML = get_item_count()
        }
    }
}

/**
 * Loads partials with the file extension '.html' from the same directory
 * @param code - the source code to be parsed
 * @returns {Promise<void>}
 */
async function loadPartials(code) {
    const partialNames = code.innerText.match(/(?<={{(#>|>)).+?(?=\s)/g)
    if (partialNames) {
        for (let name of partialNames) {
            const fileName = name + '.html'
            const partialCode = await fetch(fileName).then(response => response.text())
            Handlebars.registerPartial(name, partialCode)
        }
    }
}


function get_item_count() {
    if (localStorage.getItem("Warenkorb") !== null) {
        let warenkorb = JSON.parse(localStorage.getItem('Warenkorb'))
        return warenkorb.num_of_items
    } else {
        return 0
    }

}