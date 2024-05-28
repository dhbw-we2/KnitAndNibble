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

    console.log(searchForName)
    console.log(searchForCategory)
    console.log(searchForPrice)
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
        let matchesName = true;
        let matchesCategory = true;
        let matchesPrice = true;

        // Filter für den Namen
        if (searchForName && searchForName.length > 0) {
            matchesName = item.name.toLowerCase().includes(searchForName);
        }

        // Filter für die Kategorie
        if (searchForCategory && searchForCategory.length > 0) {
            matchesCategory = item.category.toLowerCase() === searchForCategory;
        }

        // Filter für den Preis
        if (searchForPrice > 0) {
            matchesPrice = item.price <= searchForPrice;
        }

        // Artikel hinzufügen, wenn alle Kriterien erfüllt sind
        if (matchesName && matchesCategory && matchesPrice) {
            shownItems.push(item);
        }
    });

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