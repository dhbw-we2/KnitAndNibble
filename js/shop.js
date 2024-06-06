function init() {
    localStorage.setItem("ITEMS_SHOWN", JSON.stringify(SHOP_DATA));
    let warenkorb = JSON.parse(localStorage.getItem("Warenkorb"))
    console.log(warenkorb)
        if (warenkorb && warenkorb.items && warenkorb.num_of_items){
            render({
                shop_data: SHOP_DATA,
                items: warenkorb.items,
                num_of_items: warenkorb.num_of_items
            })
        } else {
            render({
                shop_data: SHOP_DATA,
                items: null,
                num_of_items: 0
            })
        }

}

function zumWarenkorb(item_name) {
    console.log(item_name)
    let warenkorb = JSON.parse(localStorage.getItem('Warenkorb'))
    if (warenkorb == null){
        warenkorb = {}
        warenkorb.items = []
        warenkorb.num_of_items = 0
        warenkorb.subTotal = 0
        warenkorb.total = 0
    }
    let item = getItem(item_name)
    let index = findInList(warenkorb.items, item_name)

    if (index !== -1){
        warenkorb.items[index].amount ++
        warenkorb.items[index].total = parseFloat(warenkorb.items[index].price * warenkorb.items[index].amount).toFixed(2)
    } else {
        item.amount = 1
        //every item now shows price with two digits after the decimal point
        item.price = parseFloat(item.price).toFixed(2)
        warenkorb.items.push(item)
        item.total = parseFloat(item.price).toFixed(2)
    }

    warenkorb.num_of_items ++

    localStorage.setItem("Warenkorb", JSON.stringify(warenkorb))

    calculate_cart_total()
    refresh_header()
}

function getItem(item_name)  {
    return SHOP_DATA.ITEMS.find(({ name }) => name === item_name)
}

function findInList(items, item_name)   {
    return items.findIndex((item) => item.name === item_name)
}

let searchForName
let searchForCategory
let searchForPrice = 0

function searchbar() {
    let searchFor = $('.search_input').value
    searchForName = searchFor
    startSearch()
}

function categorySearch(searchFor) {
    searchForCategory = searchFor
    startSearch()
}

function priceSearch() {
    let searchFor = $('#rangeInput').value
    searchForPrice = searchFor
    startSearch()
}

/*


 */
function unsearch(){
    const radioButtons = document.querySelectorAll('[name="flexRadioDefault"]');

    radioButtons.forEach(button => {
        button.checked = false
    })
    searchForPrice = 0
    searchForCategory = undefined
    searchForName = undefined

    $('.search_input').value = null
    $('#rangeInput').value = 0


    startSearch()
}

/**
 * Initiates the search process for items in the shop based on the provided search criteria.
 * Filters items by name, category, and price, then updates the displayed items accordingly.
 *
 * @function startSearch
 *
 * @param {string} [searchForName] - The name or partial name to search for.
 * @param {string} [searchForCategory] - The category to search for.
 * @param {number} [searchForPrice] - The maximum price to search for.
 *
 */
function startSearch() {
    let shownItems = JSON.parse(JSON.stringify(SHOP_DATA));
    shownItems.ITEMS = []

    localStorage.removeItem("ITEMS_SHOWN")

    SHOP_DATA.ITEMS.forEach(item => {
        let matchesName = true;
        let matchesCategory = true;
        let matchesPrice = true;

        // Filter für den Namen
        if (searchForName && searchForName.length > 0) {
            matchesName = item.name.toLowerCase().includes(searchForName.toLowerCase());
        }

        // Filter für die Kategorie
        if (searchForCategory) {
            matchesCategory = (item.category === searchForCategory);
            console.log(matchesCategory);
        }

        // Filter für den Preis
        if (searchForPrice > 0) {
            matchesPrice = item.price <= searchForPrice;
        }

        // Artikel hinzufügen, wenn alle Kriterien erfüllt sind
        if (matchesName && matchesCategory && matchesPrice) {
            shownItems.ITEMS.push(item);
        }
    });

    //delete all shop-items
    const items = document.querySelectorAll('.shop-partial');
    items.forEach(item => {
        item.remove();
    });

    //render new shop-items
    render({shop_data: shownItems}, '#shop-body')
}
