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
    return SHOP_ITEM.find(({ name }) => name === item_name)
}

function findInList(warenkorb, item_name)   {
    return warenkorb.findIndex((item) => item.name === item_name)
}

function searchBarSearch() {
    let searchFor = $('.search_input').value

    let allItems = SHOP_ITEM
    let shownItems = []
    localStorage.clear("ITEMS_SHOWN")
    for (let i in allItems){
        console.log(allItems[i].name)
        if (allItems[i].name.toLowerCase() === searchFor.toLowerCase()){
            console.log("FOUND ITEM")
            shownItems.push(allItems[i])
        }
    }
    console.log(shownItems)

    localStorage.setItem("ITEMS_SHOWN", JSON.stringify(shownItems));

    //delete all shop-items
    const items = document.querySelectorAll('.shop-item');

    items.forEach(item => {
        item.remove();
    });

    //render new shop-items
    render(JSON.parse(localStorage.getItem('ITEMS_SHOWN')))
}