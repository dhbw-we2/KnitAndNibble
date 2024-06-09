function init() {
    localStorage.setItem("ITEMS_SHOWN", JSON.stringify(SHOP_DATA));
    let warenkorb = JSON.parse(localStorage.getItem("Warenkorb"))

    if (warenkorb == null){
        initCart()
    }

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

/**
 * Initiates the search process for items in the shop based on the provided search criteria.
 * Filters items by name, category, and price, then updates the displayed items accordingly.
 *
 * @function initCart
 *
 * This function will initialize the Cart and therefore will protect from uninitialized variables
 *
 */
function initCart(){
    let cart = {}
    cart.items = []
    cart.num_of_items = 0
    cart.subTotal = 0
    cart.total = 0
    localStorage.setItem("Warenkorb", JSON.stringify(cart))
}

/**
 * Initiates the search process for items in the shop based on the provided search criteria.
 * Filters items by name, category, and price, then updates the displayed items accordingly.
 *
 * @function addToCart
 *
 * @param {string} [item_name] item to add
 *
 * This function will add the specified item to the cart
 *
 */
function addToCart(item_name) {
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
    refresh()
    refresh_header()
}

function getItem(item_name)  {
    return SHOP_DATA.ITEMS.find(({ name }) => name === item_name)
}

function findInList(items, item_name)   {
    return items.findIndex((item) => item.name === item_name)
}

/**
 * Theese variables are for the search parameter
 */
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

/**
 * Initiates the search process for items in the shop based on the provided search criteria.
 * Filters items by name, category, and price, then updates the displayed items accordingly.
 *
 * @function unsearch
 *
 *
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

/**
 * Handler for showing the Detail-Page
 */
function show_details(){
    init()
    var query = window.location.search.substring(1);
    let ID = query.slice(3)

    let currentItem
    SHOP_DATA.ITEMS.forEach(item => {
        if (item.ID === parseInt(ID)) {
            currentItem = item
        }
    })

    console.log(currentItem)

    $('.detail-name').textContent = currentItem.name
    $('.detail-description-short').textContent = currentItem.description
    $('.detail-description-long').textContent = currentItem.description_long
    $('.detail-image').src = currentItem.image
    $('.detail-price').textContent = currentItem.price + "€"
    $('.detail-category').textContent = currentItem.category

    //let amount =

    $('.detail-addtocart').addEventListener('click',function (e){
        let amount = $('.detail-quanity-amount').value
        for (let i = 0; i < amount; i++) {
            addToCart(currentItem.name)
        }
        calculate_cart_total()
        init()
    })


}

/**
 *
 * This is for calculating the quantity field in the shop
 *
 * @function shopDetailQuantity
 *
 * @param {string} [operation]
 * @returns {number}
 */
function shopDetailQuantity(operation) {
    let text = $('.detail-quantity-amount')
    let amount = text.value
    console.log()
    if(operation === "plus")    {
        ++amount
    } else if(operation === "minus")    {
        --amount
    } else if(operation === "return")    {
        return amount
    }
    text.value = amount
}

