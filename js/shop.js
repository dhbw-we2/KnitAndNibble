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

