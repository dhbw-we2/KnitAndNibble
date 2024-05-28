function zumWarenkorb(item_name) {
    let warenkorb = JSON.parse(localStorage.getItem('Warenkorb'))
    if (warenkorb == null){
        warenkorb = []
    }

    let item = getItem(item_name)
    let index = findInList(warenkorb, item_name)

    if (index !== -1){
        warenkorb[index].amount ++
    } else {
        item.amount = 1
        warenkorb.push(item)
        document.getElementById("cart_symbol").innerHTML ++
    }

    localStorage.setItem("Warenkorb", JSON.stringify(warenkorb))
}

function getItem(item_name)  {
    return SHOP_DATA.ITEMS.find(({ name }) => name === item_name)
}

function findInList(warenkorb, item_name)   {
    return warenkorb.findIndex((item) => item.name === item_name)
}

let searchForName
let searchForCategory
let searchForPrice = 0

function searchbar() {
    let searchFor = $('.search_input').value
    searchForName = searchFor
}

function categorySearch(searchFor) {
        searchForCategory = searchFor
}

function priceSearch() {
    let searchFor = $('#rangeInput').value
    searchForPrice = searchFor
}

function startSearch() {
    priceSearch()
    searchbar()

    let shownItems = JSON.parse(JSON.stringify(SHOP_DATA));
    console.log(JSON.parse(JSON.stringify(SHOP_DATA)))

    localStorage.removeItem("ITEMS_SHOWN")

    console.log(shownItems)
    if(typeof searchForName != "undefined"){shownItems.ITEMS = shownItems.ITEMS.filter((item) => item.name.toLowerCase() === searchForName.toLowerCase())}
    console.log(shownItems)
    if(typeof searchForCategory != "undefined"){shownItems.ITEMS = shownItems.ITEMS.filter((item) => item.category.toLowerCase() === searchForCategory.toLowerCase())}
    console.log(shownItems)
    if(searchForPrice !== 0){shownItems.ITEMS = shownItems.ITEMS.filter((item) => item.price <= searchForPrice)}
    console.log(shownItems)

    //delete all shop-items
    const items = document.querySelectorAll('.shop-partial');
    items.forEach(item => {
        item.remove();
    });

    //render new shop-items
    render({shop_data: shownItems})
}

function startSearchZwei() {
    priceSearch();
    searchbar();

    let shopData = JSON.parse(JSON.stringify(SHOP_DATA));
    console.log(JSON.parse(JSON.stringify(SHOP_DATA)));
    let shownItems = JSON.parse(localStorage.getItem('ITEMS_SHOWN')); // Verhindert Fehler, wenn 'ITEMS_SHOWN' nicht existiert
    let notShownItems = [];
    shownItems.ITEMS = [];

    localStorage.removeItem("ITEMS_SHOWN");

    shopData.ITEMS.forEach(item => {
        if ((searchForName && item.name.toLowerCase() === searchForName.toLowerCase()) ||
            (searchForCategory && item.category.toLowerCase() === searchForCategory.toLowerCase()) ||
            (searchForPrice !== 0 && item.price <= searchForPrice)) {
            console.log("IF Ausgelöst, \n" + item.name)
            shownItems.ITEMS.push(item);
        }
    });

    console.log("not shown items  " +  notShownItems);
    console.log(shopData.ITEMS.filter(item => !notShownItems.includes(item.name)))

    console.log(shownItems);
    localStorage.setItem("ITEMS_SHOWN", JSON.stringify(shownItems));

    //delete all shop-items
    const items = document.querySelectorAll('.shop-partial');
    items.forEach(item => {
        item.remove();
    });

    //render new shop-items
    render({ shop_data: shownItems });
}